const assert = require('assert');
const ProblemTests = require('./problem-test');
const util = require('util');

class Node {
	constructor(id, x, y) {
		this.id = id;
		this.x = x;
		this.y = y;
	}
}

// Should be bidirectional.
class Graph {
	constructor() {
		this.edges = {};
	}

	addEdge(node, neighbor) {
		if (!this.edges[node.id]) {
			this.edges[node.id] = [];
		}
		this.edges[node.id].push(neighbor);
	}

	neighbors(node) {
		return this.edges[node.id];
	}

	cost(nodeA, nodeB) {
		return 1; // Assuming uniform cost for this example
	}

	dfs(currentNode, visitedNodes = new Set()) {
		visitedNodes.add(currentNode);

		if (!this.edges[currentNode.id]) {
			console.log('No neighbors (leaf node)');
			// console.log("Path", visitedNodes);
			printPath(visitedNodes);
			return;
		} // No neighbors (leaf node)

		this.neighbors(currentNode).forEach(neighbor => {
			if (!visitedNodes.has(neighbor)) {
				this.dfs(neighbor, new Set(visitedNodes));
			}
		});
	}
}

class BidirectionalGraph {
	constructor() {
		this.edges = {};
	}

	addEdge(node, neighbor) {
		// Create a new entry for the node if it doesn't exist
		if (!this.edges[node.id]) {
			this.edges[node.id] = [];
		}

		this.edges[node.id].push(neighbor);
		// Add the node to the neighbor's list of neighbors
		if (!this.edges[neighbor.id]) {
			this.edges[neighbor.id] = [];
		}
		this.edges[neighbor.id].push(node);
	}

	neighbors(node) {
		return this.edges[node.id];
	}

	cost(nodeA, nodeB) {
		return 1; // Assuming uniform cost for this example
	}

	dfs(currentNode, visitedNodes = new Set()) {
		visitedNodes.add(currentNode);

		if (!this.edges[currentNode.id]) {
			console.log('No neighbors (leaf node)');
			// console.log("Path", visitedNodes);
			printPath(visitedNodes);
			return;
		} // No neighbors (leaf node)

		this.neighbors(currentNode).forEach(neighbor => {
			if (!visitedNodes.has(neighbor)) {
				this.dfs(neighbor, new Set(visitedNodes));
			}
		});
	}
}

class GraphBuilders {
	create_graph_1() {
		//
		//     A
		//     / \
		//    B   C
		//   / \   \
		//  D   E   F
		//   \ /   /
		//    G___/

		//

		// Create nodes with x and y properties
		const A = new Node('A', 0, 0);
		const B = new Node('B', 1, 0);
		const C = new Node('C', 0, 1);
		const D = new Node('D', 2, 0);
		const E = new Node('E', 1, 1);
		const F = new Node('F', 0, 2);
		const G = new Node('G', 2, 2);

		const graph = new Graph();
		graph.addEdge(A, B);
		graph.addEdge(A, C);
		graph.addEdge(B, D);
		graph.addEdge(B, E);
		graph.addEdge(C, F);
		graph.addEdge(D, G);
		graph.addEdge(E, G);
		graph.addEdge(F, G);

		return { graph, nodes: { A, B, C, D, E, F, G } };
	}

	create_graph_2() {
		//     A
		//     / \
		//    B   C
		//   /  X  \
		//  D  /__ E
		//   \|    /
		//    F___G

		const A = new Node('A', 0, 0);
		const B = new Node('B', 1, 0);
		const C = new Node('C', 2, 0);
		const D = new Node('D', 1, 1);
		const E = new Node('E', 2, 1);
		const F = new Node('F', 1, 2);
		const G = new Node('G', 2, 2);

		const graph = new Graph();
		graph.addEdge(A, B);
		graph.addEdge(A, C);
		graph.addEdge(B, D);
		graph.addEdge(B, E);
		graph.addEdge(C, E);
		graph.addEdge(C, F);
		graph.addEdge(D, F);
		graph.addEdge(D, E);
		graph.addEdge(E, G);
		graph.addEdge(F, G);

		return { graph, nodes: { A, B, C, D, E, F, G } };
	}
	create_graph_4() {
		//   A____B____C
		//   |\   ___/ |
		//   |  x      |
		//   D____E___ F___ G

		const A = new Node('A', 0, 0);
		const B = new Node('B', 1, 0);
		const C = new Node('C', 2, 0);
		const D = new Node('D', 3, 0);
		const E = new Node('E', 1, 1);
		const F = new Node('F', 2, 1);
		const G = new Node('G', 3, 1);

		const graph = new Graph();
		graph.addEdge(A, B);
		graph.addEdge(A, E);
		graph.addEdge(A, D);
		graph.addEdge(B, C);
		graph.addEdge(C, D);
		graph.addEdge(C, F);
		graph.addEdge(F, G);
		graph.addEdge(E, G);

		const nodes = { A, B, C, D, E, F, G };
		return { graph, nodes };
	}

