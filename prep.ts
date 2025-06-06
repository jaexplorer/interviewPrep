// 1. Binary Search                 e.g Sorted arrays, finding boundaries, peak finding
// 2. Two Pointers                  e.g Sorting, linked lists, arrays, palindromes
// 3. Sliding Window                e.g Subarrays, substrings, performance optimization
// 4. Fast & Slow Pointers          e.g Cycle detection, linked lists, mid-point finding
// 5. Depth-First Search (DFS)      e.g Trees, graphs, backtracking, maze solving
// 6. Breadth-First Search (BFS)    e.g Shortest paths, levels in trees/graphs
// 7. Backtracking                  e.g Permutations, combinations, N-Queens, Sudoku
// 8. Recursion                     e.g Tree traversal, divide & conquer, dynamic problems
// 9. Greedy                        e.g Optimal substructure, intervals, Huffman coding
// 10. Monotonic Stack / Queue      e.g Histograms, sliding window max, spans
// 11. Union-Find (Disjoint Set)    e.g Connectivity, Kruskal’s MST, cycle detection
// 12. Topological Sort             e.g Course schedule, build orders, DAGs
// 13. Trie (Prefix Tree)           e.g Word searches, autocomplete, dictionary problems
// 14. Heap / Priority Queue        e.g K largest/smallest, Dijkstra’s, scheduling
// 15. Hashing (Map/Set)            e.g Frequency counting, de-duplication, lookups
// 16. Graph Algorithms             e.g Dijkstra, Bellman-Ford, Floyd-Warshall, MSTs

// Binary Search
// SCENARIO: Finds the position of a target value in a sorted array.
// It works by repeatedly dividing the search interval in half.
// If the target is less than the middle element, search the left half; otherwise, search the right half.
const binarySearch = (
  arr: number[],
  target: number,
  left = 0,
  right = arr.length - 1
): number => {
  if (left > right) return -1; // Base case: not found

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  else if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);
  else return binarySearch(arr, target, left, mid - 1);
};

// Divide and Conquer
// SCENARIO: Breaking up the sorting into smaller problems
const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merged: number[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }

  return [...merged, ...left.slice(i), ...right.slice(j)];
};

const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const end = arr.length - 1;
  const left = arr.slice(0, end).filter((x) => x < arr[end]);
  const right = arr.slice(0, end).filter((x) => x >= arr[end]);

  return [...quickSort(left), arr[end], ...quickSort(right)];
};

// Binary Tree Traversal
// SCENARIO: Visiting nodes in a tree in a particular order
// Pre-order: Visit node → left subtree → right subtree
// In-order: Left subtree → visit node → right subtree
// Post-order: Left subtree → right subtree → visit node
// Level-order (BFS): By level
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const preOrder = (node: TreeNode | null, result: number[] = []): number[] => {
  if (!node) return result;
  result.push(node.val); // Visit node
  preOrder(node.left, result); // Traverse left subtree
  preOrder(node.right, result); // Traverse right subtree
  return result;
};

const inOrder = (node: TreeNode | null, result: number[] = []): number[] => {
  if (!node) return result;
  inOrder(node.left, result); // Traverse left subtree
  result.push(node.val); // Visit node
  inOrder(node.right, result); // Traverse right subtree
  return result;
};

const postOrder = (node: TreeNode | null, result: number[] = []): number[] => {
  if (!node) return result;
  postOrder(node.left, result); // Traverse left subtree
  postOrder(node.right, result); // Traverse right subtree
  result.push(node.val); // Visit node
  return result;
};

// BFS
// SCENARIO: Search level by level or layer by layer
// Eg. Levels on a tree, on a graph or 2D Grid
const levelOrder = (root: TreeNode | null): number[] => {
  if (!root) return [];

  const queue: TreeNode[] = [root];
  const result: number[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
};

const bfsGraph = (graph: Record<string, string[]>, start: string): string[] => {
  const visited: Set<string> = new Set([start]);
  const queue: string[] = [start];
  const result: string[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }

  return result;
};

const bfsGrid = (
  grid: string[][],
  startRow: number,
  startCol: number
): number => {
  const visited = grid.map((row) => row.map(() => false));
  const queue: number[][] = [[startRow, startCol]];
  let count = 0;

  while (queue.length) {
    const [row, col] = queue.shift()!;
    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[0].length ||
      visited[row][col] ||
      grid[row][col] !== "1" // Condition
    )
      continue;

    visited[row][col] = true;
    count++;

    for (const [dr, dc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      queue.push([row + dr, col + dc]);
    }
  }

  return count;
};

// DFS
// SCENERIO: Search deep before trying another path
// Eg. Levels on a tree, on a graph or 2D Grid
const dfsTree = (node: TreeNode | null) => {
  if (!node) return;

  for (const child of [node.left, node.right]) {
    dfsTree(child);
  }
};

const dfsGraph = (
  graph: Record<string, string[]>,
  node: string,
  visited = new Set<string>()
) => {
  if (visited.has(node)) return;

  visited.add(node);

  for (const neighbor of graph[node]) {
    dfsGraph(graph, neighbor, visited);
  }
};

const dfsGrid = (
  grid: number[][],
  r: number,
  c: number,
  visited: boolean[][] = grid.map((row) => row.map(() => false))
) => {
  // Boundary & visited check
  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return;
  if (visited[r][c] || grid[r][c] === 0) return;

  visited[r][c] = true;

  // Explore neighbors (up, down, left, right)
  dfsGrid(grid, r - 1, c, visited);
  dfsGrid(grid, r + 1, c, visited);
  dfsGrid(grid, r, c - 1, visited);
  dfsGrid(grid, r, c + 1, visited);
};

// Two pointers
// SCENARIO:
// - Find two numbers that sum to a target
// [1, 2, 3, 4, 6] target= 6 -> [1, 3] → 2+4
const twoSumSorted = (nums: number[], target: number): number[] => {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return [-1, -1]; // Not found
};

// - Reverse a string in place
// ["h", "e", "l", "l", "o"] -> ["o", "l", "l", "e", "h"]
// - Given an array, check from either end whether it is identical.
const reverseString = (s: string[]) => {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    // or ^ // if (s[left] != s[right]) return false
    left++;
    right--;
  }
};

// Sliding window
// SCENARIO: Find the maximum sum of any subarray of length k in a given array
// [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4 -> [4, 2, 10, 23] has the max sum
const maxSumSlidingWindow = (nums: number[], k: number): number => {
  // 1. Build the first window of size k
  let windowSum = nums.slice(0, k).reduce((sum, val) => sum + val, 0);
  let maxSum = windowSum;

  // 2. Slide the window forward
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // Add next, remove left-most
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
};

// Prefix sum
// SCENARIO: Given an array and two index's, calculate the sum of the numbers between two index's multiple times
// We take the original array and precalculate the sums. This is to improve time from O(n) to O(1)
// e.g nums = [2, 4, 1, 7, 5, 3] becomes [0, 2, 6, 7, 14, 19, 22]
const buildPrefixSum = (nums: number[]): number[] => {
  const prefix: number[] = [0];

  for (let i = 0; i < nums.length; i++) {
    prefix.push(prefix[i] + nums[i]);
  }

  return prefix;
};

const rangeSum = (prefix: number[], left: number, right: number): number => {
  return prefix[right + 1] - prefix[left];
};

// Fast and Slow Pointers
// SCENARIO: Detecting cycles in a linked list, find the middle of a linked list
interface ListNode {
  val: number;
  next: ListNode | null;
}

// Detect if a cycle exists
const hasCycle = (head: ListNode | null): boolean => {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next; // Move 1 step
    fast = fast.next.next; // Move 2 steps

    if (slow === fast) return true; // They met = cycle!
  }

  return false; // Fast reached end = no cycle
};

const findMiddle = (head: ListNode | null): ListNode | null => {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow; // When fast hits the end, slow is at the middle
};

// Linked List In-Place Reversal
// SCENARIO: Reverse a linked list without creating a new array
// eg. 1 → 2 → 3 → 4 → null -> 4 → 3 → 2 → 1 → null
const reverseLinkedList = (head: ListNode | null): ListNode | null => {
  let prev: ListNode | null = null;
  let current = head;

  while (current !== null) {
    const nextTemp = current.next; // save next node
    current.next = prev; // reverse pointer
    prev = current; // move prev forward
    current = nextTemp; // move current forward
  }

  return prev; // new head
};

// Monotonic Stack
// SCENARIO: Find the next greater/smaller element in an array
// - Largest Rectangle in Histogram, Stock Span, Temperatures
// eg. [2, 1, 5, 3, 4] -> [5, 5, -1, 4, -1]
const nextGreaterElements = (nums: number[]): number[] => {
  const result = new Array(nums.length).fill(-1);
  const stack: number[] = []; // Will store indices, not values

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    // While stack is not empty and current > top of stack
    while (stack.length > 0 && current > nums[stack[stack.length - 1]]) {
      const index = stack.pop()!;
      result[index] = current; // current is the "next greater" for result[index]
    }

    // Push the current index onto the stack
    stack.push(i);
  }

  return result;
};

const largestRectangleArea = (heights: number[]): number => {
  const stack: number[] = []; // Stack holds indices
  let maxArea = 0;

  // Add a zero height to flush out remaining stack at the end
  heights.push(0);

  for (let i = 0; i < heights.length; i++) {
    // While current bar is lower than the top of the stack
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const poppedIndex = stack.pop()!;
      const height = heights[poppedIndex];

      // Width depends on what's left in stack
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      const area = height * width;
      maxArea = Math.max(maxArea, area);
    }

    stack.push(i);
  }

  return maxArea;
};

// K Largest / K Smallest
// SCENARIO: Find the largest/smallest numbers in an array
const findKLargest = (nums: number[], k: number): number[] => {
  const heap: number[] = [];

  const insert = (num: number) => {
    heap.push(num);
    heap.sort((a, b) => a - b); // min-heap: smallest first, swap a&b for max-heap
    if (heap.length > k) heap.shift(); // remove smallest
  };

  nums.forEach(insert);

  return heap.sort((a, b) => b - a); // return in descending order
};

// Overlapping Intervals
// SCENARIO: Merge overlapping intervals, inserting intervals
const mergeIntervals = (intervals: number[][]): number[][] => {
  // Step 1: Sort intervals by starting time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];
  merged.push(intervals[0]); // Start with the first interval

  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];

    if (curr[0] <= prev[1]) {
      // They overlap – merge by extending the end
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      // No overlap – just add it
      merged.push(curr);
    }
  }

  return merged;
};

// Backtracking
// SCENERIO: NQueen, Sudoku, permutations, combinations, find possible all paths
// function backtrack(...) {
//   if (goalReached) {
//     saveSolution()
//     return
//   }

//   for (each choice) {
//     makeChoice()
//     backtrack()
//     undoChoice()
//   }
// }
const subsets = (nums: number[]): number[][] => {
  const result: number[][] = [];

  const backtrack = (start: number, path: number[]) => {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // choose
      backtrack(i + 1, path); // explore
      path.pop(); // un-choose (backtrack)
    }
  };

  backtrack(0, []);
  return result;
};

const permute = (nums: number[]): number[][] => {
  const result: number[][] = [];

  const backtrack = (path: number[], used: boolean[]) => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]); // choose
      used[i] = true;
      backtrack(path, used); // explore
      path.pop(); // un-choose (backtrack)
      used[i] = false;
    }
  };

  backtrack(
    [],
    nums.map(() => false)
  );
  return result;
};

const solveNQueens = (n: number): string[][] => {
  const results: string[][] = [];

  const cols: number[] = []; // Track which column each row has a queen
  const diag1: number[] = []; // Track main diagonals (row - col)
  const diag2: number[] = []; // Track anti-diagonals (row + col)

  const backtrack = (row: number, board: string[]) => {
    if (row === n) {
      results.push([...board]);
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.includes(col) || diag1.includes(d1) || diag2.includes(d2))
        continue;

      // Add to tracking arrays
      cols.push(col);
      diag1.push(d1);
      diag2.push(d2);

      const rowStr = ".".repeat(col) + "Q" + ".".repeat(n - col - 1);
      board.push(rowStr);

      backtrack(row + 1, board);

      board.pop();
      cols.pop();
      diag1.pop();
      diag2.pop();
    }
  };

  backtrack(0, []);
  return results;
};
