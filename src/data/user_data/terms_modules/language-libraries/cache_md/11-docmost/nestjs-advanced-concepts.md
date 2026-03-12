# NestJS Advanced Concepts Flashcards - Docmost Project

#### Advanced Microservices Architecture with Message Queues and Event Sourcing
Docmost implements sophisticated async processing using Bull queues and event-driven architecture for scalable operations:

```typescript
// Advanced queue processing with retry strategies
@Processor('email-queue')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private mailService: MailService,
    private userRepo: UserRepo,
    private telemetryService: TelemetryService,
  ) {}

  @Process({ name: 'send-notification', concurrency: 5 })
  async handleEmailNotification(job: Job<EmailNotificationData>) {
    const { userId, type, payload, priority } = job.data;
    
    try {
      // Rate limiting per user
      const rateLimitKey = `email:${userId}:${type}`;
      const currentCount = await this.cacheManager.get(rateLimitKey) || 0;
      
      if (currentCount >= this.getRateLimit(type)) {
        throw new Error(`Rate limit exceeded for user ${userId}`);
      }

      // Personalization and template processing
      const user = await this.userRepo.findById(userId);
      const template = await this.getTemplate(type, user.language);
      const personalizedContent = await this.personalizeContent(template, payload, user);

      // Send with delivery tracking
      const messageId = await this.mailService.send({
        to: user.email,
        subject: personalizedContent.subject,
        html: personalizedContent.html,
        trackingId: `${job.id}-${Date.now()}`,
        priority,
      });

      // Update rate limiting
      await this.cacheManager.set(rateLimitKey, currentCount + 1, { ttl: 3600 });

      // Event sourcing
      await this.eventStore.append(new EmailSentEvent({
        userId,
        messageId,
        type,
        timestamp: new Date(),
        metadata: { jobId: job.id, attempt: job.attemptsMade + 1 },
      }));

      this.telemetryService.incrementCounter('emails.sent', { type });
      
      return { messageId, status: 'delivered' };
    } catch (error) {
      this.logger.error(`Email job failed: ${error.message}`, error.stack);
      
      // Advanced retry strategy based on error type
      if (this.isRetryableError(error)) {
        const delay = this.calculateExponentialBackoff(job.attemptsMade);
        throw new Error(`Retryable error: ${error.message}`);
      }
      
      // Dead letter queue for non-retryable errors
      await this.moveToDeadLetterQueue(job, error);
      throw error;
    }
  }

  private calculateExponentialBackoff(attempt: number): number {
    const baseDelay = 1000; // 1 second
    const maxDelay = 300000; // 5 minutes
    const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
    
    // Add jitter to prevent thundering herd
    return delay + Math.random() * 1000;
  }

  private isRetryableError(error: Error): boolean {
    const retryableErrors = [
      'ECONNRESET',
      'TIMEOUT',
      'RATE_LIMITED',
      'SERVICE_UNAVAILABLE',
    ];
    
    return retryableErrors.some(type => error.message.includes(type));
  }

  @OnQueueCompleted()
  async onCompleted(job: Job, result: any) {
    this.logger.log(`Job ${job.id} completed successfully`);
    await this.updateJobMetrics(job, 'completed');
  }

  @OnQueueFailed()
  async onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed: ${error.message}`);
    await this.updateJobMetrics(job, 'failed');
    
    // Alert on critical failures
    if (job.attemptsMade >= job.opts.attempts) {
      await this.alertingService.sendAlert({
        type: 'QUEUE_JOB_EXHAUSTED',
        message: `Job ${job.id} exhausted all retry attempts`,
        severity: 'critical',
        metadata: { jobData: job.data, error: error.message },
      });
    }
  }
}

// Event sourcing with CQRS pattern
@Injectable()
export class DocumentEventStore {
  constructor(
    @InjectKysely() private db: KyselyDB,
    private eventPublisher: EventPublisher,
  ) {}

  async appendEvents(streamId: string, events: DomainEvent[], expectedVersion?: number): Promise<void> {
    return this.db.transaction().execute(async (trx) => {
      // Optimistic concurrency control
      if (expectedVersion !== undefined) {
        const currentVersion = await this.getStreamVersion(trx, streamId);
        if (currentVersion !== expectedVersion) {
          throw new ConcurrencyError(`Expected version ${expectedVersion}, got ${currentVersion}`);
        }
      }

      // Append events atomically
      const eventRecords = events.map((event, index) => ({
        stream_id: streamId,
        event_type: event.constructor.name,
        event_data: JSON.stringify(event.payload),
        event_metadata: JSON.stringify(event.metadata),
        version: expectedVersion ? expectedVersion + index + 1 : index + 1,
        timestamp: new Date(),
      }));

      await trx.insertInto('event_store').values(eventRecords).execute();

      // Update read models asynchronously
      events.forEach(event => this.eventPublisher.publish(event));
    });
  }

