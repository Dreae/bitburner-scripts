import { NS } from "../NetScript";

export async function main(ns: NS) {
  if (typeof ns.args[0] === "string") {
    while (true) {
      await ns.weaken(ns.args[0]);
    }
  }
}
