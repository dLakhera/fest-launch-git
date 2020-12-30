import { createCamera } from './create/camera.js';
import { createLights } from './create/lights.js';
import { loadCar } from './create/loadCar.js';
import { createScene } from './create/scene.js';

import { Loop } from './systems/Loop.js';
import { Resizer } from './systems/Resizer.js';
import { createRenderer } from './systems/renderer.js';
import { createControls } from './systems/controls.js';

import * as THREE from './../node_modules/three/build/three.module.js';

let camera, controls, renderer, scene, loop,car;

class World {

    constructor(container) {
        camera = createCamera(container);
        renderer = createRenderer(container);
        scene = createScene();
        loop = new Loop(camera, scene, renderer);

        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);

        const { ambientLight, mainLight } = createLights();
        scene.add(new THREE.AxesHelper(5));
        loop.updatables.push(controls);
        scene.add(ambientLight, mainLight);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {
        car = await loadCar();
        scene.add(car);
        loop.updatables.push(car);

        window.addEventListener("mousemove",(event)=>{
            car.rotation.x = (0.5)*event.clientY/window.innerHeight - 2 ;
            //car.rotation.z = Math.PI - (2*Math.PI)*event.clientX/window.innerWidth;
        });

    }

    render() {
        renderer.render(scene, camera);
    }
    start() {
        loop.start(car);
    }
    stop() {
        loop.stop();
    }
}

export { World };