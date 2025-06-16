import "@testing-library/jest-dom";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import userEvent from "@testing-library/user-event";
import { showCurrentTime } from "./index";
import { screen } from "@testing-library/dom";
import moment from "moment";

// beforeEach(() => {
//   vi.useFakeTimers();
// });

// afterEach(() => {
//   vi.useRealTimers();
// });

// const testCases = [
//   { input: 2, expected: 4 },
//   { input: 3, expected: 6 },
//   { input: 0, expected: 0 },
// ];

// describe("Test usecases", () => {
//   testCases.forEach(({ input, expected }) => {
//     test(`myFunction(${input}) === ${expected}`, () => {
//       expect(myFunction(input)).toBe(expected);
//     });
//   });
// });

beforeEach(() => {
  const html = readFileSync(join(__dirname, "index.html"), "utf-8");
  document.body.innerHTML = html;
});

test("Display current time", async () => {
  showCurrentTime();

  const text = screen.getByText(/Current Time: /i);
  expect(text).toBeInTheDocument();

  const now = moment().format("h:mmA");
  expect(text.textContent).toBe(`Current Time: ${now}`);

  await userEvent.click(text);
  expect(screen.getByText(/Current Time: /i)).toBeInTheDocument();
});
