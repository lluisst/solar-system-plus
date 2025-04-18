// Overlay for displaying planet info on hover/click
import * as THREE from 'three';
import { PLANET_DATA } from './planetData.js';

// Entire PlanetInfoOverlay class is now disabled to avoid overlay conflicts with UI.js overlay
// export class PlanetInfoOverlay {
//   constructor(renderer, planetMeshes) {
//     this.renderer = renderer;
//     this.planetMeshes = planetMeshes;
//     this.overlay = document.createElement('div');
//     this.overlay.className = 'planet-info-overlay';
//     this.overlay.style.display = 'none';
//     document.body.appendChild(this.overlay);
//     this.bindEvents();
//   }
//   bindEvents() {
//     this.renderer.domElement.addEventListener('mousemove', (e) => this.onHover(e));
//   }
//   onHover(e) {
//     const rect = this.renderer.domElement.getBoundingClientRect();
//     const mouse = {
//       x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
//       y: -((e.clientY - rect.top) / rect.height) * 2 + 1
//     };
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, window._camera);
//     const intersects = raycaster.intersectObjects(this.planetMeshes);
//     if (intersects.length > 0) {
//       const mesh = intersects[0].object;
//       const planetName = mesh.userData.planetName;
//       if (PLANET_DATA[planetName]) {
//         this.show(e.clientX, e.clientY, PLANET_DATA[planetName]);
//       }
//     } 
//   }
//   show(x, y, data) {
//     this.overlay.innerHTML = `<b>${data.name}</b><br>
//       Diameter: ${data.diameter}<br>
//       Distance: ${data.distance}<br>
//       Orbital Period: ${data.orbitalPeriod}<br>
//       <i>${data.description}</i>`;
//     this.overlay.style.left = `${x + 10}px`;
//     this.overlay.style.top = `${y + 10}px`;
//     this.overlay.style.display = 'block';
//   }
//   hide() {
//     this.overlay.style.display = 'none';
//   }
//   dispose() {
//     this.overlay.remove();
//   }
// }
