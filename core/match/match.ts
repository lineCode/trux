import { parsePattern } from "./parser.ts";
import { compile } from "./compiler.ts";
import { optimize } from "./optimizer.ts";
import { Eval, Evaluator } from "./eval.ts";
import { log } from "./common.ts";

export function pattern(pattern: string): Eval {
  const nodes = parsePattern(pattern);
  const states = compile(nodes);
  const optimized = optimize(states);
  return new Evaluator(optimized);
}

const ptn = pattern("XP:t/:y/ap");
console.log(ptn.match("XPA/hdsds/ap"));
// [ 0, 2, 3, 4, 9, 12, 12 ]
