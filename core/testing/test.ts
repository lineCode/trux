import { exit } from "deno";
export { assert, assertEqual } from "./util.ts";

export type TestFunction = () => void | Promise<void>;

const xmark = "✗";
const checkmark = "✓";
const tests = new Map<string, TestFunction>();

export function test(fn: TestFunction): void {
  const name = fn.name;
  if (!name) {
    throw new Error("Test function may not be anonymous.");
  }
  if (tests.has(name)) {
    throw new Error(`Test name must be unique.\n"${name}" is already used.`);
  }
  tests.set(name, fn);
}

async function run(): Promise<never> {
  let failed = 0;

  for (const name of tests.keys()) {
    const fn = tests.get(name);
    try {
      await fn();
      console.log(`${checkmark} ${name} passed.`);
    } catch (e) {
      ++failed;
      console.log(`${xmark} ${name} failed.`);
    }
  }

  if (failed === 0) {
    exit(0);
  }

  throw new Error(`There were ${failed} test failures.`);
  exit(1);
}

setTimeout(() => {
  if (tests.size) {
    run();
  }
}, 10);
