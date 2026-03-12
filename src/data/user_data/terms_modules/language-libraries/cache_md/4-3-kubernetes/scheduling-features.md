# Scheduling and Pod Features Flashcards

#### Taints and Tolerations
Location: `pkg/scheduler/framework/plugins/tainttoleration/` and `pkg/controller/nodelifecycle/`
Taints repel pods from nodes unless pods have matching tolerations.

```go
// Taint structure in staging/src/k8s.io/api/core/v1/types.go
type Taint struct {
    Key    string
    Value  string
    Effect TaintEffect  // NoSchedule, PreferNoSchedule, NoExecute
}

type TaintEffect string
const (
    TaintEffectNoSchedule       TaintEffect = "NoSchedule"
    TaintEffectPreferNoSchedule TaintEffect = "PreferNoSchedule"
    TaintEffectNoExecute        TaintEffect = "NoExecute"
)

type Toleration struct {
    Key      string
    Operator TolerationOperator  // Equal, Exists
    Value    string
    Effect   TaintEffect
    TolerationSeconds *int64  // For NoExecute
}

// Scheduler plugin in pkg/scheduler/framework/plugins/tainttoleration/
type TaintToleration struct{}

func (pl *TaintToleration) Filter(ctx, state, pod, nodeInfo) *Status {
    node := nodeInfo.Node()

    // Get tolerations from pod
    tolerations := pod.Spec.Tolerations

    // Check each taint
    for _, taint := range node.Spec.Taints {
        // Skip if not NoSchedule or PreferNoSchedule
        if taint.Effect != NoSchedule && taint.Effect != PreferNoSchedule {
            continue
        }

        // Check if pod tolerates this taint
        if !tolerationMatches(tolerations, &taint) {
            return NewStatus(Unschedulable,
                fmt.Sprintf("node has taint %s=%s:%s", taint.Key, taint.Value, taint.Effect))
        }
    }

    return nil
}

func tolerationMatches(tolerations []Toleration, taint *Taint) bool {
    for _, toleration := range tolerations {
        if toleration.Effect != "" && toleration.Effect != taint.Effect {
            continue
        }

        if toleration.Operator == TolerationOpExists {
            // Tolerate all values for this key
            if toleration.Key == taint.Key || toleration.Key == "" {
                return true
            }
        } else {
            // Must match key and value
            if toleration.Key == taint.Key && toleration.Value == taint.Value {
                return true
            }
        }
    }
    return false
}

// NoExecute taint eviction
// In pkg/controller/nodelifecycle/scheduler/taint_manager.go
type NoExecuteTaintManager struct {
    taintEvictionQueue *TimedWorkerQueue
}

func (tc *NoExecuteTaintManager) handleNodeUpdate(node *Node) {
    pods := tc.getPodsAssignedToNode(node.Name)

    for _, pod := range pods {
        // Check NoExecute taints
        for _, taint := range node.Spec.Taints {
            if taint.Effect != NoExecute {
                continue
            }

            // Find matching toleration
            tolerationSeconds := int64(0)
            tolerates := false

            for _, toleration := range pod.Spec.Tolerations {
                if tolerationMatches(toleration, taint) {
                    tolerates = true
                    if toleration.TolerationSeconds != nil {
                        tolerationSeconds = *toleration.TolerationSeconds
                    } else {
                        tolerationSeconds = -1  // Infinite
                    }
                    break
                }
            }

            if !tolerates {
                // Pod doesn't tolerate, evict immediately
                tc.evictPod(pod)
                break
            } else if tolerationSeconds >= 0 {
                // Pod tolerates for limited time
                tc.taintEvictionQueue.AddAfter(pod, time.Duration(tolerationSeconds)*time.Second)
            }
        }
    }
}
```
:p How do taints and tolerations control pod placement and eviction?
??x
Location: Scheduler plugin in `pkg/scheduler/framework/plugins/tainttoleration/`, eviction in `pkg/controller/nodelifecycle/scheduler/taint_manager.go`

Taint effects:
- **NoSchedule**: Don't schedule new pods (filter)
- **PreferNoSchedule**: Avoid if possible (score penalty)
- **NoExecute**: Evict running pods without toleration

Toleration matching:
- Operator=Exists: Tolerate any value for key
- Operator=Equal: Must match key and value
- Empty key="": Tolerate all taints

NoExecute eviction:
- Pod without toleration: Evict immediately
- Pod with toleration: Evict after tolerationSeconds
- tolerationSeconds=nil: Never evict