  async getEvents(streamId: string, fromVersion?: number): Promise<DomainEvent[]> {
    let query = this.db
      .selectFrom('event_store')
      .selectAll()
      .where('stream_id', '=', streamId)
      .orderBy('version', 'asc');

    if (fromVersion) {
      query = query.where('version', '>', fromVersion);
    }

    const records = await query.execute();
    
    return records.map(record => this.deserializeEvent(record));
  }

  // Snapshot optimization for large event streams
  async createSnapshot(streamId: string, state: any, version: number): Promise<void> {
    await this.db
      .insertInto('snapshots')
      .values({
        stream_id: streamId,
        snapshot_data: JSON.stringify(state),
        version,
        timestamp: new Date(),
      })
      .onConflict((oc) => oc.column('stream_id').doUpdateSet({
        snapshot_data: (eb) => eb.ref('excluded.snapshot_data'),
        version: (eb) => eb.ref('excluded.version'),
        timestamp: (eb) => eb.ref('excluded.timestamp'),
      }))
      .execute();
  }
}
```

This demonstrates advanced async processing, event sourcing, CQRS patterns, and distributed system resilience.
:p How would you design a scalable event-driven architecture for a collaborative platform that handles high-throughput document operations, user notifications, real-time updates, and background processing? What patterns would you use for event sourcing, CQRS, saga patterns for distributed transactions, and how would you ensure eventual consistency across microservices while maintaining performance and reliability?
??x
**Event-Driven Architecture Design for Scalable Collaboration:**

1. **Event Sourcing Strategy**:
   - Store all state changes as immutable events
   - Implement event versioning for schema evolution
   - Use snapshots for performance optimization
   - Separate command and query responsibilities (CQRS)

2. **Message Queue Architecture**:
   - Use Bull/BullMQ for reliable job processing
   - Implement dead letter queues for failure handling
   - Priority queues for different operation types
   - Circuit breakers for external service calls

3. **Distributed Transaction Management**:
   - Saga pattern for long-running workflows
   - Compensating actions for rollback scenarios
   - Timeout handling for incomplete sagas
   - State machine tracking for saga progress

4. **Eventual Consistency Patterns**:
   - Event replay for read model reconstruction
   - Conflict resolution strategies (Last Writer Wins, Vector Clocks)
   - Idempotent event handlers
   - Out-of-order event handling

**Implementation Example:**
```typescript
// Saga orchestrator for document collaboration
@Injectable()
export class DocumentCollaborationSaga {
  @SagaStart()
  @EventsHandler(DocumentEditRequestedEvent)
  async handleEditRequest(event: DocumentEditRequestedEvent) {
    const sagaId = uuid();
    
    // Step 1: Acquire edit lock
    await this.commandBus.execute(
      new AcquireEditLockCommand(event.documentId, event.userId, sagaId)
    );
  }

  @EventsHandler(EditLockAcquiredEvent)
  async handleLockAcquired(event: EditLockAcquiredEvent) {
    // Step 2: Validate permissions
    await this.commandBus.execute(
      new ValidateEditPermissionsCommand(event.documentId, event.userId)
    );
  }

  @EventsHandler(PermissionsValidatedEvent)
  async handlePermissionsValidated(event: PermissionsValidatedEvent) {
    // Step 3: Apply operational transform
    await this.commandBus.execute(
      new ApplyOperationalTransformCommand(
        event.documentId,
        event.operations,
        event.version
      )
    );
  }

  @EventsHandler(OperationalTransformFailedEvent)
  async handleTransformFailed(event: OperationalTransformFailedEvent) {
    // Compensating action: Release lock
    await this.commandBus.execute(
      new ReleaseEditLockCommand(event.documentId, event.sagaId)
    );
    
    // Notify user of conflict
    await this.eventBus.publish(
      new EditConflictDetectedEvent(event.documentId, event.userId)
    );
  }
}

// Event store with partitioning
@Injectable()
export class DistributedEventStore {
  async appendEvents(streamId: string, events: DomainEvent[]): Promise<void> {
    const partition = this.getPartition(streamId);
    const client = this.getPartitionClient(partition);
    
    return client.transaction().execute(async (trx) => {
      // Vector clock for ordering
      const vectorClock = await this.getVectorClock(streamId);
      
      const eventRecords = events.map(event => ({
        ...event,
        vector_clock: vectorClock.increment(this.nodeId),
        partition_key: partition,
      }));
      
      await trx.insertInto('events').values(eventRecords).execute();
      
      // Publish to event bus for cross-service communication
      await this.eventBus.publishAll(events);
    });
  }
  
  private getPartition(streamId: string): number {
    return crc32(streamId) % this.partitionCount;
  }
}

