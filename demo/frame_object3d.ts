import * as THREE from "three";
import { AmbientLight, DirectionalLight, DirectionalLightHelper, Object3D, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import FrameObject3D from './../src/frame_object3d';
import GUI from "lil-gui";

const canvas = document.querySelector("#three") as HTMLElement;
const scene = new THREE.Scene();


const directionalLight = new DirectionalLight(0xffffff, 1.0);
directionalLight.position.z = 3;
directionalLight.target.position.copy(new Vector3(1,0,0));
directionalLight.target.updateMatrixWorld();
// scene.add(new DirectionalLightHelper(directionalLight, 3))
scene.add(directionalLight)
scene.add(new AmbientLight(0xffffff, 0.3))


const geometry0 = new THREE.BoxGeometry(1, 1, 1);
const material0 = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
const mesh0 = new THREE.Mesh(geometry0, material0);

const geometry1 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material1 = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});
const mesh1 = new THREE.Mesh(geometry1, material1);

const geometry2 = new THREE.BoxGeometry(2, 2, 2);
const material2 = new THREE.MeshStandardMaterial({
    color: 0x0000ff
});
const mesh2 = new THREE.Mesh(geometry2, material2);

const frameObject = new FrameObject3D();
frameObject.addFrame(0, mesh0);
frameObject.addFrame(1, mesh1);
frameObject.addFrame(2, mesh2);
frameObject.setFrame(0)
scene.add(frameObject);

const gui = new GUI();
gui.add({ frame: 0 }, "frame", 0, 2, 1).onChange((frame: number) => {
    frameObject.setFrame(frame);
    console.log(`called ${frame}`)
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 3;
camera.position.x = 2;
camera.position.y = 1;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();