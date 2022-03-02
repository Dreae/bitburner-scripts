import { NS } from "../NetScript";

export async function main(ns: NS) {
  if (typeof ns.args[0] === "string") {
    let target = ns.args[0];
    while (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
      await ns.weaken(ns.args[0]);
    }

    ns.spawn("mouser_loader.js")
  }
}
