import { GLTFLoader } from './../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from './../../node_modules/three/build/three.module.js';
import { centerMethod } from "./../systems/Utils.js"
import { setupModel } from './setupModel.js';

async function loadCar() {
    const loader = new GLTFLoader();

    // const carData = await loader.loadAsync('./../assets/truck/scene.gltf');
    const carData = await loader.loadAsync('assets/medievalBook/scene.gltf');

    var car = setupModel(carData);
    car = centerMethod(car);
    car.position.y += 10;

    var radiansPerSecond = Math.PI / 12;
    const model = carData.scene.children[0];
    const clip = carData.animations[0];

    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();
    car.tick = (delta) => {
        mixer.update(delta);
        car.rotation.z += radiansPerSecond * delta;
        if (car.rotation.z >= Math.PI - 0.001) radiansPerSecond = -radiansPerSecond;
        else if (car.rotation.z < -Math.PI + 0.001) radiansPerSecond = -radiansPerSecond;
        // car.rotation.x += radiansPerSecond * delta;
        // car.rotation.y -= radiansPerSecond * delta;
        //console.debug(car.rotation.x + "i " + car.rotation.y + "j " + car.rotation.z + "k ");
    };
    return car;
}

export { loadCar };