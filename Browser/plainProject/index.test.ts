import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import userEvent from "@testing-library/user-event";
import { showCurrentTime } from "./index";
import { screen } from "@testing-library/dom";
import moment from "moment";

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
