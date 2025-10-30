# Workload Controller Implementations Flashcards

#### ReplicaSet Controller
Location: `pkg/controller/replicaset/`
ReplicaSet ensures specified number of pod replicas are running at any time.

```go
// ReplicaSet controller in pkg/controller/replicaset/replica_set.go
type ReplicaSetController struct {
    rsLister  appslisters.ReplicaSetLister
    podLister corelisters.PodLister

    expectations controller.ControllerExpectationsInterface
    queue        workqueue.RateLimitingInterface
}

func (rsc *ReplicaSetController) syncReplicaSet(key string) error {
    namespace, name := splitKey(key)
    rs := rsc.rsLister.ReplicaSets(namespace).Get(name)

    // 1. Get all pods matching selector
    allPods := rsc.podLister.Pods(rs.Namespace).List(labels.Everything())
    filteredPods := rsc.claimPods(rs, allPods)

    // 2. Count active pods (not terminating)
    activePods := filterActivePods(filteredPods)
    activePodsCount := len(activePods)

    // 3. Calculate diff
    diff := activePodsCount - int(*rs.Spec.Replicas)

    if diff < 0 {
        // Need to create pods
        diff *= -1

        // Check expectations to avoid hot loop
        if rsc.expectations.SatisfiedExpectations(key) {
            // Create pods in batches
            batchSize := integer.IntMin(diff, getBurstReplicas())

            for i := 0; i < batchSize; i++ {
                // Use pod template from RS
                pod := newPodFromTemplate(&rs.Spec.Template, rs)

                // Set owner reference
                pod.OwnerReferences = []metav1.OwnerReference{
                    *metav1.NewControllerRef(rs, schema.GroupVersionKind{
                        Group:   apps.GroupName,
                        Version: "v1",
                        Kind:    "ReplicaSet",
                    }),
                }

                rsc.podControl.CreatePods(rs.Namespace, pod, rs)
            }

            // Set expectation
            rsc.expectations.ExpectCreations(key, diff)
        }

    } else if diff > 0 {
        // Too many pods, need to delete

        // Sort pods for deletion (prefer unscheduled, not ready, etc.)
        podsToDelete := getPodsToDelete(filteredPods, diff)

        for _, pod := range podsToDelete {
            rsc.podControl.DeletePod(rs.Namespace, pod.Name, rs)
        }

        // Set expectation
        rsc.expectations.ExpectDeletions(key, len(podsToDelete))
    }

    // 4. Update status
    rs.Status.Replicas = int32(len(filteredPods))
    rs.Status.ReadyReplicas = int32(countReadyPods(filteredPods))
    rs.Status.AvailableReplicas = int32(countAvailablePods(filteredPods))

    rsc.updateReplicaSetStatus(rs)

    return nil
}

// Expectations prevent hot loops
// If we just created 10 pods, don't try to create more until we see them
type ControllerExpectationsInterface interface {
    ExpectCreations(key string, adds int)
    ExpectDeletions(key string, dels int)
    SatisfiedExpectations(key string) bool
}

// Pod selection priority for deletion
func getPodsToDelete(pods []*v1.Pod, diff int) []*v1.Pod {
    // Priority (highest to lowest):
    // 1. Pending/Unscheduled pods
    // 2. Pods on unready nodes
    // 3. Pods not ready
    // 4. Pods with lower resource requests
    // 5. Pods with higher restart count
    // 6. Newer pods (by creation timestamp)

    sort.Sort(ActivePods(pods))
    return pods[:diff]
}
```
:p How does ReplicaSet controller maintain desired replica count?
??x
Location: `pkg/controller/replicaset/replica_set.go`

Reconciliation:
1. List pods matching label selector
2. Count active pods (not terminating)
3. Compare with spec.replicas
4. If too few: Create pods from template
5. If too many: Delete excess pods

Pod creation:
- Uses spec.template
- Sets ownerReference to ReplicaSet
- Creates in batches to avoid overwhelming API server

