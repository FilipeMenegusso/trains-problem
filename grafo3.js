

const townsGraph = {
    A: { B: 5, D: 5, E: 7 },
    B: { C: 4 },
    C: { D: 8, E: 2 },
    D: { C: 8, E: 6 },
    E: { B: 3 }
};


var combinations = function (string) {
    var result = [];

    var loop = function (start, depth, prefix) {
        for (var i = start; i < string.length; i++) {
            var next = prefix + string[i];
            if (depth > 0)
                loop(i + 1, depth - 1, next);
            else
                result.push(next);
        }
    }

    for (var i = 0; i < string.length; i++) {
        loop(0, i, '');
    }

    return result;
}



//and strings
// show(combinations("ABCDE"));

function show(arr) {
    arr.forEach(function (p) {
        console.log("[" + p.join(",") + "]");
    });
}
// printAllPaths('A', 'C', townsGraph);

// const adjList = getAdjList(townsGraph);
// console.log(adjList);

// const processedTownsAfterBFS = doBFS(townsGraph, 'A');

// for (let town in townsGraph) {
//     console.log("vertex " + town + ": distance = " + processedTownsAfterBFS[town].distance + ", predecessor = " + processedTownsAfterBFS[town].predecessor);
// }

function getAllCombinationsOfTowns(input, length, curstr) {
    if (curstr.length == length) return [curstr];
    var ret = [];
    for (var i = 0; i < input.length; i++) {
        ret.push.apply(ret, getAllCombinationsOfTowns(input, length, curstr + input[i]));
    }
    return ret;
}

function checkValidityRoute(townsGraph, route) {
    for (let index = 0; index < route.length - 1; index++) {
        let currentTown = route[index];
        let nextTown = route[index + 1]
  
        if (!townsGraph[currentTown][nextTown]) {
          return false;
        }
      }

    return true;
}

function getTotalTripsWithMaximumStops(startingTown, endingTown, maximumStops, townsGraph) {
    let towns = [];

    for (let stops = maximumStops; stops <= maximumStops + 1; stops++) {
        const teste = getAllCombinationsOfTowns(Object.keys(townsGraph), stops, '').filter(town => town.startsWith(startingTown) && town.endsWith(endingTown));
        towns = towns.concat(teste);
    }

    let cidadesValidas = [];

    for (const town in towns) {
        if (checkValidityRoute(townsGraph, towns[town].split(''))) {
            cidadesValidas.push(towns[town]);
        }
    }

    return cidadesValidas;
}

function getTotalTripsWithExactlyStops(startingTown, endingTown, stops, townsGraph) {
    const towns = getAllCombinationsOfTowns(Object.keys(townsGraph), stops + 1, '').filter(town => town.startsWith(startingTown) && town.endsWith(endingTown));
    let cidadesValidas = [];

    for (const town in towns) {
        if (checkValidityRoute(townsGraph, towns[town].split(''))) {
            cidadesValidas.push(towns[town]);
        }
    }

    return cidadesValidas;
}

let towns = getTotalTripsWithMaximumStops('C', 'C', 3, townsGraph);


console.log(`Máximo 3: ${towns}`);

towns = getTotalTripsWithExactlyStops('A', 'C', 4, townsGraph);



console.log(`Exacly 4: ${towns}`);

// var input = ['A', 'B', 'C', 'D', 'E'];
// const teste = allPossibleCombinations(input, 4, '').filter(town => town.startsWith('C'));
// console.log(teste);


