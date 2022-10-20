import * as THREE from "three";
import { AmbientLight, DirectionalLight, DirectionalLightHelper, Object3D, Vector3 } from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";


const canvas = document.querySelector("#three") as HTMLElement;
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});

const directionalLight = new DirectionalLight(0xffffff, 1.0);
directionalLight.position.z = 3;
directionalLight.target.position.copy(new Vector3(1,0,0));
directionalLight.target.updateMatrixWorld();
scene.add(new DirectionalLightHelper(directionalLight, 3))
scene.add(directionalLight)
scene.add(new AmbientLight(0xffffff, 0.3))

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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