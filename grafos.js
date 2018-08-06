class TrainsProblem {
  constructor(townsGraph) {
    this.townsGraph = townsGraph;
  }

  static _lowestCostNodeDijkstra(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  };

  static _dijkstra(graph) {

    // track lowest cost to reach each node
    const costs = Object.assign({ finish: Infinity }, graph.start);

    // track paths
    const parents = { finish: null };
    for (let child in graph.start) {
      parents[child] = 'start';
    }

    // track nodes that have already been processed
    const processed = [];

    let node = this._lowestCostNodeDijkstra(costs, processed);

    while (node) {
      let cost = costs[node];
      let children = graph[node];
      for (let n in children) {
        let newCost = cost + children[n];
        if (!costs[n]) {
          costs[n] = newCost;
          parents[n] = node;
        }
        if (costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = this._lowestCostNodeDijkstra(costs, processed);
    }

    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
      distance: costs.finish,
      path: optimalPath
    };

    return results;
  };

  static getTotalDistanceBetween2Towns(townsGraph, towns) {
    let result = null;

    for (let index = 0; index < towns.length - 1; index++) {
      let currentTown = towns[index];
      let nextTown = towns[index + 1]

      if (!townsGraph[currentTown][nextTown]) {
        return 'NO SUCH ROUTE';
      }

      result += townsGraph[currentTown][nextTown];
    }

    return result;
  };

  static getShortestRoute(startingTown, endingTown, townsGraph) {
    let graphTownsProblem = Object.assign({}, townsGraph)
    graphTownsProblem.start = townsGraph[startingTown];
    delete graphTownsProblem[startingTown];
    delete graphTownsProblem[endingTown];
    graphTownsProblem[endingTown] = { finish: 0 };

    return this._dijkstra(graphTownsProblem).distance;
  }
}

const townsGraph = {
  A: { B: 5, D: 5, E: 7 },
  B: { C: 4 },
  C: { D: 8, E: 2 },
  D: { C: 8, E: 6 },
  E: { B: 3 }
};

console.log('1. The distance of the route A-B-C.');
console.log(`Output #1: ${TrainsProblem.getTotalDistanceBetween2Towns(townsGraph, ['A', 'B', 'C'])}`);
console.log('\n');

console.log('2. The distance of the route A-D.');
console.log(`Output #2: ${TrainsProblem.getTotalDistanceBetween2Towns(townsGraph, ['A', 'D'])}`);
console.log('\n');

console.log('3. The distance of the route A-D-C.');
console.log(`Output #2: ${TrainsProblem.getTotalDistanceBetween2Towns(townsGraph, ['A', 'D', 'C'])}`);
console.log('\n');

console.log('4. The distance of the route A-E-B-C-D.');
console.log(`Output #4: ${TrainsProblem.getTotalDistanceBetween2Towns(townsGraph, ['A', 'E', 'B', 'C', 'D'])}`);
console.log('\n');

console.log('5. The distance of the route A-E-D.');
console.log(`Output #5: ${TrainsProblem.getTotalDistanceBetween2Towns(townsGraph, ['A', 'E', 'D'])}`);
console.log('\n');

// console.log(`6. The number of trips starting at C and ending at C with a maximum of 3 stops. In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).`);
// console.log(`Output #6: ${getTotalTripsWithMaxStops(townsGraph, 'C', 'C', 0, 3)}`);

// console.log('\n');

// console.log(`The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).`);
// console.log(`Output #6: ${getTotalTripsWithMaxStops(townsGraph, 'A', 'C', 4, 4)}`);
// console.log('\n');

console.log(`7. The length of the shortest route (in terms of distance to travel) from A to C.`);
console.log(`Output #7: ${TrainsProblem.getShortestRoute('A', 'C', townsGraph)}`);
console.log('\n');

console.log(`8. The length of the shortest route (in terms of distance to travel) from B to B.`);
console.log(`Output #7: ${TrainsProblem.getShortestRoute('B', 'B', townsGraph)}`);
console.log('\n');

// console.log(`9. The number of different routes from C to C with a distance of less than 30.`);
// console.log(`Output #9: ${getShortestRoute('B', 'B', townsGraph)}`);
// console.log('\n');


