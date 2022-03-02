import { NS } from "../NetScript";

export async function main(ns: NS) {
  if (typeof ns.args[0] === "string") {
    while (true) {
      await ns.grow(ns.args[0]);
    }
  }
}