	create_graph_5() {
		//   A____B____C
		//   |   |   /
		//   |   |  /
		//   |   | /
		//   D___E
		//   |\  |
		//   | \ |
		//   |__\|
		//   F    G

		const A = new Node('A', 0, 2);
		const B = new Node('B', 1, 2);
		const C = new Node('C', 2, 2);
		const D = new Node('D', 0, 1);
		const E = new Node('E', 1, 1);
		const G = new Node('G', 0, 0);
		const F = new Node('F', 1, 0);

		const graph = new Graph();
		graph.addEdge(A, B);
		graph.addEdge(A, D);
		graph.addEdge(B, C);
		graph.addEdge(B, E);
		graph.addEdge(C, E);
		graph.addEdge(D, G);
		graph.addEdge(D, F);
		graph.addEdge(D, E);
		graph.addEdge(D, G);
		graph.addEdge(E, G);
		graph.addEdge(G, G);

		const nodes = { A, B, C, D, E, G, F };
		return { graph: graph, nodes: nodes };
	}

	// Creates a long ass graph
	create_long_ass_graph() {
		// These are the coordinates, but the connectiosn are incorrect, you better use this:
		// https://csacademy.com/app/graph_editor/
		/**
        A B
        A C
        B D
        B E
        C F
        C G
        D H
        D I
        E J
        E K
        F L
        F M
        G N
        G O
        H P
        H Q
        I R
        I S
        J T
        J U
        K V
        K W
        L X
        L Y
        M Z
        M AA
        N AB
        N AC
        O AD
        O AE
        P AF
        P AG
        Q AH
        Q AI
        R AJ
        R AK
         */
		//
		//
		//              A
		//            /   \
		//           B     C
		//          / \   / \
		//         D   E F   G
		//        / \ /  \  / \
		//       H  I J  K L  M
		//          / \ | / \ | \
		//         N   O P   Q   R
		//          \ /  |  / \  |
		//          AB  AE AF  AI
		//              / \ | / \
		//             AD  AG AH AJ
		//                  |  |
		//                 AK  AK

		const A = new Node('A', 0, 0);
		const B = new Node('B', 1, -1);
		const C = new Node('C', 1, 1);
		const D = new Node('D', 2, -2);
		const E = new Node('E', 2, 0);
		const F = new Node('F', 2, 2);
		const G = new Node('G', 3, -3);
		const H = new Node('H', 3, -1);
		const I = new Node('I', 3, 1);
		const J = new Node('J', 3, 3);
		const K = new Node('K', 4, -4);
		const L = new Node('L', 4, -2);
		const M = new Node('M', 4, 0);
		const N = new Node('N', 4, 2);
		const O = new Node('O', 4, 4);
		const P = new Node('P', 5, -5);
		const Q = new Node('Q', 5, -3);
		const R = new Node('R', 5, -1);
		const S = new Node('S', 5, 1);
		const T = new Node('T', 5, 3);
		const U = new Node('U', 5, 5);
		const V = new Node('V', 6, -6);
		const W = new Node('W', 6, -4);
		const X = new Node('X', 6, -2);
		const Y = new Node('Y', 6, 0);
		const Z = new Node('Z', 6, 2);
		const AA = new Node('AA', 6, 4);
		const AB = new Node('AB', 6, 6);
		const AC = new Node('AC', 7, -7);
		const AD = new Node('AD', 7, -5);
		const AE = new Node('AE', 7, -3);
		const AF = new Node('AF', 7, -1);
		const AG = new Node('AG', 7, 1);
		const AH = new Node('AH', 7, 3);
		const AI = new Node('AI', 7, 5);
		const AJ = new Node('AJ', 7, 7);
		const AK = new Node('AK', 8, -8);

		const graph = new Graph();
		graph.addEdge(A, B);
		graph.addEdge(A, C);
		graph.addEdge(B, D);
		graph.addEdge(B, E);
		graph.addEdge(C, F);
		graph.addEdge(C, G);
		graph.addEdge(D, H);
		graph.addEdge(D, I);
		graph.addEdge(E, J);
		graph.addEdge(E, K);
		graph.addEdge(F, L);
		graph.addEdge(F, M);
		graph.addEdge(G, N);
		graph.addEdge(G, O);
		graph.addEdge(H, P);
		graph.addEdge(H, Q);
		graph.addEdge(I, R);
		graph.addEdge(I, S);
		graph.addEdge(J, T);
		graph.addEdge(J, U);
		graph.addEdge(K, V);
		graph.addEdge(K, W);
		graph.addEdge(L, X);
		graph.addEdge(L, Y);
		graph.addEdge(M, Z);
		graph.addEdge(M, AA);
		graph.addEdge(N, AB);
		graph.addEdge(N, AC);
		graph.addEdge(O, AD);
		graph.addEdge(O, AE);
		graph.addEdge(P, AF);
		graph.addEdge(P, AG);
		graph.addEdge(Q, AH);
		graph.addEdge(Q, AI);
		graph.addEdge(R, AJ);
		graph.addEdge(R, AK);

		const nodes = {
			A,
			B,
			C,
			D,
			E,
			F,
			G,
			H,
			I,
			J,
			K,
			L,
			M,
			N,
			O,
			P,
			Q,
			R,
			S,
			T,
			U,
			V,
			W,
			X,
			Y,
			Z,
			AA,
			AB,
			AC,
			AD,
			AE,
			AF,
			AG,
			AH,
			AI,
			AJ,
			AK
		};
		// console.log("Created graph with nodes: ", nodes, "graph", graph);
		return { graph: graph, nodes: nodes };
	}