Use cases:
- node.kubernetes.io/not-ready: Node not ready
- node.kubernetes.io/unreachable: Node unreachable
- Dedicated nodes: Custom taint, only certain workloads

Tolerations are OR (any match), taints are AND (all must be tolerated).
x??

---

#### Node Affinity
Location: `pkg/scheduler/framework/plugins/nodeaffinity/`
Node affinity constrains which nodes a pod can be scheduled on based on labels.

```go
// NodeAffinity structure in staging/src/k8s.io/api/core/v1/types.go
type NodeAffinity struct {
    RequiredDuringSchedulingIgnoredDuringExecution  *NodeSelector
    PreferredDuringSchedulingIgnoredDuringExecution []PreferredSchedulingTerm
}

type NodeSelector struct {
    NodeSelectorTerms []NodeSelectorTerm  // OR'ed
}

type NodeSelectorTerm struct {
    MatchExpressions []NodeSelectorRequirement  // AND'ed
    MatchFields      []NodeSelectorRequirement  // AND'ed
}

type NodeSelectorRequirement struct {
    Key      string
    Operator NodeSelectorOperator  // In, NotIn, Exists, DoesNotExist, Gt, Lt
    Values   []string
}

// Scheduler plugin in pkg/scheduler/framework/plugins/nodeaffinity/
type NodeAffinity struct{}

func (pl *NodeAffinity) Filter(ctx, state, pod, nodeInfo) *Status {
    node := nodeInfo.Node()

    // Check required affinity
    if pod.Spec.Affinity != nil &&
       pod.Spec.Affinity.NodeAffinity != nil &&
       pod.Spec.Affinity.NodeAffinity.RequiredDuringSchedulingIgnoredDuringExecution != nil {

        terms := pod.Spec.Affinity.NodeAffinity.RequiredDuringSchedulingIgnoredDuringExecution.NodeSelectorTerms

        // At least one term must match (OR)
        matched := false
        for _, term := range terms {
            if nodeMatchesTerm(node, &term) {
                matched = true
                break
            }
        }

        if !matched {
            return NewStatus(Unschedulable, "node doesn't match required affinity")
        }
    }

    return nil
}

func nodeMatchesTerm(node *Node, term *NodeSelectorTerm) bool {
    // All match expressions must match (AND)
    for _, expr := range term.MatchExpressions {
        if !matchExpression(node.Labels, &expr) {
            return false
        }
    }

    // All match fields must match (AND)
    for _, field := range term.MatchFields {
        if !matchField(node, &field) {
            return false
        }
    }

    return true
}

func matchExpression(labels map[string]string, expr *NodeSelectorRequirement) bool {
    value, exists := labels[expr.Key]

    switch expr.Operator {
    case NodeSelectorOpIn:
        return exists && contains(expr.Values, value)

    case NodeSelectorOpNotIn:
        return !exists || !contains(expr.Values, value)

    case NodeSelectorOpExists:
        return exists

    case NodeSelectorOpDoesNotExist:
        return !exists

    case NodeSelectorOpGt:
        // Compare numeric values
        nodeValue, _ := strconv.Atoi(value)
        reqValue, _ := strconv.Atoi(expr.Values[0])
        return exists && nodeValue > reqValue

    case NodeSelectorOpLt:
        nodeValue, _ := strconv.Atoi(value)
        reqValue, _ := strconv.Atoi(expr.Values[0])
        return exists && nodeValue < reqValue
    }

    return false
}

func (pl *NodeAffinity) Score(ctx, state, pod, nodeName) (int64, *Status) {
    node := state.nodeInfo.Node()

    // Score based on preferred affinity
    if pod.Spec.Affinity == nil ||
       pod.Spec.Affinity.NodeAffinity == nil {
        return 0, nil
    }

    score := int64(0)

    for _, preferred := range pod.Spec.Affinity.NodeAffinity.PreferredDuringSchedulingIgnoredDuringExecution {
        if nodeMatchesTerm(node, &preferred.Preference) {
            score += int64(preferred.Weight)  // Weight: 1-100
        }
    }

    return score, nil
}
```
:p How does node affinity constrain pod placement?
??x
Location: `pkg/scheduler/framework/plugins/nodeaffinity/`

Two types:

