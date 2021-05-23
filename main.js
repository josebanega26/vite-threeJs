import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
const { PI } = Math;

// * * Create GUI

const gui = new dat.GUI();
const parameters = {
  color: 0xddd1a7,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 2, y: mesh.rotation.y + PI * 2 });
  },
  spinCamera: () => {
    gsap.to(camera.position, {
      duration: 1,
      x: Math.cos(camera.position.x + PI * 2) * 5,
      // z: Math.cos(camera.position.z + PI * 2) * 5,
    });
  },
};

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

const geometry = new THREE.BoxGeometry(1, 1, 1);

// ! Crazy triangles
// const counter = 20;
// const arrayOfpoints = [];
// for (let i = 0; i < counter * 3 * 3; i++) {
//   arrayOfpoints.push((Math.random() - 0.5) * 5);
// }
// const positionsArray = new Float32Array(arrayOfpoints);

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionsAttribute);

//  * * Geometry

const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  // wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

// ** Add Scene

scene.add(mesh);
mesh.ma;
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

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

// * * Add elements to GUI
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(mesh.position, "y", -10, 10, 0.01);
cubeFolder.add(mesh.position, "x", -10, 10, 0.01);
cubeFolder.add(mesh.position, "z").min(-10).max(10).step(0.01);
cubeFolder.add(mesh, "visible");
cubeFolder.add(material, "wireframe");
cubeFolder.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
cubeFolder.add(parameters, "spin");
gui.add(parameters, "spinCamera");
// cubeFolder.addColor(mesh.color, "#ddd1a7");
cubeFolder.open();

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