	// Interesting and complex graph to traverse around.
	create_t_graph_1() {
		/**  
        A----B
       |  \ | \
       D   \|  H
       |  \ | /|
       |    C  |
        \    \ G
         \    /
          \  /
           E
           |
           F
         */

		const A = new Node('A', 0, 1);
		const B = new Node('B', 2, 1);
		const C = new Node('C', 2, -1);
		const D = new Node('D', 0, 0);
		const E = new Node('E', 1, -5);
		const F = new Node('F', 1, -6);
		const G = new Node('G', 3, -2);
		const H = new Node('H', 3, 0);

		const nodes = { A, B, C, D, E, F, G, H };

		const graph = new BidirectionalGraph();
		graph.addEdge(A, B);
		graph.addEdge(A, D);
		graph.addEdge(A, C);
		graph.addEdge(B, C);
		graph.addEdge(B, H);
		graph.addEdge(C, H);
		graph.addEdge(C, G);
		graph.addEdge(C, D);
		graph.addEdge(D, E);
		graph.addEdge(D, G);
		graph.addEdge(E, G);
		graph.addEdge(E, F);

		return { graph: graph, nodes: nodes };
	}
}

class BasicSearchProblems extends ProblemTests {
	constructor(Problem, algorithm_name) {
		super(Problem);
		this.algorithm_name = algorithm_name;
		this.tests.push(() => this.try_test(this.test_1));
		this.tests.push(() => this.try_test(this.test_2));
		this.tests.push(() => this.try_test(this.test_3));
	}

	try_test(method) {
		try {
			method.bind(this)();
		} catch (e) {
			console.log(e);
		}
	}

	test_1() {
		//   A____B____C
		//   |   |   /
		//   |   |  /
		//   |   | /
		//   D___E
		//   |\  |
		//   | \ |
		//   |__\|
		//   F    G

		const { graph, nodes } = new GraphBuilders().create_graph_5();
		const start = nodes.A;
		const goal = nodes.G;

		console.log('______________________________________________');
		console.log(`Results from create_graph_5, ${this.algorithm_name}`);
		const problem = new this.Problem();

		const results = problem.solve(graph, start, goal);
		console.log(
			util.inspect(results, {
				showHidden: false,
				depth: null,
				colors: true
			})
		);
	}

	test_2() {
		// long_ass graph
		const { graph, nodes } = new GraphBuilders().create_long_ass_graph();
		const start = nodes.A;
		const goal = nodes.AK;

		console.log('\n\n______________________________________________\n');
		console.log(
			`Results from create_long_ass_graph, ${this.algorithm_name}\n`
		);
		const problem = new this.Problem();
		const results = problem.solve(graph, start, goal);
		const queue_snapshot = results?.queue_snapshot;

		console.log(`Count Searches: ${results?.count_searches}`);
		console.log({
			...results,
			queue_snapshot: queue_snapshot?.map(nodes =>
				nodes?.map(node => node?.id)
			)
		});
	}

	test_3() {
		/**  
                 A----B
                |  \ | \
                D   \|  H
                |  \ | /|
                |    C  |
                 \    \ G
                  \    /
                   \  /
                    E
                    |
                    F
       */

		const { graph, nodes } = new GraphBuilders().create_t_graph_1();
		const start = nodes.A;
		const goal = nodes.F;
		// console.log(nodes, "start", start, "goal", goal)

		const problem = new this.Problem();
		const results = problem.solve(graph, start, goal);

		console.log('______________________________________________');
		console.log(`Results from t_graph_1, ${this.algorithm_name}`);
		console.log(
			util.inspect(results, {
				showHidden: false,
				depth: null,
				colors: true
			})
		);
		console.log(
			` t_graph_1 ${this.algorithm_name}: ${results?.count_searches}`
		);
	}
}

