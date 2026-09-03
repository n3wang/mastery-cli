Strategy:
- Since it wants any cobination. We can get any of the operations. 


```python
class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        res = []
        # ans = []
        for i in range(len(expression)):
            oper = expression[i]
            if oper == "+" or oper == "-" or oper == "*":
                sub_str1 = expression[0 : i]
                sub_str2 = expression[i + 1 : ]
                s1 = self.diffWaysToCompute(sub_str1)
                s2 = self.diffWaysToCompute(sub_str2)
                for i in s1:
                    for j in s2:
                        if oper == "*":
                            res.append(int(i) * int(j))
                        if oper == "+":
                            res.append(int(i) + int(j))
                        if oper == "-":
                            res.append(int(i) - int(j))
        if len(res) == 0:
            res.append(int(expression))
        # print(res)
        return res
```


```java
class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        List<Integer> res = new ArrayList<>();

        for(int i = 0; i<expression.length(); i++){
            char operation = expression.charAt(i);
            boolean isOperation =  (operation == '*' || operation == '+' || operation == '-');
            if (!isOperation) continue;

            List<Integer> leftWays  = diffWaysToCompute(expression.substring(0, i));
            List<Integer> rightWays = diffWaysToCompute(expression.substring(i + 1));

            for (int l: leftWays){
                for (int r: rightWays){
                    if (operation == '*') res.add(l*r);
                    else if (operation == '-') res.add(l-r);
                    else res.add(l+r);
                }
            }
        }
        if(res.isEmpty()) res.add(Integer.parseInt(expression));
        return res;
    }
}
```