// Read model projections
@EventsHandler(DocumentUpdatedEvent)
export class DocumentSearchProjection {
  async handle(event: DocumentUpdatedEvent) {
    // Update search index
    await this.searchService.updateDocument({
      id: event.documentId,
      content: event.content,
      title: event.title,
      updatedAt: event.timestamp,
    });
    
    // Update analytics
    await this.analyticsService.recordEvent('document.updated', {
      documentId: event.documentId,
      userId: event.userId,
      contentLength: event.content.length,
    });
  }
}
```

**Resilience and Monitoring:**
- Circuit breakers for external dependencies
- Health checks for all services
- Distributed tracing for request correlation
- Metrics and alerting for queue depths, processing times
- Auto-scaling based on queue depth and CPU utilization
x??

---

#### Advanced Security Patterns: Multi-tenant Authorization and Rate Limiting
Docmost implements sophisticated security with workspace isolation, RBAC, and intelligent rate limiting:

```typescript
// Advanced CASL authorization with dynamic rules
@Injectable()
export class DynamicAbilityFactory {
  constructor(
    private configService: ConfigService,
    private cacheManager: CacheManager,
  ) {}

  async createForUser(user: User, workspace: Workspace): Promise<AppAbility> {
    const cacheKey = `abilities:${user.id}:${workspace.id}`;
    
    // Cache abilities for performance
    let cachedAbilities = await this.cacheManager.get(cacheKey);
    if (cachedAbilities) {
      return new AppAbility(cachedAbilities);
    }

    const { can, cannot, build } = new AbilityBuilder(AppAbility);

    // Base permissions based on user role
    const basePermissions = await this.getBasePermissions(user.role);
    basePermissions.forEach(permission => {
      can(permission.action, permission.subject, permission.conditions);
    });

    // Dynamic permissions based on resource ownership
    const ownedResources = await this.getUserOwnedResources(user.id, workspace.id);
    ownedResources.forEach(resource => {
      can('manage', resource.type, { ownerId: user.id });
    });

    // Workspace-specific permissions
    const workspacePermissions = await this.getWorkspacePermissions(user.id, workspace.id);
    workspacePermissions.forEach(permission => {
      if (permission.granted) {
        can(permission.action, permission.subject, permission.conditions);
      } else {
        cannot(permission.action, permission.subject, permission.conditions);
      }
    });

    // Time-based permissions (e.g., temporary access)
    const timeBasedPermissions = await this.getTimeBasedPermissions(user.id);
    timeBasedPermissions.forEach(permission => {
      if (permission.validUntil > new Date()) {
        can(permission.action, permission.subject, permission.conditions);
      }
    });

    // Feature flags and enterprise permissions
    if (workspace.plan === 'enterprise') {
      can('manage', 'ApiKey');
      can('read', 'AuditLog');
      can('manage', 'SsoProvider');
    }

    const ability = build();
    
    // Cache with TTL
    await this.cacheManager.set(cacheKey, ability.rules, { ttl: 300 });
    
    return ability;
  }

  // Invalidate cache when permissions change
  async invalidateUserAbilities(userId: string, workspaceId?: string) {
    if (workspaceId) {
      await this.cacheManager.del(`abilities:${userId}:${workspaceId}`);
    } else {
      const pattern = `abilities:${userId}:*`;
      const keys = await this.cacheManager.store.keys(pattern);
      await Promise.all(keys.map(key => this.cacheManager.del(key)));
    }
  }
}

// Advanced rate limiting with multiple strategies
@Injectable()
export class IntelligentRateLimiter {
  constructor(
    private redis: Redis,
    private configService: ConfigService,
    private metricsService: MetricsService,
  ) {}

  async checkRateLimit(context: RateLimitContext): Promise<RateLimitResult> {
    const strategies = [
      this.checkFixedWindow(context),
      this.checkSlidingWindow(context),
      this.checkTokenBucket(context),
      this.checkAdaptiveLimit(context),
    ];

    const results = await Promise.all(strategies);
    
    // Use the most restrictive result
    const result = results.reduce((most, current) => 
      current.remaining < most.remaining ? current : most
    );

    // Record metrics for analysis
    await this.metricsService.recordRateLimit({
      identifier: context.identifier,
      endpoint: context.endpoint,
      remaining: result.remaining,
      resetTime: result.resetTime,
      strategy: result.strategy,
    });

    return result;
  }

  private async checkTokenBucket(context: RateLimitContext): Promise<RateLimitResult> {
    const key = `bucket:${context.identifier}:${context.endpoint}`;
    const config = this.getRateLimitConfig(context);
    
    const script = `
      local bucket_key = KEYS[1]
      local capacity = tonumber(ARGV[1])
      local tokens = tonumber(ARGV[2])
      local interval = tonumber(ARGV[3])
      local now = tonumber(ARGV[4])
      
      local bucket = redis.call('HMGET', bucket_key, 'tokens', 'last_refill')
      local current_tokens = tonumber(bucket[1]) or capacity
      local last_refill = tonumber(bucket[2]) or now
      
      -- Calculate tokens to add based on time elapsed
      local elapsed = now - last_refill
      local tokens_to_add = math.floor(elapsed / interval * tokens)
      current_tokens = math.min(capacity, current_tokens + tokens_to_add)
      
      if current_tokens >= 1 then
        current_tokens = current_tokens - 1
        redis.call('HMSET', bucket_key, 
          'tokens', current_tokens, 
          'last_refill', now)
        redis.call('EXPIRE', bucket_key, interval * 2)
        return {1, current_tokens, now + interval}
      else
        return {0, 0, now + interval}
      end
    `;

    const [allowed, remaining, resetTime] = await this.redis.eval(
      script, 1, key,
      config.capacity, config.refillRate, config.refillInterval, Date.now()
    ) as [number, number, number];

    return {
      allowed: allowed === 1,
      remaining,
      resetTime: new Date(resetTime),
      strategy: 'token_bucket',
    };
  }

