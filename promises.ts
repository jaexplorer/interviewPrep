import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const simulateApi = (name: string, delay: number, shouldFail?: Boolean) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(
      () =>
        shouldFail ? reject(`${name} failed`) : resolve(`${name} fetched`),
      delay
    );
  });
};

// TEST
test("simulateApi resolves after delay", async () => {
  const promise = simulateApi("Test", 100);
  vi.advanceTimersByTime(100);
  await expect(promise).resolves.toBe("Test fetched");
});

test("simulateApi rejects on failure", async () => {
  const promise = simulateApi("Test", 100, true);
  vi.advanceTimersByTime(100);
  await expect(promise).rejects.toBe("Test failed");
});

const withTimeout = <T>(promise: Promise<T>, delay: number) =>
  Promise.race([
    promise,
    new Promise<"timeout">((_, reject) =>
      setTimeout(() => reject("Timeout"), delay)
    ),
  ]);

// TEST
test("withTimeout resolves before timeout", async () => {
  const result = withTimeout(simulateApi("Quick", 50), 100);
  vi.advanceTimersByTime(100);
  await expect(result).resolves.toBe("Quick fetched");
});

test("withTimeout rejects on timeout", async () => {
  const result = withTimeout(simulateApi("Slow", 200), 100);
  vi.advanceTimersByTime(200);
  await expect(result).rejects.toBe("Timeout");
});

const fetchWithRetry = async <T>(fn: () => Promise<T>, retries = 3) => {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      console.warn(`Retry ${i + 1} failed`);
    }
  }
  throw lastError;
};

// TEST
test("fetchWithRetry retries and succeeds", async () => {
  const fn = vi
    .fn()
    .mockRejectedValueOnce("fail")
    .mockResolvedValueOnce("success");

  await expect(fetchWithRetry(fn)).resolves.toBe("success");
  expect(fn).toHaveBeenCalledTimes(2);
});

test("fetchWithRetry fails after max retries", async () => {
  const fn = vi.fn(() => Promise.reject("fail"));

  await expect(fetchWithRetry(fn, 2)).rejects.toBe("fail");
  expect(fn).toHaveBeenCalledTimes(2);
});

const throttle = async <T>(tasks: (() => Promise<T>)[], limit: number) => {
  const results: T[] = [];
  let currentIndex = 0;
  let inFlight = 0;

  return new Promise((resolve, reject) => {
    const runNext = () => {
      if (currentIndex === tasks.length && inFlight === 0) {
        return resolve(results);
      }

      while (inFlight < limit && currentIndex < tasks.length) {
        const i = currentIndex++;
        inFlight++;

        tasks[i]()
          .then((res) => {
            results[i] = res;
          })
          .catch(reject)
          .finally(() => {
            inFlight--;
            runNext();
          });
      }
    };

    runNext();
  });
};

const throttleWorker = async <T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> => {
  const results: T[] = [];
  let currentIndex = 0;

  const worker = async () => {
    while (true) {
      const i = currentIndex++;
      if (i >= tasks.length) break;
      results[i] = await tasks[i]();
    }
  };

  await Promise.all(Array.from({ length: limit }, () => worker()));

  return results;
};

test("Test throttle", async () => {
  const calls: number[] = [];

  const tasks = Array.from({ length: 6 }, (_, i) =>
    vi.fn(() => {
      calls.push(i);
      return new Promise((resolve) => setTimeout(() => resolve(i), 100));
    })
  );
  const throttlePromise = throttleWorker(tasks, 2);
  vi.advanceTimersByTime(0);
  await Promise.resolve();
  expect(calls).toEqual([0, 1]);
  vi.advanceTimersByTime(100);
  await Promise.resolve();
  expect(calls).toEqual([0, 1, 2, 3]);
  await throttlePromise;
});

const debounce = <T extends (...args) => void>(fn: T, delay: number) => {
  let timer: number | null = null;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// TEST
test("debounce delays function call", () => {
  const fn = vi.fn();
  const debounced = debounce(fn, 100);

  debounced();
  debounced();
  debounced();

  vi.advanceTimersByTime(99);
  expect(fn).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledTimes(1);
});

const printTodosWithMap = (todos: { userId: number; text: string }[]) => {
  const map = new Map<number, string[]>();

  for (const { userId, text } of todos) {
    if (!map.has(userId)) {
      map.set(userId, [text]);
    } else {
      map.get(userId)!.push(text);
    }
  }
};
