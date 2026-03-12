# NestJS Microservices Flashcards

#### Message Queue Architecture
Implementing reliable async processing with Bull queues for background tasks and job processing:

```typescript
@Processor('email-queue')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private mailService: MailService,
    private metricsService: MetricsService,
  ) {}

  @Process({ name: 'send-email', concurrency: 5 })
  async handleSendEmail(job: Job<EmailJobData>) {
    const { userId, templateId, data, priority } = job.data;
    
    try {
      // Rate limiting check
      const rateLimitKey = `email:${userId}:${templateId}`;
      const currentCount = await this.redis.get(rateLimitKey) || 0;
      
      if (currentCount >= this.getRateLimit(templateId)) {
        throw new Error(`Rate limit exceeded for user ${userId}`);
      }

      // Process email template
      const template = await this.templateService.getTemplate(templateId);
      const rendered = await this.templateService.render(template, data);

      // Send email with tracking
      const result = await this.mailService.send({
        to: data.email,
        subject: rendered.subject,
        html: rendered.html,
        trackingId: `${job.id}-${Date.now()}`,
      });

      // Update metrics
      await this.redis.incr(rateLimitKey);
      await this.redis.expire(rateLimitKey, 3600); // 1 hour window
      
      this.metricsService.incrementCounter('emails.sent.success', {
        template: templateId,
        priority: priority.toString(),
      });

      return { messageId: result.messageId, status: 'sent' };
    } catch (error) {
      this.logger.error(`Email job failed: ${error.message}`, {
        jobId: job.id,
        userId,
        templateId,
        attempt: job.attemptsMade,
      });

      this.metricsService.incrementCounter('emails.sent.failure', {
        template: templateId,
        error: error.constructor.name,
      });

      throw error; // Let Bull handle retry logic
    }
  }

  @OnQueueCompleted()
  async onCompleted(job: Job, result: any) {
    this.logger.log(`Email job ${job.id} completed successfully`);
    await this.auditService.logEmailSent(job.data, result);
  }

  @OnQueueFailed()
  async onFailed(job: Job, error: Error) {
    this.logger.error(`Email job ${job.id} failed after ${job.attemptsMade} attempts`);
    
    if (job.attemptsMade >= job.opts.attempts) {
      // Move to dead letter queue
      await this.deadLetterService.add(job.data, error);
      
      // Send alert for critical emails
      if (job.data.priority === 'critical') {
        await this.alertService.sendAlert({
          type: 'EMAIL_JOB_FAILED',
          jobId: job.id,
          error: error.message,
          data: job.data,
        });
      }
    }
  }
}
```

:p How do you design a robust message queue system that handles failures, retries, rate limiting, and monitoring?
??x
**Robust Message Queue Design:**

1. **Retry Strategy**:
   - Exponential backoff with jitter
   - Maximum retry attempts
   - Different strategies per job type
   - Dead letter queue for failed jobs

2. **Rate Limiting**:
   - Per-user/per-service limits
   - Sliding window or token bucket
   - Priority-based processing
   - Graceful degradation

3. **Monitoring & Observability**:
   - Job completion metrics
   - Queue depth monitoring
   - Processing time tracking
   - Error rate alerting

4. **Failure Handling**:
   - Circuit breaker for external services
   - Graceful degradation strategies
   - Dead letter queue processing
   - Alert escalation

**Implementation Patterns**:
```typescript
// Queue configuration with retry strategy
const queueConfig = {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
  
  // Priority queues
  settings: {
    stalledInterval: 30000,
    maxStalledCount: 1,
  },
};

// Rate limiting with Redis
class RateLimiter {
  async checkLimit(key: string, limit: number, window: number): Promise<boolean> {
    const current = await this.redis.incr(key);
    if (current === 1) {
      await this.redis.expire(key, window);
    }
    return current <= limit;
  }
}

// Dead letter queue processing
@Processor('dead-letter-queue')
class DeadLetterProcessor {
  @Process('retry-failed-job')
  async retryFailedJob(job: Job) {
    // Manual investigation and retry logic
    const originalJob = job.data.originalJob;
    // Decide whether to retry or permanently fail
  }
}
```
x??

---

#### Event Sourcing Implementation
Storing all state changes as immutable events for audit trails and state reconstruction:

