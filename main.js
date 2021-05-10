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
// * * Cube B
const geometry2 = new THREE.BoxGeometry(1, 2, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0xd44a385 });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.random();

// * * Add group

group.add(cube1);
group.add(cube2);

// ** Add Scene

scene.add(group);

group.translateX(2);
group.rotation.x = PI / 2;
group.rotation.z = PI / 2;

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
camera.position.x = 5;
scene.add(camera);

//* *Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
