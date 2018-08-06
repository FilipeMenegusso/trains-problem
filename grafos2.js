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
            predecessor: null
        };
    }

    processedTownsAfterBFS[startingTown].distance = 0;

    let queue = new Queue();
    queue.enqueue(startingTown);

    while (!queue.isEmpty()) {
        const currentTown = queue.dequeue();

        for (let newTown in townsGraph[currentTown]) {
            if (processedTownsAfterBFS[newTown].distance === null) {
                queue.enqueue(newTown);
                processedTownsAfterBFS[newTown].predecessor = currentTown;
                processedTownsAfterBFS[newTown].distance = processedTownsAfterBFS[currentTown].distance + 1;
            }
        }
    }

    return processedTownsAfterBFS;
};


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

const townsGraph = {
    A: { B: 1 },
    B: { A: 1, E: 1, F: 1 },
    C: { D: 1, E: 1, F: 1 },
    D: { C: 1, G: 1 },
    E: { B: 1, C: 1 },
    F: { B: 1, C: 1, G: 1 },
    G: { D: 1, F: 1 }
};

const processedTownsAfterBFS = doBFS(townsGraph, 'D');

for (let town in townsGraph) {
    console.log("vertex " + town + ": distance = " + processedTownsAfterBFS[town].distance + ", predecessor = " + processedTownsAfterBFS[town].predecessor);
}



