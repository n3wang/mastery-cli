# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 49)


**Starting Chapter:** 15.4 Automatic restarts for long-running jobs

---


#### Signal Handling in Application Code
Background context: The application code demonstrates how to handle signals sent by the batch system and how to perform checkpointing. Signals are used to notify the application that its time is nearly up, allowing it to save its state before termination.
:p How does the application catch the signal?
??x
The application catches the signal using a signal handler function `batch_timeout`. This function sets a global variable `batch_terminate_signal` when it receives the signal. The main loop of the application checks this variable periodically and exits if set, allowing for graceful shutdown.
```c
static int batch_terminate_signal = 0;

void batch_timeout(int signum){
    printf("Batch Timeout : %d",signum);
    batch_terminate_signal = 1;
    return;
}
```
x??

---


#### Submission of Restart Script
Background context: The batch script resubmits itself recursively until the job is completed. This process ensures that long-running jobs can continue even if they are interrupted.
:p How does the restart script handle its own submission?
??x
The restart script checks for a `DONE` file to indicate completion. If it detects this, it submits itself again with the same parameters to continue the job from where it left off.
```sh
if [ -z ${COUNT} ]; then
    export COUNT=0
fi

((COUNT++))
echo "Restart COUNT is $COUNT"

if [ . -e DONE ]; then
    if [ -e RESTART ]; then
        echo "=== Restarting $EXEC_NAME ===" >> $OUTPUT_FILE
        cycle=`cat RESTART`
        rm -f RESTART
    else
        echo "=== Starting problem ===" >> $OUTPUT_FILE
        cycle=""
    fi

    mpirun -n ${NUM_CPUS} ${EXEC_NAME} ${cycle} &>> $OUTPUT_FILE
    STATUS=$?
    echo "Finished mpirun" >> $OUTPUT_FILE

    if [ ${COUNT} -ge ${MAX_RESTARTS} ]; then
        echo "=== Reached maximum number of restarts ===" >> $OUTPUT_FILE
        date > DONE
    fi

    if [ ${STATUS} = "0" -a . -e DONE ]; then
        echo "=== Submitting restart script ===" >> $OUTPUT_FILE
        sbatch <batch_restart.sh
    fi
fi
```
x??

---

---


#### Submitting Jobs with Dependencies
Background context: The script uses the `--dependency=afterok` option to ensure that a job starts only after another specific job has completed successfully. This is crucial for managing workflow dependencies, especially in scenarios where jobs need to be sequential or conditional.

:p What is the purpose of using `--dependency=afterok:${SLURM_JOB_ID}` in the batch script?
??x
The purpose of using `--dependency=afterok:${SLURM_JOB_ID}` is to submit a subsequent job only after the current job (`${SLURM_JOB_ID}`) has completed successfully. This ensures that the next job does not start until the previous one is done, maintaining proper workflow order.

```sh
sbatch --dependency=afterok:${SLURM_JOB_ID} batch_restart.sh
```
x??

---


#### Dependency Options for Batch Jobs
Slurm offers several dependency options that control when a job can begin execution based on the status of other jobs.

:p What are the different dependency options available in Slurm?
??x
In Slurm, you can specify various dependency options to manage the start conditions of your batch jobs. Here are some common ones:

- `after`: The job can begin after specified job(s) have started.
- `afterany`: The job can begin after any (not necessarily all) specified jobs have terminated with any status.
- `afternotok`: The job can begin only if the specified job(s) terminate unsuccessfully.
- `afterok`: The job can begin after specified job(s) have successfully completed.
- `singleton`: The job can begin only after all other jobs with the same name and user have completed.

```java
// Example of specifying a dependency in a Slurm script
public class SlurmDependencySpec {
    public static void main(String[] args) {
        // Specifying an 'after' dependency
        System.out.println("#SBATCH --dependency=after:3456");
        // This line would be part of the Slurm job submission script.
    }
}
```
x??

---

---