  private async checkAdaptiveLimit(context: RateLimitContext): Promise<RateLimitResult> {
    // Adjust limits based on system load and user behavior
    const baseLimit = this.getBaseLimit(context);
    const systemLoad = await this.getSystemLoad();
    const userScore = await this.getUserReputationScore(context.identifier);
    
    // Reduce limits under high load
    const loadMultiplier = systemLoad > 0.8 ? 0.5 : 1.0;
    
    // Increase limits for trusted users
    const trustMultiplier = userScore > 0.8 ? 1.5 : 1.0;
    
    const adaptiveLimit = Math.floor(baseLimit * loadMultiplier * trustMultiplier);
    
    return this.checkFixedWindow({
      ...context,
      limit: adaptiveLimit,
    });
  }

  private async getUserReputationScore(identifier: string): Promise<number> {
    // Calculate reputation based on historical behavior
    const metrics = await this.redis.hmget(
      `user:reputation:${identifier}`,
      'successful_requests',
      'failed_requests',
      'rate_limit_violations',
      'account_age'
    );

    const [successful, failed, violations, age] = metrics.map(Number);
    
    if (!successful && !failed) return 0.5; // Default for new users
    
    const successRate = successful / (successful + failed);
    const violationRate = violations / (successful + failed + violations);
    const ageBonus = Math.min(age / (365 * 24 * 60 * 60 * 1000), 1); // Max 1 year
    
    return Math.max(0, Math.min(1, successRate - violationRate + ageBonus * 0.1));
  }
}

// Multi-tenant data isolation
@Injectable()
export class TenantDataService {
  constructor(@InjectKysely() private db: KyselyDB) {}

  // Automatic workspace filtering for all queries
  createWorkspaceQuery<T extends keyof DB>(table: T, workspaceId: string) {
    return this.db
      .selectFrom(table)
      .where('workspace_id', '=', workspaceId);
  }

  // Row-level security enforcement
  async findWithSecurity<T>(
    table: keyof DB,
    conditions: any,
    user: User,
    workspace: Workspace
  ): Promise<T[]> {
    let query = this.db
      .selectFrom(table as any)
      .where('workspace_id', '=', workspace.id);

    // Apply user-specific filters based on permissions
    if (user.role !== 'admin') {
      query = query.where((eb) => eb.or([
        eb('created_by', '=', user.id),
        eb('is_public', '=', true),
        eb.exists(
          eb.selectFrom('permissions')
            .where('resource_id', '=', eb.ref(`${table}.id`))
            .where('user_id', '=', user.id)
            .where('action', '=', 'read')
        )
      ]));
    }

    Object.entries(conditions).forEach(([key, value]) => {
      query = query.where(key as any, '=', value);
    });

    return query.execute() as Promise<T[]>;
  }
}
```

This demonstrates enterprise-grade security with dynamic authorization, intelligent rate limiting, and data isolation.
:p How would you implement a comprehensive security architecture for a multi-tenant SaaS application that includes dynamic role-based permissions, intelligent rate limiting that adapts to system load and user behavior, data isolation at the row level, audit logging, and protection against common attacks (CSRF, XSS, injection)? What patterns would you use for zero-trust security, secret management, and compliance with regulations like GDPR?
??x
**Comprehensive Security Architecture for Multi-tenant SaaS:**

1. **Zero-Trust Security Model**:
   - Verify every request regardless of source
   - Continuous authentication and authorization
   - Principle of least privilege
   - Network micro-segmentation

2. **Dynamic Authorization (RBAC + ABAC)**:
   - Attribute-based access control for complex scenarios
   - Policy-as-code with evaluation engines
   - Real-time permission computation
   - Permission inheritance and delegation

3. **Advanced Rate Limiting**:
   - Multiple algorithms (token bucket, sliding window, adaptive)
   - User reputation scoring
   - Distributed rate limiting across instances
   - Circuit breakers for cascade failure prevention

4. **Data Protection and Isolation**:
   - Row-level security with automatic filtering
   - Data encryption at rest and in transit
   - Key rotation and secure key management
   - Database query validation and sanitization

**Implementation Examples:**
```typescript
// Zero-trust middleware
@Injectable()
export class ZeroTrustMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // 1. Request signature validation
    await this.validateRequestSignature(req);
    
    // 2. Device fingerprinting
    const deviceFingerprint = await this.generateDeviceFingerprint(req);
    
    // 3. Behavioral analysis
    const riskScore = await this.calculateRiskScore(req, deviceFingerprint);
    
    // 4. Adaptive authentication
    if (riskScore > 0.7) {
      throw new UnauthorizedException('Additional verification required');
    }
    
    // 5. Request context enrichment
    req.securityContext = {
      riskScore,
      deviceFingerprint,
      geoLocation: await this.getGeoLocation(req.ip),
      timestamp: new Date(),
    };
    
    next();
  }
}

