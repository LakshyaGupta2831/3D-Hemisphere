// things that are required in three js:
// (Scene, Camera, Renderer)
// Description //
// Scene: where all the objects are placed
// Camera: what the user sees
// Renderer: renders the scene

import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
//renderer//
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
//three js is handling dom element//
document.body.appendChild(renderer.domElement);

//camera//
const Fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(Fov,aspect,near,far);
camera.position.z = 2;

//scene//
const scene = new THREE.Scene();

//orbit controls-to rotatte//
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


//geometry: it has size and detail//
// for meshstandard it requires lights//
const geo = new THREE.IcosahedronGeometry(1.0,2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//wireframe geometry//
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

//lights//
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

//animation//
function animate(t = 0) {
    requestAnimationFrame(animate);
    // mesh.rotation.x = t * 0.01;
    // mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate();