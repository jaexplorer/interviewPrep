// Binary Search

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
const reverseString = (s: string[]): void => {
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

// DFS

// BFS

// Backtracking

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
