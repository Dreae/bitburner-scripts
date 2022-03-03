import { NS } from "../NetScript";

export async function main(ns: NS) {
  if (typeof ns.args[0] === "string") {
    let max_runs = -1;
    if (typeof ns.args[1] === "string") {
      max_runs = parseInt(ns.args[1]);
    }
    
    let runs = 0;
    while (true) {
      if (max_runs > 0 && runs > max_runs) break; 
      await ns.grow(ns.args[0]);
    }
  }
}
