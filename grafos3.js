const townsGraph = {
    A: { B: 5, D: 5, E: 7 },
    B: { C: 4 },
    C: { D: 8, E: 2 },
    D: { C: 8, E: 6 },
    E: { B: 3 }
};

function getAllCombinationsOfTownRoutes(towns, routeLength, currentRoute) {
    if (currentRoute.length == routeLength) return [currentRoute];

    var newRoute = [];

    for (var i = 0; i < towns.length; i++) {
        newRoute.push.apply(newRoute, getAllCombinationsOfTownRoutes(towns, routeLength, currentRoute + towns[i]));
    }

    return newRoute;
}

function checkRouteValidity(townsGraph, route) {
    for (let townIndex = 0; townIndex < route.length - 1; townIndex++) {
        let currentTown = route[townIndex];
        let nextTown = route[townIndex + 1]

        if (!townsGraph[currentTown][nextTown]) {
            return false;
        }
    }

    return true;
}

function getTotalTripsWithMaximumStops(startingTown, endingTown, maximumStops, townsGraph) {
    let routes = [];

    for (let stops = maximumStops; stops <= maximumStops + 1; stops++) {
        const combinationOfRoutes = getAllCombinationsOfTownRoutes(Object.keys(townsGraph), stops, '')
            .filter(town => town.startsWith(startingTown) && town.endsWith(endingTown));

        routes = routes.concat(combinationOfRoutes);
    }

    let validRoutes = [];

    for (const route in routes) {
        if (checkRouteValidity(townsGraph, routes[route])) {
            validRoutes.push(routes[route]);
        }
    }

    return validRoutes.length;
}

function getTotalTripsWithExactlyStops(startingTown, endingTown, stops, townsGraph) {
    const routes = getAllCombinationsOfTownRoutes(Object.keys(townsGraph), stops + 1, '')
        .filter(town => town.startsWith(startingTown) && town.endsWith(endingTown));
    let validRoutes = [];

    for (const route in routes) {
        if (checkRouteValidity(townsGraph, routes[route])) {
            validRoutes.push(routes[route]);
        }
    }

    return validRoutes.length;
}

let towns = getTotalTripsWithMaximumStops('C', 'C', 3, townsGraph);


console.log(`Máximo 3: ${towns}`);

towns = getTotalTripsWithExactlyStops('A', 'C', 4, townsGraph);

console.log(`Exacly 4: ${towns}`);


