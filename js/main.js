import {World} from './World.js';
async function main(){

    const container = document.getElementById("c");

    const world = new World(container);

    await world.init();

    world.start();
}

main().catch((err) => {
    console.error(err);
  });
  