**Required** (hard constraint):
- Must match or pod not scheduled
- NodeSelectorTerms are OR'ed
- Within term, requirements are AND'ed
- Operators: In, NotIn, Exists, DoesNotExist, Gt, Lt

**Preferred** (soft constraint):
- Nodes matching get higher score
- Weight 1-100 per preference
- Best-effort, doesn't block scheduling

Difference from nodeSelector:
- nodeSelector: Simple equality (deprecated)
- nodeAffinity: Rich expressions with operators

MatchFields vs MatchExpressions:
- MatchFields: Match node object fields (metadata.name)
- MatchExpressions: Match node labels

Use cases:
- GPU nodes: key=gpu-type, operator=In, values=[nvidia-t4, nvidia-v100]
- Zone placement: key=topology.kubernetes.io/zone, operator=In

IgnoredDuringExecution: Affinity checked at schedule time only, not enforced on running pods.
x??

---

#### Pod Affinity and Anti-Affinity
Location: `pkg/scheduler/framework/plugins/interpodaffinity/`
Pod affinity/anti-affinity constrains placement based on other pods' labels and topology.

```go
// PodAffinity structure
type PodAffinity struct {
    RequiredDuringSchedulingIgnoredDuringExecution  []PodAffinityTerm
    PreferredDuringSchedulingIgnoredDuringExecution []WeightedPodAffinityTerm
}

type PodAntiAffinity struct {
    RequiredDuringSchedulingIgnoredDuringExecution  []PodAffinityTerm
    PreferredDuringSchedulingIgnoredDuringExecution []WeightedPodAffinityTerm
}

type PodAffinityTerm struct {
    LabelSelector *metav1.LabelSelector  // Match pods
    Namespaces    []string                // Search in these namespaces
    TopologyKey   string                  // Topology domain (e.g., kubernetes.io/hostname)
}

// Scheduler plugin in pkg/scheduler/framework/plugins/interpodaffinity/
type InterPodAffinity struct {
    podLister corelisters.PodLister
}

func (pl *InterPodAffinity) Filter(ctx, state, pod, nodeInfo) *Status {
    node := nodeInfo.Node()

    // 1. Check required pod affinity
    if pod.Spec.Affinity != nil && pod.Spec.Affinity.PodAffinity != nil {
        for _, term := range pod.Spec.Affinity.PodAffinity.RequiredDuringSchedulingIgnoredDuringExecution {
            // Get topology value for this node
            topologyValue := node.Labels[term.TopologyKey]

            // Find pods matching selector in same topology
            matchingPods := pl.findMatchingPods(term, topologyValue)

            if len(matchingPods) == 0 {
                return NewStatus(Unschedulable,
                    fmt.Sprintf("no pods matching affinity in topology %s", term.TopologyKey))
            }
        }
    }

    // 2. Check required pod anti-affinity
    if pod.Spec.Affinity != nil && pod.Spec.Affinity.PodAntiAffinity != nil {
        for _, term := range pod.Spec.Affinity.PodAntiAffinity.RequiredDuringSchedulingIgnoredDuringExecution {
            topologyValue := node.Labels[term.TopologyKey]

            // Find pods matching selector in same topology
            matchingPods := pl.findMatchingPods(term, topologyValue)

            if len(matchingPods) > 0 {
                return NewStatus(Unschedulable,
                    fmt.Sprintf("pods matching anti-affinity in topology %s", term.TopologyKey))
            }
        }
    }

    // 3. Check existing pods' anti-affinity with incoming pod
    existingPods := nodeInfo.Pods

    for _, existingPod := range existingPods {
        if existingPod.Spec.Affinity == nil ||
           existingPod.Spec.Affinity.PodAntiAffinity == nil {
            continue
        }

        for _, term := range existingPod.Spec.Affinity.PodAntiAffinity.RequiredDuringSchedulingIgnoredDuringExecution {
            // Check if incoming pod matches selector
            if podMatchesSelector(pod, term.LabelSelector) {
                return NewStatus(Unschedulable,
                    fmt.Sprintf("existing pod has anti-affinity with incoming pod"))
            }
        }
    }

    return nil
}

func (pl *InterPodAffinity) findMatchingPods(term PodAffinityTerm, topologyValue string) []*Pod {
    // Get all pods
    allPods := pl.podLister.List(labels.Everything())

    matchingPods := []*Pod{}

    for _, pod := range allPods {
        // Check namespace
        if len(term.Namespaces) > 0 && !contains(term.Namespaces, pod.Namespace) {
            continue
        }

        // Check if pod matches selector
        if !podMatchesSelector(pod, term.LabelSelector) {
            continue
        }

        // Check topology
        podNode := pl.getNode(pod.Spec.NodeName)
        if podNode.Labels[term.TopologyKey] == topologyValue {
            matchingPods = append(matchingPods, pod)
        }
    }

    return matchingPods
}

func (pl *InterPodAffinity) Score(ctx, state, pod, nodeName) (int64, *Status) {
    node := state.nodeInfo.Node()
    score := int64(0)

    // Score based on preferred affinity
    if pod.Spec.Affinity != nil && pod.Spec.Affinity.PodAffinity != nil {
        for _, preferred := range pod.Spec.Affinity.PodAffinity.PreferredDuringSchedulingIgnoredDuringExecution {
            topologyValue := node.Labels[preferred.PodAffinityTerm.TopologyKey]
            matchingPods := pl.findMatchingPods(preferred.PodAffinityTerm, topologyValue)

            if len(matchingPods) > 0 {
                score += int64(preferred.Weight)
            }
        }
    }

    // Preferred anti-affinity reduces score
    if pod.Spec.Affinity != nil && pod.Spec.Affinity.PodAntiAffinity != nil {
        for _, preferred := range pod.Spec.Affinity.PodAntiAffinity.PreferredDuringSchedulingIgnoredDuringExecution {
            topologyValue := node.Labels[preferred.PodAffinityTerm.TopologyKey]
            matchingPods := pl.findMatchingPods(preferred.PodAffinityTerm, topologyValue)

            if len(matchingPods) > 0 {
                score -= int64(preferred.Weight)
            }
        }
    }

    return score, nil
}
```
:p How does pod affinity/anti-affinity work and what is topology?
??x
Location: `pkg/scheduler/framework/plugins/interpodaffinity/`

