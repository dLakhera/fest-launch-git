import * as THREE from "./../../node_modules/three/build/three.module.js"

function centerMethod(data) {
    const box = new THREE.Box3().setFromObject(data);
    const center = box.getCenter(new THREE.Vector3());

    data.position.x += (data.position.x - center.x);
    data.position.y += (data.position.y - center.y);
    data.position.z += (data.position.z - center.z);

    return data;
}

export { centerMethod }