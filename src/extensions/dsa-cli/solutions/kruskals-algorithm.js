class KruskalsAlgorithms {
	solve(edges) {
		const custom_edges = [
			[[1, 1]],
			[
				[0, 1],
				[2, 2]
			],
			[[1, 2]]
		];
		// return kruskalsAlgorithm(custom_edges);
		console.log('Edges received:', edges);
		return kruskalsAlgorithm(edges);
	}
}
function kruskalsAlgorithm(edges) {
	const edgeList = [];
	for (let sourceIndex = 0; sourceIndex < edges.length; sourceIndex++) {
		const vertex = edges[sourceIndex];
		for (const edge of vertex) {
			if (edge[0] > sourceIndex) {
				edgeList.push([sourceIndex, edge[0], edge[1]]);
			}
		}
	}

	const sortedEdges = edgeList.sort((edgeA, edgeB) => {
		if (edgeA[2] > edgeB[2]) return 1;
		if (edgeA[2] < edgeB[2]) return -1;
		return 0;
	});

	const parents = edges.map((_, i) => i);
	const ranks = edges.map(_ => 0);
	const mst = edges.map(_ => []);
	for (const edge of sortedEdges) {
		const vertex1Root = find(edge[0], parents);
		const vertex2Root = find(edge[1], parents);
		if (vertex1Root !== vertex2Root) {
			mst[edge[0]].push([edge[1], edge[2]]);
			mst[edge[1]].push([edge[0], edge[2]]);
			union(vertex1Root, vertex2Root, parents, ranks);
		}
	}

	return mst;
}

function find(vertex, parents) {
	if (vertex !== parents[vertex]) {
		parents[vertex] = find(parents[vertex], parents);
	}
	return parents[vertex];
}

function union(vertex1Root, vertex2Root, parents, ranks) {
	if (ranks[vertex1Root] < ranks[vertex2Root]) {
		parents[vertex1Root] = vertex2Root;
	} else if (ranks[vertex1Root] > ranks[vertex2Root]) {
		parents[vertex2Root] = vertex1Root;
	} else {
		parents[vertex2Root] = vertex1Root;
		ranks[vertex1Root]++;
	}
}

module.exports = { Problem: KruskalsAlgorithms };
