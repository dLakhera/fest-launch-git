import { PerspectiveCamera } from './../../node_modules/three/build/three.module.js';
function createCamera(container){
    const camera = new PerspectiveCamera(75,container.clientWidth/container.clientHeight,10,1000);
    camera.position.set(100,100,100);
    
    camera.rotation.set(0,0,0)
    return camera;
}
export {createCamera};