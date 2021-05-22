import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const { PI } = Math;

console.log(`OrbitControls`, OrbitControls);
const sizes = {
  width: 800,
  height: 400,
};

const cursor = {
  x: 0,
  y: 0,
};
//* * Canvas
const canvas = document.querySelector(".webgl");

const mousemouve = addEventListener("mousemove", ({ x, y }) => {
  cursor.x = x / sizes.width - 0.5;
  cursor.y = 0.5 - y / sizes.height;
  console.table(`event`, [cursor.x, cursor.y]);
});

//* * Scene
const scene = new THREE.Scene();
// Group

const group = new THREE.Group();

// * * Cube A

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xd04030 });
const cube1 = new THREE.Mesh(geometry1, material1);

// ** Add Scene

scene.add(cube1);

//* * Sizes

//* * Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// ** Controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.keys = {
  LEFT: "ArrowLeft", //left arrow
  UP: "ArrowUp", // up arrow
  RIGHT: "ArrowRight", // right arrow
  BOTTOM: "ArrowDown", // down arrow
};
//* *Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// * * Time

// let time = Date.now();
const clock = new THREE.Clock();
// * * Animations

const tick = () => {
  //
  const elapsedTime = clock.getElapsedTime();

  // camera.position.x = Math.cos(cursor.x * PI * 2) * 5;
  // camera.position.z = Math.sin(cursor.x * PI * 2) * 5;
  // camera.position.y = cursor.y * 10;
  // camera.lookAt(cube1.position);
  //Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