Pod deletion priority:
1. Unscheduled/pending
2. On unready nodes
3. Not ready
4. Lower resource requests
5. Higher restart counts
6. Newer (preserve older pods)

Expectations: Track pending creates/deletes to avoid hot loops. Don't create more until existing creates are observed.

Status tracks: replicas, readyReplicas, availableReplicas.
x??

---

#### Deployment Controller
Location: `pkg/controller/deployment/`
Deployment manages rollout and rollback of ReplicaSets using different strategies.

```go
// Deployment controller in pkg/controller/deployment/deployment_controller.go
type DeploymentController struct {
    rsLister  appslisters.ReplicaSetLister
    podLister corelisters.PodLister
    dLister   appslisters.DeploymentLister
}

func (dc *DeploymentController) syncDeployment(key string) error {
    d := dc.dLister.Deployments(namespace).Get(name)

    // 1. Get all ReplicaSets for this Deployment
    rsList := dc.getReplicaSetsForDeployment(d)

    // 2. Find new and old ReplicaSets
    newRS, oldRSs := dc.getAllReplicaSetsAndSyncRevision(d, rsList)

    if d.Spec.Paused {
        // Paused - don't do anything
        return dc.sync(d, rsList)
    }

    // 3. Check if scaling needed
    scalingEvent := dc.isScalingEvent(d, rsList)
    if scalingEvent {
        return dc.sync(d, rsList)
    }

    // 4. Handle rollout based on strategy
    switch d.Spec.Strategy.Type {
    case apps.RecreateDeploymentStrategyType:
        return dc.rolloutRecreate(d, newRS, oldRSs)

    case apps.RollingUpdateDeploymentStrategyType:
        return dc.rolloutRolling(d, newRS, oldRSs)
    }

    return nil
}

// Rolling update strategy
func (dc *DeploymentController) rolloutRolling(d *Deployment, newRS *ReplicaSet, oldRSs []*ReplicaSet) error {
    // Get parameters
    maxUnavailable := getMaxUnavailable(d)
    maxSurge := getMaxSurge(d)

    // 1. Scale up new ReplicaSet
    newRSReplicasCount := newRS.Spec.Replicas
    desiredReplicas := d.Spec.Replicas

    // Calculate how many new pods we can create
    allRSs := append(oldRSs, newRS)
    allPodsCount := getTotalReplicasCount(allRSs)

    // maxSurge allows temporary excess
    maxTotalPods := desiredReplicas + maxSurge

    if allPodsCount < maxTotalPods {
        // Can scale up new RS
        scaleUpCount := min(maxTotalPods-allPodsCount, desiredReplicas-newRSReplicasCount)

        newReplicasCount := newRSReplicasCount + scaleUpCount
        dc.scaleReplicaSet(newRS, newReplicasCount, d)
    }

    // 2. Scale down old ReplicaSets
    // Calculate how many old pods we need to remove
    oldPodsCount := allPodsCount - newRSReplicasCount

    // maxUnavailable limits how many can be down
    minAvailable := desiredReplicas - maxUnavailable
    newRSAvailableCount := getAvailableReplicaCountForReplicaSet(newRS)

    maxScaledDown := max(0, allPodsCount-minAvailable-newRSAvailableCount)

    // Scale down old RSs proportionally
    cleanupCount := min(maxScaledDown, oldPodsCount)

    for _, oldRS := range oldRSs {
        if cleanupCount <= 0 {
            break
        }

        scaleDownCount := min(oldRS.Spec.Replicas, cleanupCount)
        newReplicasCount := oldRS.Spec.Replicas - scaleDownCount

        dc.scaleReplicaSet(oldRS, newReplicasCount, d)
        cleanupCount -= scaleDownCount
    }

    return nil
}

// Recreate strategy
func (dc *DeploymentController) rolloutRecreate(d *Deployment, newRS *ReplicaSet, oldRSs []*ReplicaSet) error {
    // 1. Scale down all old ReplicaSets to 0
    for _, oldRS := range oldRSs {
        if oldRS.Spec.Replicas > 0 {
            dc.scaleReplicaSet(oldRS, 0, d)
            return nil  // Wait for scale down to complete
        }
    }

    // 2. All old RSs scaled to 0, scale up new RS
    dc.scaleReplicaSet(newRS, d.Spec.Replicas, d)

    return nil
}

// Rollback implementation
func (dc *DeploymentController) rollback(d *Deployment, toRevision int64) error {
    // 1. Find ReplicaSet with target revision
    allRSs := dc.getReplicaSetsForDeployment(d)

    var targetRS *ReplicaSet
    for _, rs := range allRSs {
        revision := getRevision(rs)
        if revision == toRevision {
            targetRS = rs
            break
        }
    }

    // 2. Update Deployment template to match target RS
    d.Spec.Template = targetRS.Spec.Template

    // 3. Update will trigger new rollout
    dc.client.AppsV1().Deployments(d.Namespace).Update(ctx, d)

    return nil
}
```
:p How does Deployment controller implement rolling updates?
??x
Location: `pkg/controller/deployment/deployment_controller.go`

