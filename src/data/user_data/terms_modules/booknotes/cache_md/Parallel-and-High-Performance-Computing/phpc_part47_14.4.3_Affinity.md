# High-Quality Flashcards: Parallel-and-High-Performance-Computing_processed (Part 47)


**Starting Chapter:** 14.4.3 Affinity is more than just process binding The full picture

---


#### Process Affinity and MPI
Background context: In parallel computing, process affinity allows you to control where processes run on a multi-core processor. This is particularly useful for optimizing performance by ensuring that processes remain close to specific hardware components, thus reducing latency. The `taskset` and `numactl` commands are commonly used tools on Linux systems to set this binding.

:p What is the main purpose of process affinity in MPI?
??x
The primary goal of process affinity in MPI is to optimize performance by ensuring that processes run on specific CPU cores or nodes, thereby reducing inter-process communication latency. This can be achieved using `taskset` and `numactl` commands.
x??

---


#### Order of Ranks
Background context: The order in which ranks are placed can affect data locality and communication efficiency. Proper ordering ensures that processes that communicate frequently are close together.

:p What is the importance of placing closely interacting ranks next to each other?
??x
Placing closely interacting ranks next to each other is important because it maximizes data locality, reducing the time needed for inter-process communication. This arrangement can significantly improve performance by minimizing latency and bandwidth requirements.
x??

---


#### Binding (Affinity)
Background context: Process binding or affinity allows you to control where a process runs on multi-core processors. This is essential for optimizing performance in parallel computing.

:p What does process binding accomplish in the context of MPI?
??x
Process binding in MPI accomplishes the task of ensuring that each rank runs on a specified core, thereby reducing communication latency and improving overall performance by keeping processes close to their data and minimizing cross-core communication.
x??

---


#### Placement Report Output Interpretation
Background context: The text discusses the output from the placement report, which shows how MPI ranks are distributed across NUMA domains.

:p What does the round-robin distribution pattern in the output indicate?
??x
The round-robin distribution pattern indicates that MPI ranks are placed across NUMA domains in a balanced manner. Specifically, every second rank is assigned to a different socket, ensuring even memory access and potentially better performance due to reduced contention on shared memory.

This distribution helps in maintaining good bandwidth from main memory while allowing the scheduler to move processes freely within their respective NUMA domains.
x??

---


#### Advanced Affinity Constraints
Background context: The text explains how to use advanced affinity constraints with the `--map-by` option. This allows for more precise control over process placement on hardware cores.

:p How do you spread MPI ranks across sockets while ensuring each socket has a specified number of processes?
??x
To spread MPI ranks across sockets, you can use the `--map-by ppr:N:socket:PE=N` option with specific parameters. For instance, to place 22 MPI ranks per socket:

```bash
mpirun -n 44 --map-by ppr:22:socket:PE=1 ./StreamTriad
```

This command places processes in a specified pattern across sockets while binding each rank's threads to hardware cores. The `PE=1` parameter specifies that one physical core can have two virtual processors (threads).

Here, for rank 0 and 1:
- Rank 0 gets the first hardware core with virtual processors 0 and 44.
- Rank 1 gets the next hardware core with virtual processors 22 and 66.

This ensures processes are spread out and threads remain together on their respective cores.
x??

---

---


#### Testing Different Numbers of Threads
The script tests various numbers of threads that divide evenly into the number of processors.

:p What does the script do to test different numbers of OpenMP threads?
??x
The script tests different numbers of OpenMP threads by iterating through a list of thread counts. For each count, it sets the `OMP_NUM_THREADS` variable and calculates other necessary values:
```bash
THREAD_LIST_FULL="2 4 11 22 44"
for num_threads in ${THREAD_LIST_FULL}
do
    export OMP_NUM_THREADS=${num_threads}}
    HW_PES_PER_PROCESS=$((${OMP_NUM_THREADS} /${THREADS_PER_CORE}))
    MPI_RANKS=$((${LOGICAL_PES_AVAILABLE} /${OMP_NUM_THREADS}))
    PES_PER_SOCKET=$((${MPI_RANKS} /${SOCKETS_AVAILABLE}))

    RUN_STRING="mpirun -n ${MPI_RANKS} --map-by ppr:${PES_PER_SOCKET}:socket:PE=${HW_PES_PER_PROCESS} ./StreamTriad${POST_PROCESS}"
    echo ${RUN_STRING}
    eval ${RUN_STRING}
done
```

This loop ensures that the script runs `StreamTriad` with different thread configurations, verifying the affinity settings.
x??

---

---


#### Affinity: Larger Simulations
Background context discussing how affinity benefits larger simulations by reducing buffer memory requirements, consolidating domains, reducing ghost cell regions, minimizing processor contention, and utilizing underutilized components like vector units.
:p In what scenarios would you expect to see significant benefits from using hybrid MPI and OpenMP in large-scale simulations?
??x
In large-scale simulations, the use of hybrid MPI and OpenMP can provide significant benefits by:
- Reducing MPI buffer memory requirements.
- Creating larger domains that consolidate and reduce ghost cell regions.
- Minimizing contention for processors on a node through better workload distribution.
- Utilizing vector units and other processor components more effectively when they are underutilized.
x??

---