class AStarSearch extends BasicSearchProblems {
	constructor(Problem) {
		super(Problem, 'A* Search');
	}
}

class DepthFirstSearch extends BasicSearchProblems {
	constructor(Problem) {
		super(Problem, 'Depth First Search');
	}
}

class GreedySearch extends BasicSearchProblems {
	constructor(Problem) {
		super(Problem, 'Greedy Search');
	}
}

class breadthFirstSearch extends BasicSearchProblems {
	constructor(Problem) {
		super(Problem, 'Breadth First Search');
	}
}

class hillClimbingSearch extends BasicSearchProblems {
	constructor(Problem) {
		super(Problem, 'Hill Climbing Search');
	}
}

class DijkstraSearch extends BasicSearchProblems {
	constructor(Problem) {
		super(Problem, 'Dijikstra Search');
	}
}

class BeamSearch extends BasicSearchProblems {
	constructor(Problem) {
		super(Problem, 'Beam Search');
		this.tests.push(() => this.try_test(this.test_b1));
		this.tests.push(() => this.try_test(this.test_b2));
		this.tests.push(() => this.try_test(this.test_b3));
		this.tests.push(() => this.try_test(this.test_b4));
	}

	test_b1() {
		const { graph, nodes } = new GraphBuilders().create_long_ass_graph();
		const start = nodes.A;
		const goal = nodes.AK;
		const beam_width = 10;

		this.test_beam(
			beam_width,
			graph,
			start,
			goal,
			'create_long_ass_graph',
			{ enable_snapshot: true }
		);
	}

	test_b2() {
		const { graph, nodes } = new GraphBuilders().create_long_ass_graph();
		const start = nodes.A;
		const goal = nodes.AK;
		const beam_width = 5;

		this.test_beam(
			beam_width,
			graph,
			start,
			goal,
			'create_long_ass_graph',
			{ enable_snapshot: true }
		);
	}

	test_b3() {
		const { graph, nodes } = new GraphBuilders().create_long_ass_graph();
		// console.log("graph", graph)
		const start = nodes.A;
		const goal = nodes.AK;
		const beam_width = 3;

		this.test_beam(
			beam_width,
			graph,
			start,
			goal,
			'create_long_ass_graph',
			{ enable_snapshot: true }
		);
	}

	test_b4() {
		const { graph, nodes } = new GraphBuilders().create_long_ass_graph();
		// console.log("graph", graph)
		const start = nodes.A;
		const goal = nodes.AK;
		const beam_width = 9;

		this.test_beam(
			beam_width,
			graph,
			start,
			goal,
			'create_long_ass_graph',
			{ enable_snapshot: true }
		);
	}

	test_beam(
		beam_width,
		graph,
		start,
		goal,
		graph_name,
		{ enable_snapshot = false } = {}
	) {
		console.log('\n\n______________________________________________\n');
		console.log(
			'Results from ' + graph_name,
			this.algorithm_name,
			'beam_width',
			beam_width,
			'\n'
		);

		const problem = new this.Problem();
		const results = problem.solve(graph, start, goal, beam_width);
		const queue_snapshot = results?.queue_snapshot;

		if (enable_snapshot) {
			console.log(`Count Searches: ${results.count_searches}`);
			console.log(
				util.inspect(results, {
					showHidden: false,
					depth: null,
					colors: true
				})
			);
		} else {
			console.log(`Count Searches: ${results.count_searches}`);
			console.log({
				...results,
				queue_snapshot: queue_snapshot?.map(nodes =>
					nodes?.map(node => node?.id)
				)
			});
		}
	}
}

class MinMaxPrunning extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		let values = [3, 5, 6, 9, 1, 2, 0, -1];
		const problem = new this.Problem();
		let result = problem.solve(values);
		console.log('______________________________________________');
		console.log('MinMaxPrunnin with:', values, result);
		assert.equal(result.minmax, 5);
		assert.deepEqual(result.prunnings, [6, 2]);
	}

	test_2() {
		let values = [4, 8, 9, 3, 2, -2, 2, -1];
		const problem = new this.Problem();
		let result = problem.solve(values);
		console.log('______________________________________________');
		console.log('MinMaxPrunning with:', values, result);
		assert.equal(result.minmax, 8);
		assert.deepEqual(result.prunnings, [9, 2]);
	}
}

const TEST_DICTIONARY = {
	'a-star-search': AStarSearch,
	'depth-first-search': DepthFirstSearch,
	'greedy-search': GreedySearch,
	'breadth-first-search': breadthFirstSearch,
	'hill-climbing-search': hillClimbingSearch,
	'beam-search': BeamSearch,
	'dijkstra-search': DijkstraSearch,
	'beam-search': BeamSearch,
	'min-max-prunning': MinMaxPrunning
};

module.exports = TEST_DICTIONARY;