Deployment manages ReplicaSets:
- Each template change creates new ReplicaSet
- Old ReplicaSets scaled down, new scaled up

Rolling update:
1. Create new ReplicaSet (if template changed)
2. Scale up new RS (limited by maxSurge)
3. Scale down old RSs (limited by maxUnavailable)
4. Repeat until new RS at desired count

Parameters:
- **maxSurge**: Max extra pods during rollout (e.g., 25%)
- **maxUnavailable**: Max unavailable pods (e.g., 25%)

Recreate strategy:
1. Scale all old RSs to 0
2. Wait for all old pods to terminate
3. Scale new RS to desired count

Rollback:
- Find old ReplicaSet by revision
- Update Deployment template to match
- Triggers new rollout

Revisions stored in ReplicaSet annotations.
x??

---

#### StatefulSet Controller
Location: `pkg/controller/statefulset/`
StatefulSet provides stable identity and ordered deployment/scaling for pods.

```go
// StatefulSet controller in pkg/controller/statefulset/stateful_set.go
type StatefulSetController struct {
    setLister appslisters.StatefulSetLister
    podLister corelisters.PodLister
    pvcLister corelisters.PersistentVolumeClaimLister

    control StatefulSetControlInterface
}

func (ssc *StatefulSetController) syncStatefulSet(key string) error {
    set := ssc.setLister.StatefulSets(namespace).Get(name)

    // Get pods for this StatefulSet
    pods := ssc.getPodsForStatefulSet(set)

    return ssc.control.UpdateStatefulSet(set, pods)
}

// StatefulSet control in pkg/controller/statefulset/stateful_set_control.go
type defaultStatefulSetControl struct {
    podControl controller.PodControlInterface
}

func (ssc *defaultStatefulSetControl) UpdateStatefulSet(set *StatefulSet, pods []*Pod) error {
    // 1. Get current and update revisions
    currentRevision, updateRevision := ssc.getStatefulSetRevisions(set)

    // 2. Split pods into current and update partitions
    currentPods := []*Pod{}
    updatePods := []*Pod{}

    for _, pod := range pods {
        if getPodRevision(pod) == currentRevision.Name {
            currentPods = append(currentPods, pod)
        } else {
            updatePods = append(updatePods, pod)
        }
    }

    // 3. Handle partitioned rolling update
    // UpdateStrategy.RollingUpdate.Partition specifies ordinal
    // Pods >= partition are updated, pods < partition are not

    partition := int(*set.Spec.UpdateStrategy.RollingUpdate.Partition)
    replicas := int(*set.Spec.Replicas)

    // 4. Process pods in reverse ordinal order (for updates and scale down)
    for ord := replicas - 1; ord >= partition; ord-- {
        pod := pods[ord]

        if pod == nil {
            // Create pod with update revision
            ssc.createPodAtOrdinal(set, ord, updateRevision)
            return nil  // Wait for pod to be created
        }

        if !isPodRunningAndReady(pod) {
            // Wait for pod to be ready before proceeding
            return nil
        }

        if getPodRevision(pod) != updateRevision.Name {
            // Delete pod to trigger update
            ssc.podControl.DeletePod(set.Namespace, pod.Name)
            return nil  // Wait for pod to be recreated
        }
    }

    // 5. Process pods in forward ordinal order (for scale up)
    for ord := 0; ord < replicas; ord++ {
        pod := pods[ord]

        if pod == nil {
            // Create pod
            if ord < partition {
                // Use current revision
                ssc.createPodAtOrdinal(set, ord, currentRevision)
            } else {
                // Use update revision
                ssc.createPodAtOrdinal(set, ord, updateRevision)
            }
            return nil  // Wait for pod to be created
        }

        if !isPodRunningAndReady(pod) && ord < replicas-1 {
            // Wait for pod to be ready before creating next
            return nil
        }
    }

    // 6. Scale down (delete pods in reverse order)
    for ord := len(pods) - 1; ord >= replicas; ord-- {
        pod := pods[ord]
        if pod != nil {
            ssc.podControl.DeletePod(set.Namespace, pod.Name)
            return nil  // Wait for deletion
        }
    }

    return nil
}

func (ssc *defaultStatefulSetControl) createPodAtOrdinal(set *StatefulSet, ordinal int, revision *ControllerRevision) error {
    // 1. Create PVCs for this pod
    for _, claim := range set.Spec.VolumeClaimTemplates {
        pvc := &PersistentVolumeClaim{
            ObjectMeta: metav1.ObjectMeta{
                Name: fmt.Sprintf("%s-%s-%d", claim.Name, set.Name, ordinal),
                Namespace: set.Namespace,
                OwnerReferences: []metav1.OwnerReference{
                    *metav1.NewControllerRef(set, apps.SchemeGroupVersion.WithKind("StatefulSet")),
                },
            },
            Spec: claim.Spec,
        }

        ssc.pvcControl.CreatePersistentVolumeClaim(pvc)
    }

    // 2. Create pod with ordinal name
    pod := &Pod{
        ObjectMeta: metav1.ObjectMeta{
            Name:      fmt.Sprintf("%s-%d", set.Name, ordinal),
            Namespace: set.Namespace,
            Labels:    set.Spec.Template.Labels,
            Annotations: map[string]string{
                "controller-revision-hash": revision.Name,
            },
        },
        Spec: set.Spec.Template.Spec,
    }

    // 3. Set hostname
    pod.Spec.Hostname = pod.Name
    pod.Spec.Subdomain = set.Spec.ServiceName

    // 4. Mount PVCs
    for i, claim := range set.Spec.VolumeClaimTemplates {
        pod.Spec.Volumes = append(pod.Spec.Volumes, Volume{
            Name: claim.Name,
            VolumeSource: VolumeSource{
                PersistentVolumeClaim: &PVCVolumeSource{
                    ClaimName: fmt.Sprintf("%s-%s-%d", claim.Name, set.Name, ordinal),
                },
            },
        })
    }

    return ssc.podControl.CreatePod(set.Namespace, pod)
}
```
:p How does StatefulSet provide ordered and stable pod identity?
??x
Location: `pkg/controller/statefulset/stateful_set_control.go`