// GDPR compliance service
@Injectable()
export class GdprComplianceService {
  async handleDataSubjectRequest(request: DataSubjectRequest): Promise<void> {
    switch (request.type) {
      case 'access':
        return this.exportUserData(request.userId);
      case 'deletion':
        return this.deleteUserData(request.userId);
      case 'portability':
        return this.exportPortableData(request.userId);
      case 'rectification':
        return this.updateUserData(request.userId, request.corrections);
    }
  }

  private async deleteUserData(userId: string): Promise<void> {
    // Anonymize instead of hard delete for audit trails
    await this.db.transaction().execute(async (trx) => {
      // Anonymize PII
      await trx
        .updateTable('users')
        .set({
          email: `deleted-${userId}@example.com`,
          name: 'Deleted User',
          avatar: null,
          deleted_at: new Date(),
        })
        .where('id', '=', userId)
        .execute();
      
      // Preserve analytics with anonymized data
      await trx
        .updateTable('audit_logs')
        .set({ user_id: 'anonymized' })
        .where('user_id', '=', userId)
        .execute();
    });
  }
}

// Secret management with rotation
@Injectable()
export class SecretManager {
  private secretCache = new Map<string, { value: string; expiresAt: Date }>();

  async getSecret(secretName: string): Promise<string> {
    const cached = this.secretCache.get(secretName);
    if (cached && cached.expiresAt > new Date()) {
      return cached.value;
    }

    // Fetch from secure vault (HashiCorp Vault, AWS Secrets Manager)
    const secret = await this.vaultService.getSecret(secretName);
    
    // Cache with TTL
    this.secretCache.set(secretName, {
      value: secret.value,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    });

    return secret.value;
  }

  @Cron('0 0 * * *') // Daily rotation
  async rotateSecrets(): Promise<void> {
    const secretsToRotate = ['database-password', 'api-keys', 'jwt-secret'];
    
    for (const secretName of secretsToRotate) {
      await this.rotateSecret(secretName);
    }
  }

  private async rotateSecret(secretName: string): Promise<void> {
    // Generate new secret
    const newSecret = this.generateSecureSecret();
    
    // Update in vault
    await this.vaultService.updateSecret(secretName, newSecret);
    
    // Update application configuration
    await this.updateApplicationConfig(secretName, newSecret);
    
    // Invalidate cache
    this.secretCache.delete(secretName);
    
    // Audit log
    await this.auditService.log({
      action: 'SECRET_ROTATED',
      resource: secretName,
      timestamp: new Date(),
    });
  }
}

// SQL injection prevention
@Injectable()
export class QueryBuilder {
  // Type-safe query builder prevents injection
  async safeQuery<T>(
    table: keyof DB,
    filters: QueryFilters,
    user: User
  ): Promise<T[]> {
    // All queries use parameterized statements
    let query = this.db.selectFrom(table);
    
    // Whitelist allowed columns for filtering
    const allowedColumns = this.getAllowedColumns(table, user.role);
    
    Object.entries(filters).forEach(([column, value]) => {
      if (!allowedColumns.includes(column)) {
        throw new BadRequestException(`Invalid filter column: ${column}`);
      }
      
      // Validate and sanitize input
      const sanitizedValue = this.sanitizeValue(value, column);
      query = query.where(column as any, '=', sanitizedValue);
    });
    
    return query.execute();
  }
}
```

**Security Monitoring and Compliance:**
- Real-time security event monitoring
- Automated threat detection and response
- Regular security audits and penetration testing
- Compliance reporting automation (SOC 2, GDPR, HIPAA)
- Incident response playbooks and automation
x??

---

#### Advanced Database Patterns: Connection Pooling, Transactions, and Query Optimization
Docmost implements sophisticated database management with connection pooling, advanced transactions, and performance optimization:

```typescript
// Advanced connection pool management with metrics
@Injectable()
export class DatabaseConnectionManager {
  private pools: Map<string, Pool> = new Map();
  private metrics: DatabaseMetrics;

  constructor(
    private configService: ConfigService,
    private metricsService: MetricsService,
    private healthService: HealthService,
  ) {
    this.metrics = new DatabaseMetrics(metricsService);
    this.initializePools();
    this.startHealthChecking();
  }

