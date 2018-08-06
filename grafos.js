class Queue {
  constructor() {
    this.items = [];
    this.firstItem = null;
  }

  enqueue(obj) {
    this.items.push(obj);
    this.firstItem = this.items[0];
  };

  dequeue() {
    let dequeuedItem = this.items.shift();

    this.firstItem = this.items.length ? this.items[this.items.length - 1] : null;

    return dequeuedItem;
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

const townsGraph = {
  A: { B: 5, D: 5, E: 7 },
  B: { C: 4 },
  C: { D: 8, E: 2 },
  D: { C: 8, E: 6 },
  E: { B: 3 }
};

function getNumberTripsWithMaxStops(townsGraph, startingTown, endingTown, maxStops) {
  let quantidade = 0;

  if (Object.keys(townsGraph).length) {
    let processedTownsAfterBFS = [];

    let queue = new Queue();

    for (let town in townsGraph[startingTown]) {
      queue.push({
        stops: 1,
        currentTown: town
      });
    }

    if (queue.items.length) {
      while (!queue.isEmpty()) {
        for (const newTown in townsGraph[queue.firstItem.currentTown]) {
          queue.firstItem.stops++;

          if (newTown != endingTown) {
            queue.firstItem.currentTown = newTown;
          } else {
            queue.dequeue();
          }
        }

        // const currentTown = queue.dequeue();



        // for (let newTown in townsGraph[currentTown.currentTown]) {
        //   if (processedTownsAfterBFS.stops <= maxStops) {
        //     queue.enqueue(newTown);
        //     processedTownsAfterBFS[newTown].currentTown = currentTown;
        //     processedTownsAfterBFS[newTown].stops = processedTownsAfterBFS[currentTown].stops + 1;
        //   }
        // }
      }

      const teste = '';
    }
  }

  return quantidade;
};

function getTotalDistanceFromTowns(townsGraph, towns) {
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


// const processedTownsAfterBFS = doBFS(townsGraph, 'D');

console.log('1. The distance of the route A-B-C.');
console.log(`Output #1: ${getTotalDistanceFromTowns(townsGraph, ['A', 'B', 'C'])}`);
console.log('\n');

console.log('2. The distance of the route A-D.');
console.log(`Output #2: ${getTotalDistanceFromTowns(townsGraph, ['A', 'D'])}`);
console.log('\n');

console.log('3. The distance of the route A-D-C.');
console.log(`Output #2: ${getTotalDistanceFromTowns(townsGraph, ['A', 'D', 'C'])}`);
console.log('\n');

console.log('4. The distance of the route A-E-B-C-D.');
console.log(`Output #4: ${getTotalDistanceFromTowns(townsGraph, ['A', 'E', 'B', 'C', 'D'])}`);
console.log('\n');

console.log('5. The distance of the route A-E-D.');
console.log(`Output #5: ${getTotalDistanceFromTowns(townsGraph, ['A', 'E', 'D'])}`);
console.log('\n');

console.log(`6. The number of trips starting at C and ending at C with a maximum of 3 stops. In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).`);
console.log(`Output #6: ${getNumberTripsWithMaxStops(townsGraph, 'C', 'C', 3)}`);
console.log('\n');