Pod affinity: Schedule near pods matching selector
Pod anti-affinity: Schedule away from matching pods

Topology key defines "nearness":
- kubernetes.io/hostname: Same node
- topology.kubernetes.io/zone: Same availability zone
- topology.kubernetes.io/region: Same region

Required affinity:
- Must find matching pods in topology
- Blocks scheduling if not met

Anti-affinity checks:
1. Incoming pod's anti-affinity with existing pods
2. Existing pods' anti-affinity with incoming pod

Use cases:
- Affinity: Place web pods near cache pods
- Anti-affinity: Spread replicas across zones for HA

Preferred: Adds to score but doesn't block.

Symmetric: If pod A has anti-affinity to B, B cannot be on same topology as A (even if B has no anti-affinity).
x??

---

#### Pod Topology Spread Constraints
Location: `pkg/scheduler/framework/plugins/podtopologyspread/`
Spread pods across topology domains to achieve high availability.

```go
// TopologySpreadConstraint in staging/src/k8s.io/api/core/v1/types.go
type TopologySpreadConstraint struct {
    MaxSkew           int32
    TopologyKey       string
    WhenUnsatisfiable UnsatisfiableConstraintAction  // DoNotSchedule, ScheduleAnyway
    LabelSelector     *metav1.LabelSelector
}

// Scheduler plugin in pkg/scheduler/framework/plugins/podtopologyspread/
type PodTopologySpread struct{}

func (pl *PodTopologySpread) Filter(ctx, state, pod, nodeInfo) *Status {
    node := nodeInfo.Node()

    for _, constraint := range pod.Spec.TopologySpreadConstraints {
        if constraint.WhenUnsatisfiable != DoNotSchedule {
            continue  // Skip soft constraints in filter
        }

        // 1. Get topology value for this node
        topologyValue := node.Labels[constraint.TopologyKey]

        // 2. Count matching pods in each topology domain
        podCounts := pl.countPodsPerTopology(constraint)

        // 3. Calculate skew if pod placed on this node
        currentCount := podCounts[topologyValue]
        newCount := currentCount + 1

        minCount := getMinCount(podCounts)

        skew := newCount - minCount

        // 4. Check if skew exceeds maxSkew
        if skew > int(constraint.MaxSkew) {
            return NewStatus(Unschedulable,
                fmt.Sprintf("placing pod would exceed maxSkew %d", constraint.MaxSkew))
        }
    }

    return nil
}

func (pl *PodTopologySpread) countPodsPerTopology(constraint TopologySpreadConstraint) map[string]int {
    // Find all pods matching label selector
    selector := labels.SelectorFromSet(constraint.LabelSelector.MatchLabels)
    allPods := pl.podLister.List(selector)

    counts := make(map[string]int)

    // Count pods in each topology domain
    for _, pod := range allPods {
        if pod.Spec.NodeName == "" {
            continue  // Skip unscheduled pods
        }

        node := pl.getNode(pod.Spec.NodeName)
        topologyValue := node.Labels[constraint.TopologyKey]

        counts[topologyValue]++
    }

    return counts
}

func (pl *PodTopologySpread) Score(ctx, state, pod, nodeName) (int64, *Status) {
    node := state.nodeInfo.Node()
    score := int64(100)  // Start at 100

    for _, constraint := range pod.Spec.TopologySpreadConstraints {
        topologyValue := node.Labels[constraint.TopologyKey]

        podCounts := pl.countPodsPerTopology(constraint)
        currentCount := podCounts[topologyValue]

        // Prefer nodes with fewer pods in topology
        // Score inversely proportional to pod count
        penalty := currentCount * 10

        score -= int64(penalty)
    }

    if score < 0 {
        score = 0
    }

    return score, nil
}

// Example: Spread across zones
constraints:
- maxSkew: 1
  topologyKey: topology.kubernetes.io/zone
  whenUnsatisfiable: DoNotSchedule
  labelSelector:
    matchLabels:
      app: myapp

// This ensures:
// Zone A: 3 pods
// Zone B: 3 pods
// Zone C: 3 or 4 pods (maxSkew=1 allows difference of 1)
```
:p How do topology spread constraints achieve even pod distribution?
??x
Location: `pkg/scheduler/framework/plugins/podtopologyspread/`

