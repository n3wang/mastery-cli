


Understandable solution:

```python
from collections import defaultdict
from typing import List

class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        task_frequencies = defaultdict(int)
        
        for task in tasks:
            task_frequencies[task] += 1

        sorted_frequencies = sorted(task_frequencies.values(), reverse=True)

        total_intervals = 0
        while sorted_frequencies[0] > 0:
            interval = 0
            while interval <= n:
                if sorted_frequencies[0] == 0:
                    break
                if interval < len(sorted_frequencies) and sorted_frequencies[interval] > 0:
                    sorted_frequencies[interval] -= 1
                total_intervals += 1
                interval += 1
            sorted_frequencies.sort(reverse=True)

        return total_intervals

```


```java
import java.util.*;

public class Solution {
    public int leastInterval(char[] tasks, int n) {
        Map<Character, Integer> taskFrequencies = new HashMap<>();
        
        // Count the frequency of each task
        for (char task : tasks) {
            taskFrequencies.put(task, taskFrequencies.getOrDefault(task, 0) + 1);
        }
        
        // Create a list of frequencies and sort in descending order
        List<Integer> sortedFrequencies = new ArrayList<>(taskFrequencies.values());
        Collections.sort(sortedFrequencies, Collections.reverseOrder());

        int totalIntervals = 0;
        
        while (sortedFrequencies.get(0) > 0) {
            int interval = 0;
            while (interval <= n) {
                if (sortedFrequencies.get(0) == 0) {
                    break;
                }
                if (interval < sortedFrequencies.size() && sortedFrequencies.get(interval) > 0) {
                    sortedFrequencies.set(interval, sortedFrequencies.get(interval) - 1);
                }
                totalIntervals++;
                interval++;
            }
            Collections.sort(sortedFrequencies, Collections.reverseOrder());
        }

        return totalIntervals;
    }
}


```


```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int LeastInterval(char[] tasks, int n) {
        Dictionary<char, int> taskFrequencies = new Dictionary<char, int>();
        
        // Count the frequency of each task
        foreach (char task in tasks) {
            if (taskFrequencies.ContainsKey(task)) {
                taskFrequencies[task]++;
            } else {
                taskFrequencies[task] = 1;
            }
        }
        
        // Create a list of frequencies and sort in descending order
        List<int> sortedFrequencies = taskFrequencies.Values.ToList();
        sortedFrequencies.Sort((a, b) => b.CompareTo(a));
        
        int totalIntervals = 0;
        
        while (sortedFrequencies[0] > 0) {
            int interval = 0;
            while (interval <= n) {
                if (sortedFrequencies[0] == 0) {
                    break;
                }
                if (interval < sortedFrequencies.Count && sortedFrequencies[interval] > 0) {
                    sortedFrequencies[interval]--;
                }
                totalIntervals++;
                interval++;
            }
            sortedFrequencies.Sort((a, b) => b.CompareTo(a));
        }

        return totalIntervals;
    }
}

```