```typescript
@Injectable()
export class EventStore {
  constructor(@InjectKysely() private db: KyselyDB) {}

  async appendEvents(
    streamId: string, 
    events: DomainEvent[], 
    expectedVersion?: number
  ): Promise<void> {
    return this.db.transaction().execute(async (trx) => {
      // Optimistic concurrency control
      if (expectedVersion !== undefined) {
        const currentVersion = await this.getStreamVersion(trx, streamId);
        if (currentVersion !== expectedVersion) {
          throw new ConcurrencyError(
            `Expected version ${expectedVersion}, got ${currentVersion}`
          );
        }
      }

      // Prepare event records
      const eventRecords = events.map((event, index) => ({
        stream_id: streamId,
        event_id: uuid(),
        event_type: event.constructor.name,
        event_data: JSON.stringify(event.payload),
        event_metadata: JSON.stringify({
          ...event.metadata,
          causationId: event.causationId,
          correlationId: event.correlationId,
          timestamp: new Date().toISOString(),
        }),
        version: expectedVersion ? expectedVersion + index + 1 : index + 1,
        created_at: new Date(),
      }));

      // Atomic append
      await trx
        .insertInto('events')
        .values(eventRecords)
        .execute();

      // Update stream metadata
      await trx
        .insertInto('streams')
        .values({
          stream_id: streamId,
          version: expectedVersion ? expectedVersion + events.length : events.length,
          updated_at: new Date(),
        })
        .onConflict((oc) => oc
          .column('stream_id')
          .doUpdateSet({
            version: (eb) => eb.ref('excluded.version'),
            updated_at: (eb) => eb.ref('excluded.updated_at'),
          })
        )
        .execute();
    });
  }

  async getEvents(streamId: string, fromVersion?: number): Promise<DomainEvent[]> {
    let query = this.db
      .selectFrom('events')
      .selectAll()
      .where('stream_id', '=', streamId)
      .orderBy('version', 'asc');

    if (fromVersion !== undefined) {
      query = query.where('version', '>', fromVersion);
    }

    const records = await query.execute();
    return records.map(record => this.deserializeEvent(record));
  }

  // Snapshot optimization for performance
  async createSnapshot(streamId: string, aggregate: any, version: number): Promise<void> {
    await this.db
      .insertInto('snapshots')
      .values({
        stream_id: streamId,
        aggregate_type: aggregate.constructor.name,
        aggregate_data: JSON.stringify(aggregate.toSnapshot()),
        version,
        created_at: new Date(),
      })
      .onConflict((oc) => oc
        .column('stream_id')
        .doUpdateSet({
          aggregate_data: (eb) => eb.ref('excluded.aggregate_data'),
          version: (eb) => eb.ref('excluded.version'),
          created_at: (eb) => eb.ref('excluded.created_at'),
        })
      )
      .execute();
  }

  async loadAggregate<T>(streamId: string, aggregateClass: new () => T): Promise<T> {
    // Try to load from snapshot first
    const snapshot = await this.getLatestSnapshot(streamId);
    let aggregate = new aggregateClass();
    let fromVersion = 0;

    if (snapshot) {
      aggregate = aggregateClass.fromSnapshot(snapshot.aggregate_data);
      fromVersion = snapshot.version;
    }

    // Apply events since snapshot
    const events = await this.getEvents(streamId, fromVersion);
    events.forEach(event => aggregate.apply(event));

    return aggregate;
  }
}
```

:p What are the benefits and challenges of implementing event sourcing, and how do you handle performance with large event streams?
??x
**Event Sourcing Benefits:**

1. **Complete Audit Trail**: Every change is recorded with full context
2. **Time Travel**: Can reconstruct state at any point in time
3. **Replay Capability**: Can rebuild read models from events
4. **Scalability**: Read and write models can be optimized separately
5. **Business Intelligence**: Rich data for analytics and reporting

**Challenges & Solutions:**

1. **Performance**: 
   - Use snapshots to avoid replaying all events
   - Implement event archiving for old streams
   - Cache frequently accessed aggregates

2. **Complexity**:
   - Event versioning for schema evolution
   - Saga patterns for process managers
   - Eventual consistency handling

3. **Storage Growth**:
   - Event archiving strategies
   - Compression for old events
   - Retention policies

**Performance Optimization**:
```typescript
// Snapshot strategy
class AggregateRepository {
  async load(id: string): Promise<Aggregate> {
    const snapshotThreshold = 50; // events
    
    const eventCount = await this.eventStore.getEventCount(id);
    
    if (eventCount > snapshotThreshold) {
      // Load from snapshot + recent events
      return this.loadFromSnapshot(id);
    }
    
    // Load all events for small streams
    return this.loadFromEvents(id);
  }
  
  async save(aggregate: Aggregate): Promise<void> {
    const events = aggregate.getUncommittedEvents();
    await this.eventStore.appendEvents(aggregate.id, events);
    
    // Create snapshot periodically
    if (aggregate.version % 50 === 0) {
      await this.eventStore.createSnapshot(
        aggregate.id, 
        aggregate, 
        aggregate.version
      );
    }
  }
}

// Event archiving
@Cron('0 2 * * *') // Daily at 2 AM
async archiveOldEvents() {
  const cutoffDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // 1 year
  
  await this.eventStore.archiveEvents(cutoffDate);
}
```
x??

