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
    let bfsInfo = [];

    for (let town = 0; town < townsGraph.length; town++) {
        bfsInfo[town] = {
            distance: null,
            predecessor: null
        };
    }

    bfsInfo[startingTown].distance = 0;

    let queue = new Queue();
    queue.enqueue(startingTown);

    while (!queue.isEmpty()) {
        const currentTown = queue.dequeue();

        for (let town = 0; town < townsGraph[currentTown].length; town++) {
            const newTown = townsGraph[currentTown][town];

            if (bfsInfo[newTown].distance === null) {
                queue.enqueue(newTown);
                bfsInfo[newTown].predecessor = currentTown;
                bfsInfo[newTown].distance = bfsInfo[currentTown].distance + 1;
            }
        }
    }

    return bfsInfo;
};


const townsList = [
    [1], // 0 - A
    [0, 4, 5], // 1 - B 
    [3, 4, 5], // 2 - C
    [2, 6], // 3 - D
    [1, 2], // 4 - E
    [1, 2, 6], // 5 - F
    [3, 5], // 6 = G
    []
];

const bfsInfo = doBFS(townsList, 3);

for (let i = 0; i < townsList.length; i++) {
    console.log("vertex " + i + ": distance = " + bfsInfo[i].distance + ", predecessor = " + bfsInfo[i].predecessor);
}



