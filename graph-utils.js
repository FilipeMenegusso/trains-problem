'use strict'

class GraphUtils {
  constructor() {
    this.getTotalDistanceBetween2Towns = (townsGraph, towns) => {
      let result = null;

      for (let index = 0; index < towns.length - 1; index++) {
        let currentTown = towns[index];
        let nextTown = towns[index + 1]

        if (!townsGraph[currentTown][nextTown]) {
          return null;
        }

        result += townsGraph[currentTown][nextTown];
      }

      return result;
    };

    this.getShortestRoute = (startingTown, endingTown, townsGraph) => {
      let graphTownsProblem = Object.assign({}, townsGraph)
      graphTownsProblem.start = townsGraph[startingTown];
      delete graphTownsProblem[startingTown];
      delete graphTownsProblem[endingTown];
      graphTownsProblem[endingTown] = { finish: 0 };

      return self._dijkstra(graphTownsProblem).distance;
    }

    this.getTotalTripsWithMaximumStops = (startingTown, endingTown, maximumStops, townsGraph) => {
      let routes = [];

      for (let stops = 1; stops < maximumStops + 1; stops++) {
        const combinationOfRoutes = self._getCombinationsOfTownRoutes(Object.keys(townsGraph), stops, startingTown)
          .filter(town => town.startsWith(startingTown) && town.endsWith(endingTown));

        routes = routes.concat(combinationOfRoutes);
      }

      let validRoutes = [];

      for (const route in routes) {
        if (self._checkRouteValidity(townsGraph, routes[route])) {
          validRoutes.push(routes[route]);
        }
      }

      return validRoutes.length;
    };

    this.getTotalTripsWithMaximumDistance = (startingTown, endingTown, distance, townsGraph) => {
      let routes = [];

      for (let stops = 1; stops < distance + 1; stops++) {
        const combinationOfRoutes = self._getCombinationsOfTownRoutesDistance(townsGraph, Object.keys(townsGraph), distance, startingTown)
          .filter(town => town.startsWith(startingTown) && town.endsWith(endingTown));

        routes = routes.concat(combinationOfRoutes);
      }

      let validRoutes = [];

      for (const route in routes) {
        if (self._checkRouteValidity(townsGraph, routes[route])) {
          validRoutes.push(routes[route]);
        }
      }

      return validRoutes;
    };

    this.getTotalTripsWithExactlyStops = (startingTown, endingTown, stops, townsGraph) => {
      const routes = self._getCombinationsOfTownRoutes(Object.keys(townsGraph), stops, '')
        .filter(town => town.startsWith(startingTown) && town.endsWith(endingTown));
      let validRoutes = [];

      for (const route in routes) {
        if (self._checkRouteValidity(townsGraph, routes[route])) {
          validRoutes.push(routes[route]);
        }
      }

      return validRoutes.length;
    };

    self = this;
  }

  _lowestCostNodeDijkstra(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  };

  _dijkstra(townsGraph) {
    // track lowest cost to reach each node
    const costs = Object.assign({ finish: Infinity }, townsGraph.start);

    // track paths
    const parents = { finish: null };
    for (let town in townsGraph.start) {
      parents[town] = 'start';
    }

    // track nodes that have already been processed
    const townsVisited = [];

    let node = this._lowestCostNodeDijkstra(costs, townsVisited);

    while (node) {
      let cost = costs[node];
      let children = townsGraph[node];
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
      townsVisited.push(node);
      node = this._lowestCostNodeDijkstra(costs, townsVisited);
    }

    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();

    const lowestRoute = {
      distance: costs.finish,
      path: optimalPath
    };

    return lowestRoute;
  };

  _getCombinationsOfTownRoutes(towns, routeLength, currentRoute) {
    if (currentRoute.length > routeLength) return [currentRoute];

    var newRoute = [];

    for (var i = 0; i < towns.length; i++) {
      newRoute.push.apply(newRoute, this._getCombinationsOfTownRoutes(towns, routeLength, currentRoute + towns[i]));
    }

    return newRoute;
  };

