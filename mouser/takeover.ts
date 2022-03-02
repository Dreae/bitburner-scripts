import { NS } from '../NetScript'

export async function takeover(target: string, payload_files: string[], ns: NS) {
  let opened_ports = 0;
  
  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
    opened_ports++;
  }

  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
    opened_ports++;
  }

  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
    opened_ports++;
  }
  
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
    opened_ports++;
  }
  
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
    opened_ports++;
  }
  
  if (ns.getServerNumPortsRequired(target) <= opened_ports) {
    ns.nuke(target);
  
    await ns.scp("mouser_loader.js", target);
    for (let script of payload_files) {
      ns.scriptKill(script, target);
    }
    ns.exec("mouser_loader.js", target);
  }
}