Constraints define:
- **TopologyKey**: Domain to spread across (zone, hostname, etc.)
- **MaxSkew**: Max difference in pod counts between domains
- **LabelSelector**: Which pods count in distribution
- **WhenUnsatisfiable**: DoNotSchedule (hard) or ScheduleAnyway (soft)

Calculation:
1. Count pods matching selector in each topology domain
2. Find min count across all domains
3. Calculate skew: (pods in this domain + 1) - min
4. Reject if skew > maxSkew

Example with maxSkew=1:
- Zone A: 3 pods
- Zone B: 2 pods (min)
- Zone C: 3 pods
- New pod can go to B (skew=1) or stay at A/C (skew=2, rejected)

Difference from pod anti-affinity:
- Anti-affinity: Binary (allow/deny based on presence)
- Topology spread: Quantitative (balance pod counts)

Multiple constraints: All must be satisfied.
x??

---

#### Priority and Preemption
Location: `pkg/scheduler/core/` for preemption logic
Pod priority determines scheduling order and enables preemption of lower-priority pods.

```go
// PriorityClass in staging/src/k8s.io/api/scheduling/v1/types.go
type PriorityClass struct {
    metav1.TypeMeta
    metav1.ObjectMeta

    Value            int32   // Priority value (higher = more important)
    GlobalDefault    bool    // Use as default if pod doesn't specify
    PreemptionPolicy *PreemptionPolicy  // PreemptLowerPriority or Never
    Description      string
}

// Pod priority in pod spec
type PodSpec struct {
    Priority          *int32
    PriorityClassName string
}

// Preemption in pkg/scheduler/core/generic_scheduler.go
func (g *genericScheduler) Preempt(ctx, pod *Pod, scheduleErr error) (*Node, []*Pod, error) {
    // 1. Get all nodes
    allNodes := g.cache.NodeTree().List()

    // 2. For each node, find victims that could be preempted
    nodeToVictims := make(map[*Node][]*Pod)

    for _, node := range allNodes {
        // Try to find pods to evict that would make pod fit
        victims, fits := g.selectVictimsOnNode(pod, node)

        if fits {
            nodeToVictims[node] = victims
        }
    }

    if len(nodeToVictims) == 0 {
        return nil, nil, errors.New("no nodes available for preemption")
    }

    // 3. Select best node (minimize disruption)
    bestNode, victims := g.pickBestNodeForPreemption(pod, nodeToVictims)

    // 4. Evict victims
    for _, victim := range victims {
        g.evictPod(victim)
    }

    return bestNode, victims, nil
}

func (g *genericScheduler) selectVictimsOnNode(pod *Pod, node *Node) ([]*Pod, bool) {
    podsOnNode := g.cache.GetPodsForNode(node.Name)

    // Sort pods by priority (lowest first)
    sort.Sort(byPriority(podsOnNode))

    victims := []*Pod{}
    resourcesFreed := ResourceList{}

    for _, candidate := range podsOnNode {
        // Can only preempt lower priority
        if candidate.Spec.Priority >= pod.Spec.Priority {
            continue
        }

        // Check preemption policy
        if candidate.Spec.PreemptionPolicy != nil &&
           *candidate.Spec.PreemptionPolicy == PreemptionPolicyNever {
            continue
        }

        // Add to victims
        victims = append(victims, candidate)

        // Track freed resources
        addResources(resourcesFreed, getPodResources(candidate))

        // Check if pod would fit now
        if podFitsWithResources(pod, node, resourcesFreed) {
            return victims, true
        }
    }

    return nil, false
}

func (g *genericScheduler) pickBestNodeForPreemption(pod *Pod, nodeToVictims map[*Node][]*Pod) (*Node, []*Pod) {
    var bestNode *Node
    var bestVictims []*Pod
    bestScore := -1

    for node, victims := range nodeToVictims {
        // Score based on:
        // 1. Prefer nodes with fewer victims
        // 2. Prefer victims with lower priority
        // 3. Prefer victims with higher PodDisruptionBudget margin

        score := calculatePreemptionScore(victims)

        if score > bestScore {
            bestScore = score
            bestNode = node
            bestVictims = victims
        }
    }

    return bestNode, bestVictims
}

// Priority queue in pkg/scheduler/internal/queue/
type PriorityQueue struct {
    activeQ    *heap.Heap  // Sorted by priority
    backoffQ   *heap.Heap
    unschedulableQ *UnschedulablePodsMap
}

func (p *PriorityQueue) Pop() (*PodInfo, error) {
    // Return highest priority pod
    return p.activeQ.Pop().(*PodInfo), nil
}
```
:p How does pod priority enable preemption?
??x
Location: Preemption in `pkg/scheduler/core/generic_scheduler.go`, queue in `pkg/scheduler/internal/queue/`

