import { OrbitControls } from './../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from './../../node_modules/three/examples/jsm/controls/TrackballControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    // const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.minPolarAngle = 1;
    controls.maxPolarAngle = 1;
    controls.maxDistance = 120;
    controls.minDistance = 60;
    // forward controls.update to our custom .tick method
    controls.tick = () => controls.update();
    
    return controls;
}

export { createControls };
