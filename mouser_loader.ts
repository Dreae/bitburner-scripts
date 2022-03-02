import { NS } from './NetScript'
export let payload_files = [
  "mouser_payload.js",
  "/mouser_payload/grow.js",
  "/mouser_payload/hack.js",
  "/mouser_payload/weaken.js",
  "/mouser_payload/scheduler.js",
  "/mouser_payload/crash_security.js"
];

export async function main(ns: NS) {
  let hostname = ns.getHostname();
  await ns.scp(payload_files, "home", hostname);
  ns.spawn("/mouser_payload/scheduler.js", 1, hostname);
}
