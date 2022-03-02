import { NS } from './NetScript';
import { takeover } from './mouser/takeover';
import { payload_files } from './mouser_loader';

let visited = [];

let ns: NS = null

export async function main(_ns: NS) {
	ns = _ns;
	visited = [ns.getHostname()];

	let nodes = ns.scan();
	while (true) {
		let node = nodes.pop();
		if (!node) break;
		if (visited.includes(node)) continue;
		nodes = nodes.concat(ns.scan(node));

		await takeover(node, payload_files, ns);
		visited.push(node);
	}
}
