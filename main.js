import "./style.css";
import * as THREE from "three";
const { PI } = Math;
//* * Canvas
const canvas = document.querySelector(".webgl");
//* * Scene
const scene = new THREE.Scene();
// Group

const group = new THREE.Group();

// * * Cube A

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xd04030 });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.random();

// ** Add Scene

scene.add(cube1);

cube1.translateX(2);

// * * Axes Helper

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

//* * Sizes

const sizes = {
  width: 800,
  height: 400,
};

//* * Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 10;
camera.position.x = 1;
scene.add(camera);

//* *Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// * * Time

let time = Date.now();
// * * Animations

const tick = () => {
  const currentTime = Date.now();
  const delta = currentTime - time;
  time = currentTime;
  // * * Update cube
  cube1.rotation.x += 0.001 * delta;
  cube1.rotation.y += 0.001 * delta;
  // cube1.rotation.z += 0.01;
  // camera.position.z -= 0.01;

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
