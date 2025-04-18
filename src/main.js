// Entry point for Solar System Plus
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SolarSystem } from './solarSystem.js';
import { UI } from './ui.js';
import { PlanetLabels } from './labels.js';
import { PLANETS, MOONS, PLANET_FACTS, MOON_FACTS } from './planets.js';

let renderer, scene, camera, controls, solarSystem, ui, planetLabels;
let timeControlMode = 'play';
window._timeControlMode = timeControlMode;

function init() {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(0, 200, 700);
  window._camera = camera;

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  window._controls = controls;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;

  // Solar System
  solarSystem = new SolarSystem(scene);

  // Planet Labels
  planetLabels = new PlanetLabels(scene, camera, renderer, solarSystem.planetMeshes);

  // UI
  ui = new UI(solarSystem);

  // Remove or override old overlay logic and ensure all userData is set
  function onPointerMove(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    // Collect all planet and moon meshes
    const planetMeshes = solarSystem.planetMeshes;
    planetMeshes.forEach((mesh, i) => { mesh.userData.planetName = PLANETS[i].name; });
    const moonMeshes = (solarSystem.moonMeshes || []).flat();
    moonMeshes.forEach(m => { if (m && m.mesh && m.moon) m.mesh.userData.moonName = m.moon.name; });
    const allMeshes = planetMeshes.concat(moonMeshes.map(m => m.mesh));
    const intersects = raycaster.intersectObjects(allMeshes, false);
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (obj.userData.planetName) {
        ui.showOverlay(obj.userData.planetName, false);
      } else if (obj.userData.moonName) {
        ui.showOverlay(obj.userData.moonName, true);
      }
    } 
  }

  window.addEventListener('pointermove', onPointerMove);

  window.addEventListener('resize', onWindowResize);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  let dt = ui.getTimeDelta();
  // Time control logic
  switch (window._timeControlMode) {
    case 'pause':
      dt = 0;
      break;
    case 'rewind':
      dt = -Math.abs(dt) * 2;
      break;
    case 'fastforward':
      dt = Math.abs(dt) * 4;
      break;
    default:
      // play
      break;
  }
  controls.update();
  solarSystem.update(dt * ui.speed);
  planetLabels.update();
  renderer.render(scene, camera);
}

init();