Ordered operations:
- **Scale up**: 0 → 1 → 2 (sequential, wait for ready)
- **Scale down**: N → N-1 → N-2 (reverse, sequential)
- **Update**: N → N-1 → N-2 (reverse to partition)

Stable identity:
- Name: {statefulset}-{ordinal} (e.g., mysql-0, mysql-1)
- Hostname: Same as name
- DNS: {pod}.{service}.{namespace}.svc.cluster.local
- PVC: {volume}-{statefulset}-{ordinal}

Partitioned updates:
- Partition=3: Update pods 3,4,5... keep 0,1,2 on old version
- Enables canary deployments

OrderedReady (default) vs Parallel:
- OrderedReady: Wait for each pod before next
- Parallel: Create all pods simultaneously

PVCs have same ownerReference, survive pod deletion (persistent).
x??

---

#### DaemonSet Controller
Location: `pkg/controller/daemon/`
DaemonSet ensures a pod runs on every (matching) node.

```go
// DaemonSet controller in pkg/controller/daemon/daemon_controller.go
type DaemonSetsController struct {
    dsLister   appslisters.DaemonSetLister
    podLister  corelisters.PodLister
    nodeLister corelisters.NodeLister
}

func (dsc *DaemonSetsController) syncDaemonSet(key string) error {
    ds := dsc.dsLister.DaemonSets(namespace).Get(name)

    // 1. Get all nodes
    nodeList := dsc.nodeLister.List(labels.Everything())

    // 2. Classify nodes
    nodesNeedingDaemonPods := []string{}
    podsToDelete := []string{}

    for _, node := range nodeList {
        shouldRun, shouldContinueRunning := dsc.nodeShouldRunDaemonPod(node, ds)

        // Get pod on this node (if any)
        pod := dsc.getDaemonPodOnNode(ds, node.Name)

        if shouldRun && pod == nil {
            // Node needs pod but doesn't have one
            nodesNeedingDaemonPods = append(nodesNeedingDaemonPods, node.Name)
        } else if !shouldContinueRunning && pod != nil {
            // Node has pod but shouldn't
            podsToDelete = append(podsToDelete, pod.Name)
        }
    }

    // 3. Create pods on nodes that need them
    for _, nodeName := range nodesNeedingDaemonPods {
        pod := dsc.createPodForNode(ds, nodeName)

        // Set node affinity to pin to this node
        pod.Spec.Affinity = &Affinity{
            NodeAffinity: &NodeAffinity{
                RequiredDuringSchedulingIgnoredDuringExecution: &NodeSelector{
                    NodeSelectorTerms: []NodeSelectorTerm{{
                        MatchFields: []NodeSelectorRequirement{{
                            Key:      "metadata.name",
                            Operator: "In",
                            Values:   []string{nodeName},
                        }},
                    }},
                },
            },
        }

        dsc.podControl.CreatePod(ds.Namespace, pod)
    }

    // 4. Delete pods from wrong nodes
    for _, podName := range podsToDelete {
        dsc.podControl.DeletePod(ds.Namespace, podName)
    }

    // 5. Handle rolling update
    return dsc.rollingUpdate(ds)
}

func (dsc *DaemonSetsController) nodeShouldRunDaemonPod(node *Node, ds *DaemonSet) (bool, bool) {
    // Check if node is schedulable
    if node.Spec.Unschedulable && !ds.Spec.Template.Spec.HostNetwork {
        return false, false
    }

    // Check node selector
    if !nodeMatchesSelector(node, ds.Spec.Template.Spec.NodeSelector) {
        return false, false
    }

    // Check node affinity
    if !nodeMatchesAffinity(node, ds.Spec.Template.Spec.Affinity) {
        return false, false
    }

    // Check taints and tolerations
    for _, taint := range node.Spec.Taints {
        if taint.Effect == NoSchedule || taint.Effect == NoExecute {
            if !podToleratesTaint(ds.Spec.Template.Spec.Tolerations, taint) {
                return false, false
            }
        }
    }

    return true, true
}

// Rolling update for DaemonSet
func (dsc *DaemonSetsController) rollingUpdate(ds *DaemonSet) error {
    // Get update strategy
    strategy := ds.Spec.UpdateStrategy

    if strategy.Type != apps.RollingUpdateDaemonSetStrategyType {
        return nil
    }

    // MaxUnavailable determines how many pods can be down during update
    maxUnavailable := getMaxUnavailable(strategy.RollingUpdate)

    // Get all daemon pods
    allPods := dsc.getDaemonPods(ds)

    // Count how many are unavailable
    unavailableCount := 0
    for _, pod := range allPods {
        if !isPodAvailable(pod) {
            unavailableCount++
        }
    }

    // Find pods that need update
    oldPods := []*Pod{}
    for _, pod := range allPods {
        if getPodGeneration(pod) != ds.Generation {
            oldPods = append(oldPods, pod)
        }
    }

    // Delete old pods up to maxUnavailable limit
    for _, pod := range oldPods {
        if unavailableCount >= maxUnavailable {
            break
        }

        dsc.podControl.DeletePod(ds.Namespace, pod.Name)
        unavailableCount++
    }

    return nil
}
```
:p How does DaemonSet ensure pods run on every node?
??x
Location: `pkg/controller/daemon/daemon_controller.go`

