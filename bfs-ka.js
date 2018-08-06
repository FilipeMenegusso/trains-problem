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

function doBFSPredecessors(townsGraph, startingTown, endingTown) {
    let bfsInfo = [];

    for (let town = 0; town < townsGraph.length; town++) {
        bfsInfo[town] = {
            predecessors: []
        };
    }

    // bfsInfo[startingTown].predecessors.push({predecessor: null})

    let queue = new Queue();
    queue.enqueue(startingTown);

    while (!queue.isEmpty()) {
        const currentTown = queue.dequeue();

        
        for (let town = 0; town < townsGraph[currentTown].length; town++) {
            const newTown = townsGraph[currentTown][town];
            if (newTown === endingTown) {
                console.log(newTown);
            }
            if (!bfsInfo[currentTown].predecessors.some(predecessor => predecessor.predecessor === newTown)) {
                if (!bfsInfo[newTown].predecessors.some(predecessor => predecessor.predecessor === currentTown)) {
                    queue.enqueue(newTown);
                    
                     bfsInfo[newTown].predecessors.push({ predecessor: currentTown, distance: 1 });
                } else {
                    const teste = '';
                }
            } else {
                const teste = '';
                let index = bfsInfo[currentTown].predecessors.findIndex(p => {return p.predecessor === newTown});
                bfsInfo[currentTown].predecessors[index].distance++;
            }
        }
    }

    return bfsInfo;
};

function doBFS2(townsGraph, startingTown, endingTown) {
    let bfsInfo = [];
    let teste = 0;

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
            if (newTown === endingTown) {
                console.log(newTown);
            }

            if (bfsInfo[newTown].distance === null) {
                queue.enqueue(newTown);
                bfsInfo[newTown].predecessor = currentTown;
                bfsInfo[newTown].distance = bfsInfo[currentTown].distance + 1;
            }
        }
    }

    return teste;
};

const townsList = [
    [1], // 0 - A
    [0, 4, 5], // 1 - B 
    [4, 5], // 2 - C
    [2, 6], // 3 - D
    [1, 3], // 4 - E
    [1], // 5 - F
    [ 3, 5], // 6 = G
    []
];

const bfsInfo = doBFSPredecessors(townsList, 3, 3);
console.log(bfsInfo);

// for (let i = 0; i < townsList.length; i++) {
//     console.log("vertex " + i + ": distance = " + bfsInfo[i].distance + ", predecessor = " + bfsInfo[i].predecessor);
// }



