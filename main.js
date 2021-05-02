import "./style.css";
import * as THREE from "three";

//* * Canvas
const canvas = document.querySelector(".webgl");
//* * Scene
const scene = new THREE.Scene();

// * *Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xd04030 });
const mesh = new THREE.Mesh(geometry, material);

mesh.rotation.y = 45;
mesh.rotation.z = -5;
mesh.position.z = -1;
scene.add(mesh);

//* * Sizes

const sizes = {
  width: 800,
  height: 400,
};

//* * Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);

//* *Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