Process:
1. List all nodes
2. For each node, check if it should run daemon pod:
   - Node selector matches
   - Affinity matches
   - Pod tolerates node taints
3. Create pods on nodes that need them
4. Delete pods from nodes that shouldn't have them

Pod placement:
- Uses node affinity (not scheduler)
- Sets spec.affinity.nodeAffinity to target specific node
- Bypasses normal scheduling

Rolling update:
- OnDelete: Only update when pod deleted manually
- RollingUpdate: Delete old pods, new ones created automatically
- MaxUnavailable controls rollout speed

Use cases:
- Log collectors (fluentd)
- Monitoring (node-exporter)
- Network plugins (kube-proxy, CNI)
- Storage daemons (ceph, gluster)

Master toleration often needed to run on control plane nodes.
x??

---

#### Job Controller
Location: `pkg/controller/job/`
Job runs pods to completion with retry logic and parallelism control.

```go
// Job controller in pkg/controller/job/job_controller.go
type Controller struct {
    jobLister corelisters.JobLister
    podLister corelisters.PodLister
}

func (jm *Controller) syncJob(key string) error {
    job := jm.jobLister.Jobs(namespace).Get(name)

    // 1. Get pods for this job
    pods := jm.getPodsForJob(job)

    // 2. Count pod states
    active := 0
    succeeded := 0
    failed := 0

    for _, pod := range pods {
        switch pod.Status.Phase {
        case v1.PodRunning, v1.PodPending:
            active++
        case v1.PodSucceeded:
            succeeded++
        case v1.PodFailed:
            failed++
        }
    }

    // 3. Check if job is finished
    var jobFinished bool
    var finishedCondition *JobCondition

    // Success condition
    if job.Spec.Completions == nil {
        // No completions specified - complete when any pod succeeds
        if succeeded > 0 {
            jobFinished = true
            finishedCondition = &JobCondition{
                Type:   JobComplete,
                Status: ConditionTrue,
            }
        }
    } else {
        // Complete when succeeded >= completions
        if succeeded >= int(*job.Spec.Completions) {
            jobFinished = true
            finishedCondition = &JobCondition{
                Type:   JobComplete,
                Status: ConditionTrue,
            }
        }
    }

    // Failure condition
    if job.Spec.BackoffLimit != nil {
        if failed > int(*job.Spec.BackoffLimit) {
            jobFinished = true
            finishedCondition = &JobCondition{
                Type:   JobFailed,
                Status: ConditionTrue,
                Reason: "BackoffLimitExceeded",
            }
        }
    }

    if jobFinished {
        // 4. Job is finished, update condition and return
        job.Status.Conditions = append(job.Status.Conditions, *finishedCondition)
        jm.updateJobStatus(job)
        return nil
    }

    // 5. Job not finished, manage active pods

    // Calculate desired active pods
    wantActive := 0

    if job.Spec.Completions == nil {
        // Run parallelism pods
        wantActive = int(*job.Spec.Parallelism)
    } else {
        // Run min(parallelism, completions - succeeded)
        remaining := int(*job.Spec.Completions) - succeeded
        wantActive = min(remaining, int(*job.Spec.Parallelism))
    }

    diff := active - wantActive

    if diff < 0 {
        // Need to create pods
        diff *= -1

        // Limit burst creation
        if diff > maxBatchSize {
            diff = maxBatchSize
        }

        // Check backoff for failed pods
        if jm.shouldBackoff(job, pods) {
            return nil
        }

        for i := 0; i < diff; i++ {
            pod := jm.newPodFromTemplate(&job.Spec.Template, job)
            jm.podControl.CreatePod(job.Namespace, pod)
        }

    } else if diff > 0 {
        // Too many active pods, delete some
        podsToDelete := getPodsToDelete(pods, diff)

        for _, pod := range podsToDelete {
            jm.podControl.DeletePod(job.Namespace, pod.Name)
        }
    }

    // 6. Update job status
    job.Status.Active = int32(active)
    job.Status.Succeeded = int32(succeeded)
    job.Status.Failed = int32(failed)
    jm.updateJobStatus(job)

    return nil
}

// Backoff calculation
func (jm *Controller) shouldBackoff(job *Job, pods []*Pod) bool {
    // Exponential backoff: 10s, 20s, 40s, 80s, 160s, 320s (max 6 minutes)

    failureCount := countFailedPods(pods)
    if failureCount == 0 {
        return false
    }

    lastFailureTime := getLastFailureTime(pods)
    backoffDuration := getBackoffDuration(failureCount)

    return time.Since(lastFailureTime) < backoffDuration
}

func getBackoffDuration(failureCount int) time.Duration {
    // 10s * 2^failures, max 6 minutes
    duration := 10 * time.Second * time.Duration(1<<failureCount)
    maxDuration := 6 * time.Minute

    if duration > maxDuration {
        duration = maxDuration
    }

    return duration
}
```
:p How does Job controller manage pods until completion?
??x
Location: `pkg/controller/job/job_controller.go`

