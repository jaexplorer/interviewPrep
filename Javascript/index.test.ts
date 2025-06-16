import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
// import { myFunction } from "./index";

// beforeEach(() => {
//   vi.useFakeTimers();
// });

// afterEach(() => {
//   vi.useRealTimers();
// });

const testCases = [
  { input: 2, expected: 4 },
  { input: 3, expected: 6 },
  { input: 0, expected: 0 },
];

// describe("Test usecases", () => {
//   testCases.forEach(({ input, expected }) => {
//     test(`myFunction(${input}) === ${expected}`, () => {
//       expect(myFunction(input)).toBe(expected);
//     });
//   });
// });
