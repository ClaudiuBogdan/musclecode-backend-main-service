---
title: Bubble Sort Implementations in Different Languages
---

# Bubble Sort Across Programming Languages 🌐

Understanding how to implement Bubble Sort in different programming languages can help solidify your understanding of both the algorithm and language-specific features. Let's examine implementations in several popular languages.

## JavaScript Implementation ⚡

```js
function bubbleSort(nums) {
  const n = nums.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        // Modern JS syntax for swapping
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
  }
  
  return nums;
}
```

> [!TIP]
> JavaScript's destructuring assignment makes swapping elements elegant. The ES6 syntax `[a, b] = [b, a]` is much cleaner than using a temporary variable.

## Python Implementation 🐍

```python
def bubble_sort(nums):
    n = len(nums)
    
    for i in range(n):
        swapped = False
        
        for j in range(n - i - 1):
            if nums[j] > nums[j + 1]:
                # Python allows simple swapping
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                swapped = True
                
        if not swapped:
            break
            
    return nums
```

> [!NOTE]
> Python, like JavaScript, allows for elegant tuple unpacking to swap elements without using a temporary variable.

## Java Implementation ☕

```java
public static int[] bubbleSort(int[] nums) {
    int n = nums.length;
    
    for (int i = 0; i < n; i++) {
        boolean swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                // In Java, we need a temporary variable for swapping
                int temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return nums;
}
```

> [!NOTE]
> Java requires using a temporary variable for swapping elements, unlike Python and JavaScript. Also note that Java arrays are mutable, so the sort happens in-place.

## C++ Implementation 🔧

```cpp
std::vector<int> bubbleSort(std::vector<int> nums) {
    int n = nums.size();
    
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                // C++ provides std::swap in the <algorithm> header
                std::swap(nums[j], nums[j + 1]);
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return nums;
}
```

> [!TIP]
> C++ provides the `std::swap` function in the `<algorithm>` header, which is a convenient way to swap elements.

## Go Implementation 🐹

```go
func bubbleSort(nums []int) []int {
    n := len(nums)
    
    for i := 0; i < n; i++ {
        swapped := false
        
        for j := 0; j < n-i-1; j++ {
            if nums[j] > nums[j+1] {
                // Go requires classic swap with temporary variable
                nums[j], nums[j+1] = nums[j+1], nums[j]
                swapped = true
            }
        }
        
        if !swapped {
            break
        }
    }
    
    return nums
}
```

> [!NOTE]
> Go, like Python, allows for simple variable swapping without a temporary variable using multiple assignment.

## 🔍 Language-Specific Optimizations

Each programming language may offer specific optimizations:

<details>
<summary>JavaScript Optimizations</summary>

- **Typed Arrays**: For sorting numbers, using TypedArrays like `Float64Array` or `Int32Array` can be more efficient than regular arrays.
- **Avoiding Array Methods**: Direct array access is typically faster than using methods like `slice()` or `splice()`.

```js
// Using TypedArray
function bubbleSortTyped(numsArray) {
  const nums = new Float64Array(numsArray);
  // ... same bubble sort algorithm ...
  return Array.from(nums); // Convert back to regular array if needed
}
```
</details>

<details>
<summary>Python Optimizations</summary>

- **NumPy Arrays**: For large datasets, using NumPy arrays can be significantly faster than Python lists.
- **List Comprehensions**: For certain operations, list comprehensions are faster than loops.

```python
import numpy as np

def bubble_sort_numpy(nums_list):
    nums = np.array(nums_list)
    # ... same bubble sort algorithm ...
    return nums.tolist()  # Convert back to list if needed
```
</details>

## 🤔 Questions to Explore

* How would you implement Bubble Sort for custom objects or structures in each language?
* Which language features make implementing Bubble Sort easier or more efficient?
* How would you modify these implementations to sort in descending order?

> [!TIP]
> While it's valuable to know how to implement sorting algorithms yourself, most programming languages provide built-in sorting functions that are highly optimized. For real-world applications, consider using these built-in functions:
> 
> - JavaScript: `Array.prototype.sort()`
> - Python: `sorted()` or `list.sort()`
> - Java: `Arrays.sort()` or `Collections.sort()`
> - C++: `std::sort()`
> - Go: `sort.Ints()`, `sort.Float64s()`, etc.

In the next lesson, we'll explore practical applications and scenarios where Bubble Sort might be useful in real-world programming. 