const simulateApi = (name: string, delay: number, shouldFail?: Boolean) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(
      () =>
        shouldFail ? reject(`${name} failed`) : resolve(`${name} fetched`),
      delay
    );
  });
};

const withTimeout = <T>(promise: Promise<T>, delay: number) =>
  Promise.race([
    promise,
    new Promise<"timeout">((_, reject) =>
      setTimeout(() => reject("Timeout"), delay)
    ),
  ]);

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

const debounce = <T extends (...args) => void>(fn: T, delay: number) => {
  let timer: number | null = null;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
