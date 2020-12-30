import { WebGLRenderer } from './../../node_modules/three/build/three.module.js';

function createRenderer(container){
    const renderer = new WebGLRenderer({antialias:true,alpha:true});
    renderer.setClearColor(0x000000,0);
    renderer.setPixelRatio(container.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.physicallyCorrectLights = true;

    return renderer;
}

export{createRenderer};