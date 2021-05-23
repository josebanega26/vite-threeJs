import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const { PI } = Math;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};
//* * Canvas
const canvas = document.querySelector(".webgl");

const mousemove = addEventListener("mousemove", ({ x, y }) => {
  cursor.x = x / sizes.width - 0.5;
  cursor.y = 0.5 - y / sizes.height;
  //** Update camera
});

const resize = addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const dbclick = addEventListener("dblclick", (event) => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//* * Scene
const scene = new THREE.Scene();
// Group

// * * Cube A

// const geometry1 = new THREE.BoxGeometry(1, 1, 1, 3, 4, 1);

// ! Crazy triangles
const counter = 20;
const arrayOfpoints = [];
for (let i = 0; i < counter * 3 * 3; i++) {
  arrayOfpoints.push((Math.random() - 0.5) * 5);
}
console.log(`arrayOfpoints`, arrayOfpoints);
//  * * Geometry

const positionsArray = new Float32Array(arrayOfpoints);

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);

const material1 = new THREE.MeshBasicMaterial({
  color: 0xd04030,
  wireframe: true,
});
const cube1 = new THREE.Mesh(geometry, material1);

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

//* *Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