Job manages pods to completion:

Spec:
- **Completions**: How many successful pods needed (nil = any one)
- **Parallelism**: Max concurrent pods
- **BackoffLimit**: Max failures before giving up

Logic:
1. Count active, succeeded, failed pods
2. If succeeded >= completions: Mark Complete
3. If failed > backoffLimit: Mark Failed
4. Calculate desired active: min(parallelism, completions - succeeded)
5. Create or delete pods to match desired

Backoff:
- Exponential: 10s, 20s, 40s, 80s, 160s, 320s (max 6min)
- Prevents rapid failure loops

Completion modes:
- NonIndexed: Any N pods succeed (default)
- Indexed: Each pod gets index (0 to N-1)

TTL controller cleans up finished Jobs after ttlSecondsAfterFinished.

RestartPolicy must be Never or OnFailure (not Always).
x??

---

#### CronJob Controller
Location: `pkg/controller/cronjob/`
CronJob creates Jobs on a schedule.

```go
// CronJob controller in pkg/controller/cronjob/cronjob_controller.go
type Controller struct {
    cronJobLister batchlisters.CronJobLister
    jobLister     batchlisters.JobLister
}

func (c *Controller) syncCronJob(key string) error {
    cronJob := c.cronJobLister.CronJobs(namespace).Get(name)

    // 1. Get jobs owned by this CronJob
    jobs := c.getJobsForCronJob(cronJob)

    // 2. Clean up finished jobs based on history limits
    c.cleanupFinishedJobs(cronJob, jobs)

    // 3. Check if suspended
    if cronJob.Spec.Suspend != nil && *cronJob.Spec.Suspend {
        return nil
    }

    // 4. Parse schedule
    schedule, err := cron.ParseStandard(cronJob.Spec.Schedule)
    if err != nil {
        return err
    }

    // 5. Calculate next scheduled time
    var earliestTime time.Time
    if cronJob.Status.LastScheduleTime != nil {
        earliestTime = cronJob.Status.LastScheduleTime.Time
    } else {
        earliestTime = cronJob.ObjectMeta.CreationTimestamp.Time
    }

    missedRuns, nextRun := c.getMissedRunsAndNextScheduledTime(schedule, earliestTime, time.Now())

    // 6. Handle concurrency policy for missed runs
    if len(missedRuns) > 0 {
        switch cronJob.Spec.ConcurrencyPolicy {
        case batch.AllowConcurrent:
            // Create job for each missed run
            for _, scheduledTime := range missedRuns {
                c.createJob(cronJob, scheduledTime)
            }

        case batch.ForbidConcurrent:
            // Only create if no active jobs
            if len(c.getActiveJobs(jobs)) == 0 {
                // Create for most recent missed run
                c.createJob(cronJob, missedRuns[len(missedRuns)-1])
            }

        case batch.ReplaceConcurrent:
            // Delete active jobs and create new one
            for _, job := range c.getActiveJobs(jobs) {
                c.jobControl.DeleteJob(job.Namespace, job.Name)
            }
            c.createJob(cronJob, missedRuns[len(missedRuns)-1])
        }
    }

    // 7. Schedule next sync
    timeUntilNextRun := nextRun.Sub(time.Now())
    c.queue.AddAfter(key, timeUntilNextRun)

    // 8. Update status
    cronJob.Status.LastScheduleTime = &metav1.Time{Time: missedRuns[len(missedRuns)-1]}
    c.updateCronJobStatus(cronJob)

    return nil
}

func (c *Controller) createJob(cronJob *CronJob, scheduledTime time.Time) error {
    // 1. Build job from template
    job := &Job{
        ObjectMeta: metav1.ObjectMeta{
            Name:      fmt.Sprintf("%s-%d", cronJob.Name, scheduledTime.Unix()),
            Namespace: cronJob.Namespace,
            Labels:    cronJob.Spec.JobTemplate.Labels,
            Annotations: map[string]string{
                "cronjob.kubernetes.io/scheduled-at": scheduledTime.Format(time.RFC3339),
            },
            OwnerReferences: []metav1.OwnerReference{
                *metav1.NewControllerRef(cronJob, batch.SchemeGroupVersion.WithKind("CronJob")),
            },
        },
        Spec: cronJob.Spec.JobTemplate.Spec,
    }

    // 2. Create job
    return c.jobControl.CreateJob(cronJob.Namespace, job)
}

func (c *Controller) cleanupFinishedJobs(cronJob *CronJob, jobs []*Job) {
    // Separate successful and failed jobs
    successfulJobs := []*Job{}
    failedJobs := []*Job{}

    for _, job := range jobs {
        if isJobFinished(job) {
            if isJobSucceeded(job) {
                successfulJobs = append(successfulJobs, job)
            } else {
                failedJobs = append(failedJobs, job)
            }
        }
    }

    // Sort by creation timestamp (oldest first)
    sort.Sort(byCreationTimestamp(successfulJobs))
    sort.Sort(byCreationTimestamp(failedJobs))

    // Delete old successful jobs
    if cronJob.Spec.SuccessfulJobsHistoryLimit != nil {
        limit := int(*cronJob.Spec.SuccessfulJobsHistoryLimit)
        for i := 0; i < len(successfulJobs)-limit; i++ {
            c.jobControl.DeleteJob(successfulJobs[i].Namespace, successfulJobs[i].Name)
        }
    }

    // Delete old failed jobs
    if cronJob.Spec.FailedJobsHistoryLimit != nil {
        limit := int(*cronJob.Spec.FailedJobsHistoryLimit)
        for i := 0; i < len(failedJobs)-limit; i++ {
            c.jobControl.DeleteJob(failedJobs[i].Namespace, failedJobs[i].Name)
        }
    }
}
```
:p How does CronJob create Jobs on schedule?
??x
Location: `pkg/controller/cronjob/cronjob_controllerv2.go`

Schedule parsing:
- Uses cron format: "0 * * * *" (every hour)
- Calculates missed runs since last schedule
- Determines next run time

Concurrency policies:
- **Allow**: Run all missed jobs concurrently
- **Forbid**: Skip missed if job still running
- **Replace**: Kill running job, start new one

Missed runs:
- StartingDeadlineSeconds limits how far back to check
- If nil, runs all missed schedules
- Prevents burst of jobs after downtime

History limits:
- SuccessfulJobsHistoryLimit: Keep N successful jobs
- FailedJobsHistoryLimit: Keep N failed jobs
- Older jobs deleted automatically

Jobs have ownerReference to CronJob for cleanup.

Controller requeues at next scheduled time for efficiency.
x??

---