Priority:
- Set via PriorityClass resource
- Pod spec.priority set from PriorityClass.value
- Higher value = more important
- Range: -1000000000 to 1000000000 (system-critical: 2000000000)

Scheduling queue:
- Pods sorted by priority (high to low)
- Higher priority pods scheduled first

Preemption triggered when:
- High-priority pod doesn't fit
- Lower-priority pods exist that could be evicted

Preemption process:
1. Find nodes where evicting lower-priority pods would make room
2. Select victims (lowest priority first)
3. Pick node minimizing disruption
4. Evict victims (delete with grace period)
5. Schedule preemptor

PreemptionPolicy=Never: Pod cannot be preempted even by higher priority.

PodDisruptionBudgets are respected during preemption selection.
x??

---

#### Garbage Collection
Location: `pkg/controller/garbagecollector/`
GC deletes objects whose owners have been deleted.

```go
// GC controller in pkg/controller/garbagecollector/garbagecollector.go
type GarbageCollector struct {
    restMapper meta.RESTMapper

    // Graph of objects and their owner references
    dependencyGraphBuilder *GraphBuilder
    attemptToDelete        workqueue.RateLimitingInterface
}

func (gc *GarbageCollector) Run(workers int) {
    // 1. Build dependency graph
    go gc.dependencyGraphBuilder.Run(stopCh)

    // 2. Start workers to process deletions
    for i := 0; i < workers; i++ {
        go gc.runAttemptToDeleteWorker()
    }
}

// Graph node
type node struct {
    identity objectReference
    owners   []metav1.OwnerReference
    dependents []*node

    deletingDependents bool
    beingDeleted       bool
}

func (gc *GarbageCollector) processItem(item interface{}) error {
    n := item.(*node)

    // Check if all owners exist
    ownersExist := gc.checkOwners(n)

    if ownersExist {
        // Owners exist, don't delete
        return nil
    }

    // No owners - delete this object
    return gc.deleteObject(n)
}

func (gc *GarbageCollector) deleteObject(n *node) error {
    // Get object
    obj := gc.getObject(n.identity)

    // Check deletion policy
    policy := getForegroundDeletion()  // or background, orphan

    // Foreground deletion
    if policy == metav1.DeletePropagationForeground {
        // 1. Set deletionTimestamp
        // 2. Add foregroundDeletion finalizer
        // 3. Delete dependents first
        // 4. Remove finalizer
        // 5. Object deleted

        if !n.deletingDependents {
            // Start deleting dependents
            n.deletingDependents = true

            // Add finalizer
            obj.Finalizers = append(obj.Finalizers, metav1.FinalizerDeleteDependents)
            gc.updateObject(obj)

            // Queue dependents for deletion
            for _, dependent := range n.dependents {
                gc.attemptToDelete.Add(dependent)
            }
        }

        // Check if all dependents deleted
        if len(n.dependents) == 0 {
            // Remove finalizer
            obj.Finalizers = removeString(obj.Finalizers, metav1.FinalizerDeleteDependents)
            gc.updateObject(obj)

            // Object will be deleted by API server
        }

        return nil
    }

    // Background deletion
    if policy == metav1.DeletePropagationBackground {
        // Delete owner immediately
        // Dependents deleted asynchronously
        gc.client.Delete(obj)

        return nil
    }

    // Orphan deletion
    if policy == metav1.DeletePropagationOrphan {
        // Remove owner references from dependents
        for _, dependent := range n.dependents {
            dependentObj := gc.getObject(dependent.identity)

            // Remove this object from ownerReferences
            newOwnerRefs := []metav1.OwnerReference{}
            for _, ref := range dependentObj.OwnerReferences {
                if ref.UID != obj.UID {
                    newOwnerRefs = append(newOwnerRefs, ref)
                }
            }
            dependentObj.OwnerReferences = newOwnerRefs

            gc.updateObject(dependentObj)
        }

        // Delete owner
        gc.client.Delete(obj)

        return nil
    }

    return nil
}

// Graph builder watches all resource types
func (gb *GraphBuilder) Run(stopCh <-chan struct{}) {
    // Discover all API resources
    resources := gb.discoveryClient.ServerPreferredResources()

    // For each resource, start informer
    for _, resource := range resources {
        informer := gb.startInformer(resource)

        // Watch for Add/Update/Delete
        informer.AddEventHandler(cache.ResourceEventHandlerFuncs{
            AddFunc:    gb.addEvent,
            UpdateFunc: gb.updateEvent,
            DeleteFunc: gb.deleteEvent,
        })
    }
}

func (gb *GraphBuilder) addEvent(obj interface{}) {
    // Add node to graph
    n := gb.createNode(obj)
    gb.graph.addNode(n)

    // Link to owners
    for _, ownerRef := range n.owners {
        owner := gb.graph.getNode(ownerRef)
        owner.dependents = append(owner.dependents, n)
    }
}
```
:p How does garbage collection automatically delete orphaned resources?
??x
Location: `pkg/controller/garbagecollector/garbagecollector.go`

