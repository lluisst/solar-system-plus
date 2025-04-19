// Handles planet label creation and updating
// PlanetLabels class manages labels for planets in the scene

class PlanetLabels {
  constructor(scene, camera, renderer, planetMeshes) {
    this.labels = [];
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.planetMeshes = planetMeshes;
    this.createLabels();
    // Listen for language changes
    window.addEventListener('languagechange', () => this.updateLabelTexts());
  }
  createLabels() {
    PLANETS.forEach((planet, i) => {
      const div = document.createElement('div');
      div.className = 'planet-label';
      div.textContent = getPlanetNameLocalized(planet.name, window._appLang || 'en');
      div.style.position = 'absolute';
      div.style.color = '#fff';
      div.style.pointerEvents = 'none';
      div.style.fontSize = '14px';
      div.style.textShadow = '1px 1px 4px #000';
      document.body.appendChild(div);
      this.labels.push(div);
    });
  }
  updateLabelTexts() {
    PLANETS.forEach((planet, i) => {
      if (this.labels[i]) {
        this.labels[i].textContent = getPlanetNameLocalized(planet.name, window._appLang || 'en');
      }
    });
  }
  update() {
    // Comprova que les dades necessàries existeixen
    if (!PLANETS || !this.planetMeshes || !Array.isArray(this.planetMeshes)) {
      console.error('[ERROR] PlanetLabels.update: PLANETS o planetMeshes no està disponible');
      return;
    }

    PLANETS.forEach((planet, i) => {
      if (!this.planetMeshes[i] || !this.labels[i]) {
        return; // Salta si no existeix el planeta o l'etiqueta
      }
      
      const mesh = this.planetMeshes[i];
      if (!mesh.position) {
        console.error(`[ERROR] Mesh del planeta ${planet.name} no té position`);
        return;
      }
      
      const pos = mesh.position.clone();
      pos.project(this.camera);
      const x = (pos.x * 0.5 + 0.5) * this.renderer.domElement.clientWidth;
      const y = (1 - (pos.y * 0.5 + 0.5)) * this.renderer.domElement.clientHeight;
      this.labels[i].style.left = `${x}px`;
      this.labels[i].style.top = `${y}px`;
      this.labels[i].style.display = (pos.z > -1 && pos.z < 1) ? 'block' : 'none';
    });
  }
  dispose() {
    this.labels.forEach(label => label.remove());
    this.labels = [];
  }
}
