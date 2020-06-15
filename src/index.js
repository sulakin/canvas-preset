import './styles.scss';
import * as THREE from 'three';
import { TimelineMax } from 'gsap';
import Draggable from 'gsap/Draggable';

let OrbitControls = require('three-orbit-controls')(THREE);

let canvas = document.getElementById('scene');
let width = window.innerWidth;
let height = window.innerHeight;
let mouse = new THREE.Vector2();
let INTERSECTED;
let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(width, height);
let camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);

// SCENE
let scene = new THREE.Scene();

let group = new THREE.Group();
scene.add(group);
camera.position.set(0, -100, 10);
camera.lookAt(10, 20, 30);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.AmbientLight(0x404040, 3); // soft white light
scene.add(light);

let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// DO SOMETHING
let geometry = new THREE.SphereGeometry(25, 132, 132);
let material = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture('img/earth-small.jpg'),
  displacementMap: THREE.ImageUtils.loadTexture('img/earthbump1k.jpg'),
  displacementScale: 10,
  // wireframe: true
});

let sphere = new THREE.Mesh(geometry, material);
group.add(sphere);

let time = 0;
function Render() {
  time++;
  renderer.render(scene, camera);
  window.requestAnimationFrame(Render);
}
Render();

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize, false);