  private initializePools(): void {
    const configs = this.configService.getDatabaseConfigs();
    
    configs.forEach((config, name) => {
      const pool = new Pool({
        ...config,
        // Advanced pool configuration
        max: config.maxConnections || 20,
        min: config.minConnections || 2,
        acquireTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,
        
        // Connection validation
        validate: async (client) => {
          try {
            await client.query('SELECT 1');
            return true;
          } catch {
            return false;
          }
        },
        
        // Custom connection factory with monitoring
        create: async () => {
          const startTime = performance.now();
          try {
            const client = new Client(config);
            await client.connect();
            
            // Instrument client for monitoring
            this.instrumentClient(client, name);
            
            this.metrics.recordConnectionCreated(name, performance.now() - startTime);
            return client;
          } catch (error) {
            this.metrics.recordConnectionError(name, error);
            throw error;
          }
        },
      });

      this.pools.set(name, pool);
    });
  }

  async getConnection(poolName: string = 'default'): Promise<PoolClient> {
    const pool = this.pools.get(poolName);
    if (!pool) {
      throw new Error(`Database pool '${poolName}' not found`);
    }

    const startTime = performance.now();
    try {
      const client = await pool.connect();
      this.metrics.recordConnectionAcquired(poolName, performance.now() - startTime);
      return client;
    } catch (error) {
      this.metrics.recordConnectionError(poolName, error);
      throw error;
    }
  }

  private instrumentClient(client: Client, poolName: string): void {
    const originalQuery = client.query.bind(client);
    
    client.query = async (text: string, params?: any[]) => {
      const queryId = this.generateQueryId();
      const startTime = performance.now();
      
      try {
        this.metrics.recordQueryStart(poolName, queryId, text);
        const result = await originalQuery(text, params);
        
        const duration = performance.now() - startTime;
        this.metrics.recordQuerySuccess(poolName, queryId, duration, result.rowCount);
        
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        this.metrics.recordQueryError(poolName, queryId, duration, error);
        throw error;
      }
    };
  }

  // Intelligent connection pooling based on load
  @Cron('*/30 * * * * *') // Every 30 seconds
  async optimizePools(): Promise<void> {
    for (const [name, pool] = this.pools) {
      const stats = await this.getPoolStats(pool);
      
      // Auto-scale based on utilization
      if (stats.utilization > 0.8 && stats.totalConnections < stats.maxConnections) {
        await this.scalePoolUp(name, pool);
      } else if (stats.utilization < 0.3 && stats.totalConnections > stats.minConnections) {
        await this.scalePoolDown(name, pool);
      }
      
      // Detect and handle connection leaks
      if (stats.activeConnections > stats.totalConnections * 0.9) {
        await this.detectConnectionLeaks(name, pool);
      }
    }
  }
}

// Advanced transaction management with saga pattern
@Injectable()
export class TransactionOrchestrator {
  constructor(
    @InjectKysely() private db: KyselyDB,
    private eventBus: EventBus,
    private compensationService: CompensationService,
  ) {}

  async executeDistributedTransaction<T>(
    operations: TransactionOperation[],
    options: TransactionOptions = {}
  ): Promise<T> {
    const transactionId = this.generateTransactionId();
    const compensations: CompensationAction[] = [];

    try {
      // Execute operations in order with compensation tracking
      for (const operation of operations) {
        const result = await this.executeOperation(operation, transactionId);
        
        if (operation.compensation) {
          compensations.unshift(operation.compensation); // LIFO for rollback
        }
        
        // Check for timeout
        if (options.timeout && Date.now() - startTime > options.timeout) {
          throw new TransactionTimeoutError(`Transaction ${transactionId} timed out`);
        }
      }

      // Commit phase - publish success events
      await this.eventBus.publish(new TransactionCommittedEvent(transactionId));
      
      return result;
    } catch (error) {
      // Compensation phase - rollback in reverse order
      await this.executeCompensations(compensations, transactionId);
      
      await this.eventBus.publish(new TransactionRolledBackEvent(transactionId, error));
      
      throw new DistributedTransactionError(
        `Transaction ${transactionId} failed: ${error.message}`,
        { transactionId, compensations: compensations.length }
      );
    }
  }

  private async executeOperation(
    operation: TransactionOperation,
    transactionId: string
  ): Promise<any> {
    return this.db.transaction().execute(async (trx) => {
      // Set transaction context
      await trx
        .insertInto('transaction_log')
        .values({
          transaction_id: transactionId,
          operation_id: operation.id,
          status: 'executing',
          started_at: new Date(),
        })
        .execute();

      try {
        const result = await operation.execute(trx);
        
        // Update success status
        await trx
          .updateTable('transaction_log')
          .set({ 
            status: 'completed',
            completed_at: new Date(),
            result: JSON.stringify(result),
          })
          .where('transaction_id', '=', transactionId)
          .where('operation_id', '=', operation.id)
          .execute();

        return result;
      } catch (error) {
        // Update failure status
        await trx
          .updateTable('transaction_log')
          .set({ 
            status: 'failed',
            completed_at: new Date(),
            error: error.message,
          })
          .where('transaction_id', '=', transactionId)
          .where('operation_id', '=', operation.id)
          .execute();

        throw error;
      }
    });
  }
}