---

#### CQRS Pattern Implementation
Separating command and query responsibilities for better scalability and performance:

```typescript
// Command side - handles writes
@CommandHandler(CreateDocumentCommand)
export class CreateDocumentHandler implements ICommandHandler<CreateDocumentCommand> {
  constructor(
    private eventStore: EventStore,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateDocumentCommand): Promise<void> {
    const { documentId, title, content, userId, workspaceId } = command;

    // Load aggregate (or create new)
    const document = Document.create(documentId, title, content, userId, workspaceId);

    // Business logic validation
    if (!this.canUserCreateDocument(userId, workspaceId)) {
      throw new ForbiddenException('User cannot create documents in this workspace');
    }

    // Save events
    const events = document.getUncommittedEvents();
    await this.eventStore.appendEvents(documentId, events);

    // Publish domain events
    events.forEach(event => this.eventBus.publish(event));
  }
}

// Query side - handles reads
@QueryHandler(GetDocumentQuery)
export class GetDocumentHandler implements IQueryHandler<GetDocumentQuery> {
  constructor(private documentReadRepo: DocumentReadRepository) {}

  async execute(query: GetDocumentQuery): Promise<DocumentView> {
    const { documentId, userId } = query;

    const document = await this.documentReadRepo.findById(documentId);
    
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Apply read-side permissions
    if (!this.canUserReadDocument(userId, document)) {
      throw new ForbiddenException('Access denied');
    }

    return document;
  }
}

// Read model projections
@EventsHandler(DocumentCreatedEvent, DocumentUpdatedEvent)
export class DocumentProjection implements IEventHandler {
  constructor(private readRepo: DocumentReadRepository) {}

  async handle(event: DocumentCreatedEvent | DocumentUpdatedEvent): Promise<void> {
    if (event instanceof DocumentCreatedEvent) {
      await this.readRepo.create({
        id: event.documentId,
        title: event.title,
        content: event.content,
        author_id: event.userId,
        workspace_id: event.workspaceId,
        created_at: event.timestamp,
        updated_at: event.timestamp,
      });
    } else if (event instanceof DocumentUpdatedEvent) {
      await this.readRepo.update(event.documentId, {
        title: event.title,
        content: event.content,
        updated_at: event.timestamp,
      });
    }

    // Update search index
    await this.searchService.updateDocument(event.documentId, {
      title: event.title,
      content: event.content,
    });
  }
}

// Read repository optimized for queries
@Injectable()
export class DocumentReadRepository {
  constructor(@InjectKysely() private db: KyselyDB) {}

  async findById(id: string): Promise<DocumentView | null> {
    return this.db
      .selectFrom('document_views')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async findByWorkspace(workspaceId: string, filters: DocumentFilters): Promise<DocumentView[]> {
    let query = this.db
      .selectFrom('document_views')
      .selectAll()
      .where('workspace_id', '=', workspaceId);

    if (filters.authorId) {
      query = query.where('author_id', '=', filters.authorId);
    }

    if (filters.search) {
      query = query.where('search_vector', '@@', this.db.raw('plainto_tsquery(?)', [filters.search]));
    }

    return query
      .orderBy('updated_at', 'desc')
      .limit(filters.limit || 50)
      .offset(filters.offset || 0)
      .execute();
  }
}
```

:p How does CQRS improve application architecture, and what are the trade-offs between consistency and performance?
??x
**CQRS Benefits:**

1. **Scalability**: Read and write models can be scaled independently
2. **Performance**: Optimized queries without complex joins
3. **Flexibility**: Different storage mechanisms for reads vs writes
4. **Complexity Isolation**: Business logic separated from query optimization

**Trade-offs & Considerations:**

1. **Eventual Consistency**:
   - Read models may lag behind writes
   - Need to handle stale data scenarios
   - User experience considerations

2. **Complexity**:
   - More moving parts and infrastructure
   - Event handling and projection management
   - Debugging across multiple models

3. **Data Synchronization**:
   - Projection failures need handling
   - Event replay capabilities required
   - Monitoring and alerting essential

