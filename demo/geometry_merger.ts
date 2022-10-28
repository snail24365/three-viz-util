import * as THREE from "three";
import {
    AmbientLight,
    BoxGeometry,
    BufferAttribute,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    Object3D,
    Vector3
} from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import _ from "lodash";

import GeometryMerger from '../src/geometry_merger';
const leftCanvas = document.querySelector("#leftCanvas") as HTMLElement;
const rightCanvas = document.querySelector("#rightCanvas") as HTMLElement;

const leftScene = new THREE.Scene();
const rightScene = new THREE.Scene();

const leftDirectionalLight = new DirectionalLight(0xffffff, 1.0);
leftDirectionalLight.position.z = 3;
leftDirectionalLight.target.position.copy(new Vector3(1, 0, 0));
leftDirectionalLight.target.updateMatrixWorld();
leftScene.add(leftDirectionalLight)
leftScene.add(new AmbientLight(0xffffff, 0.3))

const rightDirectionalLight = new DirectionalLight(0xffffff, 1.0);
rightDirectionalLight.position.z = 3;
rightDirectionalLight.target.position.copy(new Vector3(1, 0, 0));
rightDirectionalLight.target.updateMatrixWorld();
rightScene.add(rightDirectionalLight)
rightScene.add(new AmbientLight(0xffffff, 0.3))


const gui = new GUI();
const geometryCount = 20000;
const massiveMeshCollection = new Object3D();
for (const __ of _.range(0, geometryCount)) {
    const color = new THREE.Color(0xffffff);
    color.setHex(Math.random() * 0xffffff);
    const mesh = new Mesh(new BoxGeometry(0.01, 0.01, 0.01), new MeshPhongMaterial({
            color
    }));    
    
    mesh.position.x += (Math.random() - 1) * 2;
    mesh.position.y += (Math.random() - 1) * 2;
    mesh.position.z += (Math.random() - 1) * 2;
    
    massiveMeshCollection.add(mesh)
}
leftScene.add(massiveMeshCollection);

const massiveMeshCollection2 = new Object3D();
for (const __ of _.range(0, geometryCount)) {
    const color = new THREE.Color(0xffffff);
    color.setHex(Math.random() * 0xffffff);
    const mesh = new Mesh(new BoxGeometry(0.01, 0.01, 0.01), new MeshPhongMaterial({
            color
    }));    
    mesh.position.x += (Math.random() - 1) * 2;
    mesh.position.y += (Math.random() - 1) * 2;
    mesh.position.z += (Math.random() - 1) * 2;
    
    const vertexColor = [color.r, color.g, color.b];
    const colors:number[][] = []
    for (let i = 0; i < mesh.geometry.getAttribute("position").count; i++) {
        colors.push(vertexColor)
    }
    mesh.geometry.setAttribute("color", new BufferAttribute(new Float32Array(colors.flat()), 3))
    massiveMeshCollection2.add(mesh)
}
const mergedModel = new GeometryMerger().merge(massiveMeshCollection2);
rightScene.add(mergedModel);



const sizes = {
    width: window.innerWidth / 2,
    height: window.innerHeight,
};

const leftCamera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
leftCamera.position.copy(new Vector3(1, 1, 1)); 

const rightCamera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
rightCamera.position.copy(new Vector3(1, 1, 1)); 


const leftControls = new OrbitControls(leftCamera, leftCanvas);
leftControls.enableDamping = true;

const rightControls = new OrbitControls(rightCamera, rightCanvas);
rightControls.enableDamping = true;


const leftRenderer = new THREE.WebGLRenderer({
    canvas: leftCanvas,
});
leftRenderer.setSize(sizes.width, sizes.height);
leftRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const rightRenderer = new THREE.WebGLRenderer({
    canvas: rightCanvas,
});
rightRenderer.setSize(sizes.width, sizes.height);
rightRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


leftControls.update();
leftRenderer.render(leftScene, leftCamera);

rightControls.update();
rightRenderer.render(rightScene, rightCamera);

// Animate
let currentRenderer = leftRenderer;
let currentContorls = leftControls;
let currentScene = leftScene;
let currentCamera = leftCamera;
const tick = () => {
    currentContorls.update();
    currentRenderer.render(currentScene, currentCamera);
    window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("mousemove", (e) => {
    const isLeftSide = e.pageX / window.innerWidth <= 0.5;
    currentRenderer = isLeftSide ? leftRenderer : rightRenderer;
    currentContorls = isLeftSide ? leftControls : rightControls;
    currentScene = isLeftSide ? leftScene : rightScene;
    currentCamera = isLeftSide ? leftCamera : rightCamera;
});