// Query optimization with caching and analysis
@Injectable()
export class QueryOptimizer {
  private queryCache = new LRUCache<string, QueryResult>({
    max: 1000,
    ttl: 5 * 60 * 1000, // 5 minutes
  });

  private slowQueryThreshold = 1000; // 1 second

  async executeOptimizedQuery<T>(
    queryBuilder: () => Promise<T>,
    cacheKey?: string,
    options: QueryOptions = {}
  ): Promise<T> {
    // Check cache first
    if (cacheKey && !options.bypassCache) {
      const cached = this.queryCache.get(cacheKey);
      if (cached) {
        this.metricsService.incrementCounter('query.cache.hit');
        return cached.data as T;
      }
    }

    const startTime = performance.now();
    let queryPlan: string | null = null;

    try {
      // Analyze query plan for complex queries
      if (options.analyzePerformance) {
        queryPlan = await this.analyzeQueryPlan(queryBuilder);
      }

      const result = await queryBuilder();
      const duration = performance.now() - startTime;

      // Cache successful results
      if (cacheKey && options.cacheable !== false) {
        this.queryCache.set(cacheKey, {
          data: result,
          timestamp: new Date(),
          duration,
        });
      }

      // Log slow queries for optimization
      if (duration > this.slowQueryThreshold) {
        await this.logSlowQuery({
          duration,
          queryPlan,
          stackTrace: new Error().stack,
          cacheKey,
        });
      }

      this.metricsService.recordQueryDuration('optimized', duration);
      return result;
    } catch (error) {
      this.metricsService.incrementCounter('query.error');
      throw error;
    }
  }

  private async analyzeQueryPlan(queryBuilder: () => Promise<any>): Promise<string> {
    // Extract SQL from query builder (Kysely-specific)
    const sql = queryBuilder.toString();
    
    // Get execution plan
    const plan = await this.db
      .selectFrom('pg_stat_statements')
      .select(['query', 'calls', 'mean_exec_time', 'rows'])
      .where('query', 'like', `${sql.substring(0, 50)}%`)
      .executeTakeFirst();

    return plan ? JSON.stringify(plan) : null;
  }

  // Automatic index suggestions based on query patterns
  @Cron('0 2 * * *') // Daily at 2 AM
  async suggestIndexes(): Promise<void> {
    const slowQueries = await this.getSlowQueryAnalysis();
    
    for (const query of slowQueries) {
      const suggestions = await this.analyzeIndexOpportunities(query);
      
      if (suggestions.length > 0) {
        await this.notifyDatabaseAdministrators({
          query: query.sql,
          suggestions,
          frequency: query.calls,
          avgDuration: query.meanDuration,
        });
      }
    }
  }

  private async analyzeIndexOpportunities(query: SlowQuery): Promise<IndexSuggestion[]> {
    const suggestions: IndexSuggestion[] = [];
    
    // Parse WHERE conditions
    const whereConditions = this.extractWhereConditions(query.sql);
    
    for (const condition of whereConditions) {
      const existingIndexes = await this.getExistingIndexes(condition.table, condition.column);
      
      if (existingIndexes.length === 0) {
        suggestions.push({
          type: 'btree',
          table: condition.table,
          columns: [condition.column],
          reason: `WHERE condition on ${condition.column}`,
          estimatedImprovement: await this.estimateIndexImprovement(query, condition),
        });
      }
    }
    
    return suggestions;
  }
}
```

This demonstrates enterprise-grade database management with connection pooling, distributed transactions, and intelligent query optimization.
:p How would you design a high-performance database layer for a distributed application that handles connection pooling across multiple database instances, implements distributed transactions with ACID guarantees, provides intelligent query optimization with caching, monitors performance metrics, and automatically suggests schema optimizations? What patterns would you use for database sharding, read replicas, and maintaining consistency across multiple data stores?
??x
**High-Performance Distributed Database Architecture:**

1. **Connection Pool Strategy**:
   - Separate pools for read/write operations
   - Dynamic pool sizing based on load
   - Connection health monitoring with automatic recovery
   - Load balancing across database instances

2. **Distributed Transaction Management**:
   - Two-phase commit (2PC) for ACID guarantees
   - Saga pattern for long-running transactions
   - Compensation actions for rollback scenarios
   - Transaction timeout and deadlock detection

3. **Query Optimization Strategy**:
   - Multi-level caching (query result, compiled queries, connection cache)
   - Query plan analysis and optimization suggestions
   - Automatic index creation based on query patterns
   - Query rewriting for performance

4. **Data Distribution Patterns**:
   - Horizontal sharding by tenant/workspace
   - Read replicas for query scaling
   - Event sourcing for audit and replay capabilities
   - CQRS for read/write optimization

**Implementation Architecture:**
```typescript
// Database cluster manager
@Injectable()
export class DatabaseClusterManager {
  private clusters: Map<string, DatabaseCluster> = new Map();
  
  constructor() {
    this.initializeClusters();
  }
  
