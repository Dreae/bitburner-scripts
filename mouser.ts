import { NS } from './NetScript';
import { batching_strategy_simple, map_breached_nodes } from './lib/index';

let ns: NS = null

export async function main(_ns: NS) {
	ns = _ns;
	await map_breached_nodes(ns, async (node: string) => {
		start_payload(node);
	});
}

function start_payload(node: string) {
	let max_ram = ns.getServerMaxRam(node);

	if (ns.getServerMaxMoney(node) == 0) return;
	let batching_strategy = batching_strategy_simple(max_ram, ns);
	
	ns.exec("/mouser_payload/weaken.js", node, batching_strategy.weaken_threads, node);
	if (ns.getServerRequiredHackingLevel(node) <= ns.getHackingLevel()) {
		ns.exec("/mouser_payload/hack.js", node, batching_strategy.hack_threads, node);
	}
	ns.exec("/mouser_payload/grow.js", node, batching_strategy.grow_threads, node);
}