GC maintains dependency graph:
- Nodes: All cluster objects
- Edges: OwnerReferences

Process:
1. Watch all resource types
2. Build graph of objects and owners
3. When object deleted, find orphaned dependents
4. Delete dependents based on propagation policy

Deletion policies:

**Foreground**:
1. Set deletionTimestamp on owner
2. Add finalizer to owner
3. Delete all dependents
4. Remove finalizer from owner
5. Owner deleted

**Background**:
1. Delete owner immediately
2. GC deletes dependents async

**Orphan**:
1. Remove ownerReferences from dependents
2. Delete owner
3. Dependents survive

BlockOwnerDeletion=true: Prevents owner deletion in Foreground mode until dependent removed.

GC discovers all API types dynamically, works with CRDs automatically.
x??

---

#### EndpointSlice Controller
Location: `pkg/controller/endpointslice/`
EndpointSlices scale better than Endpoints by splitting large endpoint lists into multiple objects.

```go
// EndpointSlice in staging/src/k8s.io/api/discovery/v1/types.go
type EndpointSlice struct {
    metav1.TypeMeta
    metav1.ObjectMeta

    AddressType AddressType  // IPv4, IPv6, FQDN
    Endpoints   []Endpoint
    Ports       []EndpointPort
}

type Endpoint struct {
    Addresses  []string
    Conditions EndpointConditions
    Hostname   *string
    TargetRef  *v1.ObjectReference
    NodeName   *string
    Zone       *string
}

type EndpointConditions struct {
    Ready       *bool
    Serving     *bool  // Ready or terminating
    Terminating *bool
}

// Controller in pkg/controller/endpointslice/endpointslice_controller.go
type Controller struct {
    serviceLister  corelisters.ServiceLister
    podLister      corelisters.PodLister
    nodeLister     corelisters.NodeLister
    esLister       discoverylisters.EndpointSliceLister

    maxEndpointsPerSlice int32  // Default: 100
}

func (c *Controller) syncService(key string) error {
    svc := c.serviceLister.Services(namespace).Get(name)

    if svc.Spec.Selector == nil {
        // Headless service without selector, skip
        return nil
    }

    // 1. Find pods matching service selector
    pods := c.podLister.Pods(svc.Namespace).List(labels.SelectorFromSet(svc.Spec.Selector))

    // 2. Build desired endpoints
    desiredEndpoints := []Endpoint{}

    for _, pod := range pods {
        if pod.DeletionTimestamp != nil {
            // Pod terminating
            desiredEndpoints = append(desiredEndpoints, Endpoint{
                Addresses: []string{pod.Status.PodIP},
                Conditions: EndpointConditions{
                    Ready:       pointer.Bool(false),
                    Serving:     pointer.Bool(true),  // Still serving during termination
                    Terminating: pointer.Bool(true),
                },
                TargetRef: &v1.ObjectReference{
                    Kind: "Pod",
                    Name: pod.Name,
                    UID:  pod.UID,
                },
                NodeName: &pod.Spec.NodeName,
            })
        } else if isPodReady(pod) {
            // Pod ready
            desiredEndpoints = append(desiredEndpoints, Endpoint{
                Addresses: []string{pod.Status.PodIP},
                Conditions: EndpointConditions{
                    Ready:       pointer.Bool(true),
                    Serving:     pointer.Bool(true),
                    Terminating: pointer.Bool(false),
                },
                TargetRef: &v1.ObjectReference{
                    Kind: "Pod",
                    Name: pod.Name,
                    UID:  pod.UID,
                },
                NodeName: &pod.Spec.NodeName,
            })
        }
    }

    // 3. Get existing EndpointSlices for this service
    existingSlices := c.esLister.EndpointSlices(svc.Namespace).List(labels.SelectorFromSet(map[string]string{
        discovery.LabelServiceName: svc.Name,
    }))

    // 4. Reconcile: Pack endpoints into slices
    desiredSlices := c.packEndpoints(desiredEndpoints, c.maxEndpointsPerSlice)

    // 5. Create/Update/Delete slices
    c.reconcileEndpointSlices(svc, existingSlices, desiredSlices)

    return nil
}

func (c *Controller) packEndpoints(endpoints []Endpoint, maxPerSlice int32) []EndpointSlice {
    slices := []EndpointSlice{}

    for i := 0; i < len(endpoints); i += int(maxPerSlice) {
        end := i + int(maxPerSlice)
        if end > len(endpoints) {
            end = len(endpoints)
        }

        slice := EndpointSlice{
            ObjectMeta: metav1.ObjectMeta{
                GenerateName: svc.Name + "-",
                Labels: map[string]string{
                    discovery.LabelServiceName: svc.Name,
                },
            },
            AddressType: discovery.AddressTypeIPv4,
            Endpoints:   endpoints[i:end],
            Ports:       buildPorts(svc),
        }

        slices = append(slices, slice)
    }

    return slices
}

// kube-proxy watches EndpointSlices instead of Endpoints
// Scales better: Service with 5000 endpoints = 50 EndpointSlices (vs 1 huge Endpoints object)
```
:p How do EndpointSlices improve scalability over Endpoints?
??x
Location: `pkg/controller/endpointslice/endpointslice_controller.go`

Problems with Endpoints:
- One object per Service
- Object size grows with pod count
- Large update on every endpoint change
- etcd size limits (~1.5MB)

EndpointSlice solution:
- Multiple objects per Service (max 100 endpoints each)
- Smaller updates (only affected slice changes)
- Better watch distribution

Example:
- Service with 5000 pods
- Endpoints: 1 object, ~5MB (may hit limit)
- EndpointSlices: 50 objects, ~100KB each

Features:
- **ready**: Pod is ready
- **serving**: Pod serving traffic (ready or terminating gracefully)
- **terminating**: Pod is terminating

Topology:
- NodeName, Zone tracked per endpoint
- Enables topology-aware routing

kube-proxy watches EndpointSlices (dual-stack IPv4/IPv6 support).

Controller reconciles on pod/service changes, packs endpoints into slices.
x??

---
