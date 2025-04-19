// Entry point for Solar System Plus
// Eliminem els imports, ara tot és global

// Definim variables globals que es poden utilitzar des d'altres scripts
let renderer, scene, camera, controls, solarSystem, ui, planetLabels;
let lastFrameTime = performance.now();

// --- Lògica de control de temps centralitzada ---
window._timeControlMode = 'play';
window.timeSpeed = 1;

function getEffectiveTimeDelta() {
  const now = performance.now();
  let dt = (now - lastFrameTime) * 0.001; // segons
  lastFrameTime = now;
  let speed = window.timeSpeed;
  switch (window._timeControlMode) {
    case 'pause':
      return 0;
    case 'rewind':
      return -Math.abs(speed * dt);
    case 'fastforward':
      return Math.abs(speed * 3 * dt);
    case 'play':
    default:
      return speed * dt;
  }
}

function updateSpeedValue(val) {
  document.getElementById('speedValue').textContent = val + 'x';
}

document.addEventListener('DOMContentLoaded', function() {
  const speedSlider = document.getElementById('speedRange');
  if (speedSlider) {
    speedSlider.addEventListener('input', function(e) {
      window.timeSpeed = parseFloat(e.target.value);
      updateSpeedValue(window.timeSpeed);
    });
    updateSpeedValue(speedSlider.value);
  }
});

// Fem init explicitament disponible a window per poder cridar-lo des d'index.html
window.init = init;

function init() {
  console.log('[INIT] Iniciant Solar System Plus');
  
  // Logs globals
  console.log('[INIT] PLANETS:', typeof PLANETS, Array.isArray(PLANETS) ? PLANETS.length : 'No és un array');
  console.log('[INIT] PLANET_DATA:', typeof PLANET_DATA);
  console.log('[INIT] SolarSystem:', typeof SolarSystem);
  console.log('[INIT] PlanetLabels:', typeof PlanetLabels);
  console.log('[INIT] UI:', typeof UI);

  // Renderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    console.log('[INIT] Renderer creat');
  } catch(e) {
    console.error('[ERROR] Error creant renderer:', e);
    return;
  }

  // Scene
  scene = new THREE.Scene();
  console.log('[INIT] Scene creada');

  // Camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(0, 200, 700);
  window._camera = camera;
  console.log('[INIT] Camera creada');

  // Controls
  if (typeof THREE.OrbitControls !== 'function') {
    console.error('[ERROR] THREE.OrbitControls no està definit!');
    return;
  }
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  window._controls = controls;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  console.log('[INIT] Controls creats');

  // Verificar classes i variables globals
  console.log("PLANETS global:", typeof PLANETS, Array.isArray(PLANETS) ? PLANETS.length : 'No és un array');
  console.log("SolarSystem global:", typeof SolarSystem);
  console.log("PlanetLabels global:", typeof PlanetLabels);
  console.log("UI global:", typeof UI);

  // Solar System
  if (typeof SolarSystem !== 'function') {
    console.error('[ERROR] SolarSystem no està definit!');
    return;
  }
  try {
    solarSystem = new SolarSystem(scene);
    console.log('[INIT] SolarSystem creat');
  } catch(e) {
    console.error('[ERROR] Error creant SolarSystem:', e);
    console.error('[ERROR] Detalls:', e.message, e.stack);
    return;
  }

  // Planet Labels
  if (typeof PlanetLabels !== 'function') {
    console.error('[ERROR] PlanetLabels no està definit!');
    return;
  }
  try {
    planetLabels = new PlanetLabels(scene, camera, renderer, solarSystem.planetMeshes);
    console.log('[INIT] PlanetLabels creats');
  } catch(e) {
    console.error('[ERROR] Error creant PlanetLabels:', e);
    return;
  }

  // UI
  if (typeof UI !== 'function') {
    console.error('[ERROR] UI no està definit!');
    return;
  }
  try {
    ui = new UI(solarSystem);
    console.log('[INIT] UI creat');
  } catch(e) {
    console.error('[ERROR] Error creant UI:', e);
    return;
  }

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
  console.log('[INIT] Inicialització completada - començant animació');
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// --- Animació ---
function animate() {
  requestAnimationFrame(animate);
  if (!renderer || !scene || !camera) {
    console.error('[ERROR] Components essencials no inicialitzats');
    return;
  }

  if (controls) controls.update();
  if (planetLabels) planetLabels.update();
  if (solarSystem) {
    const dt = getEffectiveTimeDelta();
    solarSystem.update(dt);
  }
  renderer.render(scene, camera);
}

// Inicia l'aplicació quan el DOM estigui llest
document.addEventListener('DOMContentLoaded', function() {
  console.log('[LOG] DOM Content Loaded - Inicialitzant...');
  // No cridem init aquí, deixem que es cridi des d'index.html
});