  _getCombinationsOfTownRoutesDistance(townsGraph, towns, maximumDistance, currentRoute) {
    // if (currentRoute.length >= 2) {
    //   if (!this._checkRouteValidity(townsGraph, currentRoute)) {
    //     const nextTown = towns.findIndex(town => town === currentRoute.split('')[currentRoute.length - 1]) + 1;
    //     return [currentRoute.split('')[currentRoute.length - 1] + towns[nextTown]];
    //   }
    // }

    const distance = this.getTotalDistanceBetween2Towns(townsGraph, currentRoute.split(''));


    if (distance && distance < maximumDistance) {
      return [currentRoute];
    }

    var newRoute = [];

    for (var i = 0; i < towns.length; i++) {
      if (this._checkRouteValidity(townsGraph, currentRoute + towns[i]) && this.getTotalDistanceBetween2Towns(townsGraph, currentRoute + towns[i])) {
        newRoute.push.apply(newRoute, this._getCombinationsOfTownRoutesDistance(townsGraph, towns, maximumDistance, currentRoute + towns[i]));
      }
    }

    return newRoute;
  };

  _checkRouteValidity(townsGraph, route) {
    for (let townIndex = 0; townIndex < route.length - 1; townIndex++) {
      let currentTown = route[townIndex];
      let nextTown = route[townIndex + 1]

      if (!townsGraph[currentTown][nextTown]) {
        return false;
      }
    }

    return true;
  };
}

const townsGraph = {
  A: { B: 5, D: 5, E: 7 },
  B: { C: 4 },
  C: { D: 8, E: 2 },
  D: { C: 8, E: 6 },
  E: { B: 3 }
};

var graphUtils = new GraphUtils();

// console.log('1. The distance of the route A-B-C.');
// console.log(`Output #1: ${graphUtils.getTotalDistanceBetween2Towns(townsGraph, ['A', 'B', 'C'])}`);
// console.log('\n');

// console.log('2. The distance of the route A-D.');
// console.log(`Output #2: ${graphUtils.getTotalDistanceBetween2Towns(townsGraph, ['A', 'D'])}`);
// console.log('\n');

// console.log('3. The distance of the route A-D-C.');
// console.log(`Output #2: ${graphUtils.getTotalDistanceBetween2Towns(townsGraph, ['A', 'D', 'C'])}`);
// console.log('\n');

// console.log('4. The distance of the route A-E-B-C-D.');
// console.log(`Output #4: ${graphUtils.getTotalDistanceBetween2Towns(townsGraph, ['A', 'E', 'B', 'C', 'D'])}`);
// console.log('\n');

// console.log('5. The distance of the route A-E-D.');
// console.log(`Output #5: ${graphUtils.getTotalDistanceBetween2Towns(townsGraph, ['A', 'E', 'D'])}`);
// console.log('\n');

// console.log(`6. The number of trips starting at C and ending at C with a maximum of 3 stops. In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).`);
// console.log(`Output #6: ${graphUtils.getTotalTripsWithMaximumStops('C', 'C', 3, townsGraph)}`);
// console.log('\n');

// console.log(`6. The number of trips starting at C and ending at C with a maximum of 3 stops. In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).`);
// console.log(`Output #6: ${graphUtils.getTotalTripsWithMaximumStops2('C', 'C', 3, townsGraph)}`);
// console.log('\n');

// console.log(`The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).`);
// console.log(`Output #6: ${graphUtils.getTotalTripsWithExactlyStops('A', 'C', 4, townsGraph)}`);
// console.log('\n');

// console.log(`7. The length of the shortest route (in terms of distance to travel) from A to C.`);
// console.log(`Output #7: ${graphUtils.getShortestRoute('A', 'C', townsGraph)}`);
// console.log('\n');

// console.log(`8. The length of the shortest route (in terms of distance to travel) from B to B.`);
// console.log(`Output #7: ${graphUtils.getShortestRoute('B', 'B', townsGraph)}`);
// console.log('\n');

// console.log(`9. The number of different routes from C to C with a distance of less than 30.`);
// console.log(`Output #9: ${graphUtils.getShortestRoute('B', 'B', townsGraph)}`);
// console.log('\n');

// graphUtils._getAllCombinationsOfTownRoutes(townsGraph, Object.keys(townsGraph), 30, '');

// console.log(graphUtils.teste.filter(route => route.startsWith('C') && route.endsWith('C')));


var teste = graphUtils.getTotalTripsWithMaximumDistance('C', 'C', 30, townsGraph);
console.log(teste);