**Implementation Strategies**:
```typescript
// Handle eventual consistency in UI
class DocumentService {
  async createDocument(data: CreateDocumentData): Promise<string> {
    const command = new CreateDocumentCommand(data);
    const documentId = await this.commandBus.execute(command);
    
    // Return optimistic result
    return documentId;
  }
  
  async getDocument(id: string, options?: { consistency?: 'eventual' | 'strong' }): Promise<Document> {
    if (options?.consistency === 'strong') {
      // Read from write model (slower but consistent)
      return this.eventStore.loadAggregate(id, Document);
    }
    
    // Read from read model (faster but potentially stale)
    return this.queryBus.execute(new GetDocumentQuery(id));
  }
}

// Projection error handling
@EventsHandler(DocumentUpdatedEvent)
class DocumentProjectionWithRetry {
  async handle(event: DocumentUpdatedEvent): Promise<void> {
    try {
      await this.updateReadModel(event);
    } catch (error) {
      // Retry with exponential backoff
      await this.scheduleRetry(event, error);
    }
  }
}

// Monitoring projection lag
class ProjectionMonitor {
  @Cron('*/30 * * * * *') // Every 30 seconds
  async checkProjectionLag(): Promise<void> {
    const writeModelVersion = await this.eventStore.getLatestVersion();
    const readModelVersion = await this.readModelStore.getLatestVersion();
    
    const lag = writeModelVersion - readModelVersion;
    
    if (lag > this.alertThreshold) {
      await this.alertService.sendAlert({
        type: 'PROJECTION_LAG',
        lag,
        threshold: this.alertThreshold,
      });
    }
  }
}
```
x??

---

#### Saga Pattern for Distributed Transactions
Managing long-running business processes across multiple services with compensation logic:

```typescript
@Injectable()
export class DocumentCollaborationSaga {
  constructor(
    private commandBus: CommandBus,
    private eventBus: EventBus,
    private sagaRepository: SagaRepository,
  ) {}

  @SagaStart()
  @EventsHandler(DocumentEditRequestedEvent)
  async handleEditRequest(event: DocumentEditRequestedEvent): Promise<void> {
    const sagaId = uuid();
    
    const saga = new DocumentEditSaga({
      sagaId,
      documentId: event.documentId,
      userId: event.userId,
      operations: event.operations,
      status: 'started',
      steps: [],
    });

    await this.sagaRepository.save(saga);

    // Step 1: Acquire edit lock
    await this.commandBus.execute(
      new AcquireEditLockCommand(event.documentId, event.userId, sagaId)
    );
  }

  @EventsHandler(EditLockAcquiredEvent)
  async handleLockAcquired(event: EditLockAcquiredEvent): Promise<void> {
    const saga = await this.sagaRepository.findBySagaId(event.sagaId);
    
    saga.addStep({
      stepId: 'lock-acquired',
      status: 'completed',
      timestamp: new Date(),
    });

    // Step 2: Validate permissions
    await this.commandBus.execute(
      new ValidateEditPermissionsCommand(event.documentId, event.userId)
    );

    await this.sagaRepository.save(saga);
  }

  @EventsHandler(PermissionsValidatedEvent)
  async handlePermissionsValidated(event: PermissionsValidatedEvent): Promise<void> {
    const saga = await this.sagaRepository.findBySagaId(event.sagaId);
    
    saga.addStep({
      stepId: 'permissions-validated',
      status: 'completed',
      timestamp: new Date(),
    });

    // Step 3: Apply operational transform
    await this.commandBus.execute(
      new ApplyOperationalTransformCommand(
        event.documentId,
        event.operations,
        event.version
      )
    );

    await this.sagaRepository.save(saga);
  }

  @EventsHandler(OperationalTransformAppliedEvent)
  async handleTransformApplied(event: OperationalTransformAppliedEvent): Promise<void> {
    const saga = await this.sagaRepository.findBySagaId(event.sagaId);
    
    saga.complete();

    // Step 4: Release lock
    await this.commandBus.execute(
      new ReleaseEditLockCommand(event.documentId, event.sagaId)
    );

    await this.sagaRepository.save(saga);
  }

  // Compensation handlers for failures
  @EventsHandler(OperationalTransformFailedEvent)
  async handleTransformFailed(event: OperationalTransformFailedEvent): Promise<void> {
    const saga = await this.sagaRepository.findBySagaId(event.sagaId);
    
    saga.fail(event.error);

    // Compensate: Release lock
    await this.commandBus.execute(
      new ReleaseEditLockCommand(event.documentId, event.sagaId)
    );

    // Notify user of conflict
    await this.eventBus.publish(
      new EditConflictDetectedEvent(event.documentId, event.userId, event.error)
    );

    await this.sagaRepository.save(saga);
  }

  @EventsHandler(EditLockFailedEvent)
  async handleLockFailed(event: EditLockFailedEvent): Promise<void> {
    const saga = await this.sagaRepository.findBySagaId(event.sagaId);
    
    saga.fail('Failed to acquire edit lock');

    // No compensation needed - lock was never acquired
    await this.eventBus.publish(
      new EditRequestRejectedEvent(event.documentId, event.userId, 'Lock unavailable')
    );

    await this.sagaRepository.save(saga);
  }

  // Saga timeout handling
  @Cron('*/30 * * * * *') // Every 30 seconds
  async handleTimeouts(): Promise<void> {
    const timeoutThreshold = 5 * 60 * 1000; // 5 minutes
    const timedOutSagas = await this.sagaRepository.findTimedOut(timeoutThreshold);

    for (const saga of timedOutSagas) {
      await this.compensateSaga(saga);
    }
  }

  private async compensateSaga(saga: DocumentEditSaga): Promise<void> {
    // Compensate completed steps in reverse order
    const completedSteps = saga.steps
      .filter(step => step.status === 'completed')
      .reverse();

    for (const step of completedSteps) {
      switch (step.stepId) {
        case 'lock-acquired':
          await this.commandBus.execute(
            new ReleaseEditLockCommand(saga.documentId, saga.sagaId)
          );
          break;
        case 'transform-applied':
          await this.commandBus.execute(
            new RevertOperationalTransformCommand(saga.documentId, saga.operations)
          );
          break;
      }
    }

    saga.compensate();
    await this.sagaRepository.save(saga);
  }
}
```

