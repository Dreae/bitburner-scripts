import { NS } from "../NetScript";

export async function main(ns: NS) {
  if (typeof ns.args[0] === "string") {
    let hostname = ns.args[0];
    let max_ram = ns.getServerMaxRam(hostname);
    
    if (ns.getServerRequiredHackingLevel(hostname) > ns.getHackingLevel()) {
      let crash_ram_cost = ns.getScriptRam("/mouser_payload/crash_security.js");
      ns.spawn("/mouser_payload/crash_security.js", Math.floor(max_ram / crash_ram_cost), hostname);
      return;
    }

    let hack_ram_cost = ns.getScriptRam("/mouser_payload/hack.js");
    let grow_ram_cost = ns.getScriptRam("/mouser_payload/grow.js");
    let weaken_ram_cost = ns.getScriptRam("/mouser_payload/weaken.js");
    
    let total_ram = hack_ram_cost + grow_ram_cost + weaken_ram_cost;
    let t_grow = 1;
    let t_hack = 1;
    let t_weaken = 1;
    let can_spawn = (cost: number): boolean => {
      return  cost < max_ram - total_ram;
    }
    
    let c = 0;
    while (true) {
      if (can_spawn(hack_ram_cost)) {
        t_hack++;
        total_ram += hack_ram_cost;
        if (t_hack % 5 == 0 && can_spawn(weaken_ram_cost)) {
          t_weaken++;
          total_ram += weaken_ram_cost;
        } else if (t_hack % 7 == 0 && can_spawn(grow_ram_cost)) {
          t_grow++;
          total_ram += grow_ram_cost;
        }
      } else {
        break;
      }
    }
    
    ns.scriptKill("/mouser_payload/grow.js", hostname);
    ns.scriptKill("/mouser_payload/hack.js", hostname);
    ns.scriptKill("/mouser_payload/weaken.js", hostname);

    ns.run("/mouser_payload/grow.js", t_grow, hostname);
    ns.run("/mouser_payload/weaken.js", t_weaken, hostname);
    ns.spawn("/mouser_payload/hack.js", t_hack, hostname);
  }
}