  private initializeClusters() {
    // Master-slave configuration
    this.clusters.set('primary', new DatabaseCluster({
      master: { host: 'db-master', role: 'write' },
      slaves: [
        { host: 'db-slave-1', role: 'read', weight: 1 },
        { host: 'db-slave-2', role: 'read', weight: 1 },
      ],
      sharding: {
        strategy: 'consistent-hash',
        shards: ['shard-1', 'shard-2', 'shard-3'],
        shardKey: 'workspace_id',
      }
    }));
  }
  
  async getConnection(operation: 'read' | 'write', shardKey?: string): Promise<Connection> {
    const cluster = this.clusters.get('primary');
    
    if (operation === 'write') {
      return cluster.getMasterConnection();
    }
    
    // Read from appropriate shard
    if (shardKey) {
      const shard = this.getShardForKey(shardKey);
      return cluster.getShardConnection(shard);
    }
    
    // Load balance across read replicas
    return cluster.getReadConnection();
  }
}

// Distributed transaction coordinator
@Injectable()
export class DistributedTransactionCoordinator {
  async executeDistributedTransaction(operations: TransactionOperation[]): Promise<void> {
    const transactionId = uuid();
    const participants: Participant[] = [];
    
    try {
      // Phase 1: Prepare
      for (const operation of operations) {
        const participant = await this.prepare(operation, transactionId);
        participants.push(participant);
      }
      
      // Check if all participants are ready
      const allReady = participants.every(p => p.status === 'prepared');
      
      if (allReady) {
        // Phase 2: Commit
        await Promise.all(
          participants.map(p => this.commit(p, transactionId))
        );
      } else {
        // Abort transaction
        await Promise.all(
          participants.map(p => this.abort(p, transactionId))
        );
        throw new TransactionAbortedError('Not all participants prepared');
      }
    } catch (error) {
      // Cleanup on failure
      await Promise.all(
        participants.map(p => this.abort(p, transactionId))
      );
      throw error;
    }
  }
  
  private async prepare(operation: TransactionOperation, txId: string): Promise<Participant> {
    const connection = await this.getConnectionForOperation(operation);
    
    try {
      await connection.query('BEGIN');
      await operation.execute(connection);
      
      // Don't commit yet, just prepare
      return {
        id: operation.id,
        connection,
        status: 'prepared',
        transactionId: txId,
      };
    } catch (error) {
      await connection.query('ROLLBACK');
      return {
        id: operation.id,
        connection,
        status: 'failed',
        error,
        transactionId: txId,
      };
    }
  }
}

// Intelligent caching with invalidation
@Injectable()
export class QueryCacheManager {
  private l1Cache = new LRU({ max: 1000 }); // In-memory
  private l2Cache: Redis; // Distributed cache
  
  async executeWithCache<T>(
    query: QueryDefinition,
    executor: () => Promise<T>
  ): Promise<T> {
    const cacheKey = this.generateCacheKey(query);
    
    // L1 cache check
    let result = this.l1Cache.get(cacheKey);
    if (result) {
      return result as T;
    }
    
    // L2 cache check
    const l2Result = await this.l2Cache.get(cacheKey);
    if (l2Result) {
      result = JSON.parse(l2Result);
      this.l1Cache.set(cacheKey, result);
      return result as T;
    }
    
    // Execute query
    result = await executor();
    
    // Cache at both levels
    this.l1Cache.set(cacheKey, result);
    await this.l2Cache.setex(cacheKey, query.ttl || 300, JSON.stringify(result));
    
    return result as T;
  }
  
  async invalidatePattern(pattern: string): Promise<void> {
    // Invalidate L1 cache
    for (const key of this.l1Cache.keys()) {
      if (minimatch(key, pattern)) {
        this.l1Cache.delete(key);
      }
    }
    
    // Invalidate L2 cache
    const keys = await this.l2Cache.keys(pattern);
    if (keys.length > 0) {
      await this.l2Cache.del(...keys);
    }
  }
}

// Automatic schema optimization
@Injectable()
export class SchemaOptimizer {
  @Cron('0 3 * * 0') // Weekly on Sunday at 3 AM
  async analyzeAndOptimize(): Promise<void> {
    const analyses = await Promise.all([
      this.analyzeIndexUsage(),
      this.analyzeQueryPatterns(),
      this.analyzeTableStatistics(),
    ]);
    
    const recommendations = this.generateRecommendations(analyses);
    
    // Apply safe optimizations automatically
    const safeOptimizations = recommendations.filter(r => r.risk === 'low');
    for (const optimization of safeOptimizations) {
      await this.applyOptimization(optimization);
    }
    
    // Notify administrators of risky changes
    const riskyOptimizations = recommendations.filter(r => r.risk !== 'low');
    if (riskyOptimizations.length > 0) {
      await this.notifyAdministrators(riskyOptimizations);
    }
  }
}
```

**Monitoring and Observability:**
- Real-time performance metrics collection
- Query execution plan analysis
- Automatic slow query detection and alerting
- Database health monitoring with predictive analytics
- Capacity planning based on usage trends
x??