:p How do saga patterns handle distributed transactions and what strategies exist for compensation when failures occur?
??x
**Saga Pattern Benefits:**

1. **Long-running Processes**: Handle workflows that span multiple services
2. **Eventual Consistency**: Achieve consistency without distributed transactions
3. **Fault Tolerance**: Automatic compensation on failures
4. **Scalability**: No locks held across service boundaries

**Compensation Strategies:**

1. **Compensating Actions**:
   - Semantic undo operations
   - Reverse order execution
   - Idempotent operations

2. **Saga Types**:
   - **Orchestration**: Central coordinator manages the flow
   - **Choreography**: Services react to events independently

3. **Failure Handling**:
   - Forward recovery (retry)
   - Backward recovery (compensate)
   - Timeout handling

**Implementation Patterns**:
```typescript
// Choreography-based saga
@EventsHandler(OrderCreatedEvent)
class PaymentService {
  async handle(event: OrderCreatedEvent) {
    try {
      await this.processPayment(event.orderId, event.amount);
      await this.eventBus.publish(new PaymentProcessedEvent(event.orderId));
    } catch (error) {
      await this.eventBus.publish(new PaymentFailedEvent(event.orderId, error));
    }
  }
}

@EventsHandler(PaymentFailedEvent)
class OrderService {
  async handle(event: PaymentFailedEvent) {
    // Compensate: Cancel the order
    await this.cancelOrder(event.orderId);
  }
}

// Orchestration-based saga
class OrderSagaOrchestrator {
  async processOrder(orderData: OrderData) {
    const saga = new OrderSaga(orderData);
    
    try {
      // Step 1: Reserve inventory
      await this.inventoryService.reserve(saga.items);
      saga.markStepCompleted('inventory-reserved');
      
      // Step 2: Process payment
      await this.paymentService.charge(saga.paymentInfo);
      saga.markStepCompleted('payment-processed');
      
      // Step 3: Ship order
      await this.shippingService.ship(saga.shippingInfo);
      saga.markStepCompleted('order-shipped');
      
    } catch (error) {
      await this.compensate(saga);
      throw error;
    }
  }
  
  private async compensate(saga: OrderSaga) {
    // Compensate in reverse order
    if (saga.isStepCompleted('payment-processed')) {
      await this.paymentService.refund(saga.paymentId);
    }
    
    if (saga.isStepCompleted('inventory-reserved')) {
      await this.inventoryService.release(saga.items);
    }
  }
}
```

**Design Considerations**:
- Compensating actions must be idempotent
- Handle partial failures gracefully
- Implement timeout and retry logic
- Monitor saga execution and failures
- Consider using state machines for complex sagas
x??