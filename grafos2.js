class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(obj) {
        this.items.push(obj);
    };

    dequeue() {
        return this.items.shift();
    };

    isEmpty() {
        return this.items.length === 0;
    };
}

function doBFS(townsGraph, startingTown) {
    let processedTownsAfterBFS = [];

    for (let town in townsGraph) {
        processedTownsAfterBFS[town] = {
            distance: null,
            predecessor: null,
            sucessor: null
        };
    }

    processedTownsAfterBFS[startingTown].distance = 0;

    let queue = new Queue();
    queue.enqueue(startingTown);

    while (!queue.isEmpty()) {
        const currentTown = queue.dequeue();

        for (let newTown in townsGraph[currentTown]) {

            if (newTown === 'C') {
                debugger;
                processedTownsAfterBFS[currentTown].sucessor = newTown;
                processedTownsAfterBFS[newTown].distance = processedTownsAfterBFS[currentTown].distance + 1
            }

            if (processedTownsAfterBFS[newTown].distance === null) {
                queue.enqueue(newTown);
                processedTownsAfterBFS[newTown].predecessor = currentTown;
                processedTownsAfterBFS[newTown].distance = processedTownsAfterBFS[currentTown].distance + 1;
            }
        }
    }

    return processedTownsAfterBFS;
};


function getAdjList(townsGraph) {
    let adjList = {};

    for (const town in townsGraph) {
        adjList[town] = {};
    }

    return adjList;
}

function getAllPaths(townsGraph) {
    const vertices = Object.keys(townsGraph).length;
    let adjList = [];


}


// const townsList = [
//     [1], // 0 - A (B)
//     [0, 4, 5], // 1 - B  (A, E, F)
//     [3, 4, 5], // 2 - C (D, E, F)
//     [2, 6], // 3 - D (C, G)
//     [1, 2], // 4 - E (B, C)
//     [1, 2, 6], // 5 - F (B, C, G)
//     [3, 5], // 6 = G (D, F)
//     []
// ];

function printAllPaths(startingTown, endingTown, townsGraph) {
    let isVisited = [];
    let pathList = [];

    //add source to path[]
    pathList[startingTown] = {};

    //Call recursive utility
    printAllPathsUtil(startingTown, endingTown, isVisited, pathList, townsGraph);
}

function printAllPathsUtil(u, d, isVisited, localPathList, townsGraph) {
    // Mark the current node
    isVisited[u] = true;

    if (u === d) {
        console.log(localPathList);
    }

    // Recur for all the vertices
    // adjacent to current vertex
    for (const i in townsGraph[u]) {
        if (!isVisited[i]) {
            // store current node 
            // in path[]
            localPathList[i] = {};
            printAllPathsUtil(i, d, isVisited, localPathList, townsGraph);

            // remove current node
            // in path[]
            delete localPathList[i];
        }
    }

    // Mark the current node
    isVisited[u] = false;
}


function getAllCombinationsOfTowns(text) {
    var results = [];
    for (var i = 0; i < text.length; i++) {
        // Record size as the list will change
        var resultsLength = results.length;
        for (var j = 0; j < resultsLength; j++) {
            results.push(text[i] + results[j]);
        }
        results.push(text[i]);
    }
    return results;
}


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

function permute(str) {

    var ret = [];

    // permutation for one or two characters string is easy:
    // 'a'  -> ['a']
    // 'ab' -> ['ab', 'ba']
    if (str.length == 1) return [str];
    if (str.length == 2) return [str, str[1] + str[0]];

    // otherwise combine each character with a permutation
    // of a subset of the string. e.g. 'abc':
    //
    // 'a' + permutation of 'bc'
    // 'b' + permutation of 'ac'
    // 'c' + permutation of 'ab'
    str.split('').forEach(function (chr, idx, arr) {
        var sub = [].concat(arr); // "clone" arr
        sub.splice(idx, 1);
        permute(sub.join('')).forEach(function (perm) {
            ret.push(chr + perm);
        });
    });

    return ret;
}

function allPossibleCases(arr) {
    if (arr.length == 1) {
        return arr[0];
    } else {
        var result = [];
        var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
        for (var i = 0; i < allCasesOfRest.length; i++) {
            for (var j = 0; j < arr[0].length; j++) {
                result.push(arr[0][j] + allCasesOfRest[i]);
            }
        }
        return result;
    }

}

var combinations = function (set) {
    return (function acc(xs, set) {
        var x = xs[0];
        if (typeof x === "undefined")
            return set;
        for (var i = 0, l = set.length; i < l; ++i)
            set.push(set[i].concat(x));
        return acc(xs.slice(1), set);
    })(set, [[]]).slice(1);
};


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


