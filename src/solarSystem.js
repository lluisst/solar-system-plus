// SolarSystem class creates and manages the Sun, planets, orbits, and animation
// Eliminem imports, ara tot és global

// Substituïm el fetch per una variable global
let planetTextures = {};
fetch('src/assets/planet-textures.json')
  .then(response => {
    if (!response.ok) {
      console.error('[ERROR] No s\'ha pogut carregar planet-textures.json:', response.status);
      return {};
    }
    return response.json();
  })
  .then(json => {
    planetTextures = json;
    console.log('[LOG] planetTextures carregat:', planetTextures);
  })
  .catch(err => {
    console.error('[ERROR] Error carregant planet-textures.json:', err);
  });

// Eliminem export
class SolarSystem {
  constructor(scene) {
    this.scene = scene;
    this.planets = [];
    this.planetMeshes = [];
    this.moonMeshes = [];
    this.orbitLines = [];
    this.moonOrbits = [];
    this.trails = [];
    this.time = 0;
    this.textureLoader = new THREE.TextureLoader();
    console.log('[LOG] Constructor SolarSystem. PLANETS:', typeof PLANETS, PLANETS);
    this.createSun();
    this.createPlanets();
    this.createMoons();
  }

  createSun() {
    const geometry = new THREE.SphereGeometry(30, 32, 32);
    let material;
    if (planetTextures["Sun"]) {
      const tex = this.textureLoader.load(`src/assets/${planetTextures["Sun"]}`);
      material = new THREE.MeshBasicMaterial({ map: tex });
    } else {
      material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    }
    this.sun = new THREE.Mesh(geometry, material);
    this.scene.add(this.sun);
  }

  createPlanets() {
    if (!PLANETS) {
      console.error('[ERROR] PLANETS no està definit!');
      return;
    }
    console.log('[LOG] Creant planetes...');
    PLANETS.forEach((planet, i) => {
      console.log(`[LOG] Creant planeta: ${planet.name}`);
      // Planet mesh
      const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      let material;
      if (planetTextures[planet.name]) {
        const tex = this.textureLoader.load(`src/assets/${planetTextures[planet.name]}`);
        material = new THREE.MeshPhongMaterial({ map: tex, shininess: 20 });
      } else {
        material = new THREE.MeshPhongMaterial({ color: planet.color, shininess: 20 });
      }
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.planetName = planet.name;
      // Inclinar l'eix de la Terra
      if (planet.name === 'Earth' && planet.axisTilt) {
        mesh.rotation.z = THREE.MathUtils.degToRad(planet.axisTilt);
      }
      this.scene.add(mesh);
      this.planetMeshes.push(mesh);

      // Saturn/Uranus rings
      if (planet.name === 'Saturn' && planetTextures['SaturnRing']) {
        const ringTex = this.textureLoader.load(`src/assets/${planetTextures['SaturnRing']}`);
        const ringGeo = new THREE.RingGeometry(18, 28, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.8
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        // Inclinar els anells segons ringInclination
        ring.rotation.x = -Math.PI / 2 + THREE.MathUtils.degToRad(planet.ringInclination || 0);
        mesh.add(ring);
      }
      if (planet.name === 'Uranus' && planetTextures['UranusRing']) {
        const ringTex = this.textureLoader.load(`src/assets/${planetTextures['UranusRing']}`);
        const ringGeo = new THREE.RingGeometry(10, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.7
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2 + THREE.MathUtils.degToRad(planet.ringInclination || 0);
        mesh.add(ring);
      }

      // Orbit line (static, always visible)
      const curve = new THREE.EllipseCurve(
        0, 0,
        planet.orbitRadius, planet.orbitRadius
      );
      const points = curve.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.5, linewidth: 1 });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.renderOrder = -1;
      // Inclinar l'òrbita segons la inclinació orbital
      if (planet.inclination) {
        orbit.rotation.z = THREE.MathUtils.degToRad(planet.inclination);
      }
      this.scene.add(orbit);
      this.orbitLines.push(orbit);
      // Trail (empty for now)
      this.trails[i] = { points: [], line: null };
    });
    // Lighting
    const sunLight = new THREE.PointLight(0xffffff, 3, 0);
    sunLight.position.set(0, 0, 0);
    this.scene.add(sunLight);
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(300, 400, 200);
    this.scene.add(dirLight);
  }

  createMoons() {
    this.moonMeshes = [];
    this.moonOrbits = [];
    PLANETS.forEach((planet, i) => {
      const planetMoons = MOONS[planet.name];
      if (!planetMoons) return;
      this.moonMeshes[i] = [];
      this.moonOrbits[i] = [];
      planetMoons.forEach(moon => {
        const geo = new THREE.SphereGeometry(moon.radius, 16, 16);
        const mat = new THREE.MeshPhongMaterial({ color: moon.color, shininess: 15 });
        const mesh = new THREE.Mesh(geo, mat);
        this.scene.add(mesh);
        this.moonMeshes[i].push({ mesh, moon });
        // Orbit line
        const curve = new THREE.EllipseCurve(0, 0, moon.orbitRadius, moon.orbitRadius);
        const points = curve.getPoints(50);
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
        const orbitMat = new THREE.LineBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.3 });
        const orbit = new THREE.Line(orbitGeo, orbitMat);
        // Inclinar l'òrbita de la lluna segons la seva inclinació
        if (moon.inclination) {
          orbit.rotation.z = THREE.MathUtils.degToRad(moon.inclination);
        }
        this.scene.add(orbit);
        this.moonOrbits[i].push(orbit);
      });
    });
  }

  update(dt) {
    this.time += dt;
    // Only update positions if meshes are visible (frustum culling for performance)
    const frustum = new THREE.Frustum();
    const camViewProj = new THREE.Matrix4();
    camViewProj.multiplyMatrices(window._camera.projectionMatrix, window._camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(camViewProj);
    PLANETS.forEach((planet, i) => {
      const mesh = this.planetMeshes[i];
      // Frustum culling
      if (!frustum.intersectsObject(mesh)) return;
      const angle = this.time * planet.orbitSpeed;
      let x = planet.orbitRadius * Math.cos(angle);
      let z = planet.orbitRadius * Math.sin(angle);
      let pos = new THREE.Vector3(x, 0, z);
      // Aplica la inclinació orbital
      if (planet.inclination) {
        const q = new THREE.Quaternion();
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0); // No rotació Y
        q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(planet.inclination)));
        pos.applyQuaternion(q);
      }
      mesh.position.copy(pos);
      // Update moons
      const planetMoons = MOONS[planet.name];
      if (planetMoons && this.moonMeshes[i]) {
        planetMoons.forEach((moon, j) => {
          const moonAngle = this.time * moon.orbitSpeed;
          let mx = moon.orbitRadius * Math.cos(moonAngle);
          let mz = moon.orbitRadius * Math.sin(moonAngle);
          let moonPos = new THREE.Vector3(mx, 0, mz);
          // Aplica la inclinació orbital de la lluna
          if (moon.inclination) {
            const mq = new THREE.Quaternion();
            mq.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0);
            mq.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(moon.inclination)));
            moonPos.applyQuaternion(mq);
          }
          // La posició de la lluna és relativa al planeta
          moonPos.add(pos);
          this.moonMeshes[i][j].mesh.position.copy(moonPos);
        });
      }
      // Update trails
      if (this.showTrails) {
        if (!this.trails[i].points) {
          this.trails[i].points = [];
        }
        this.trails[i].points.push(mesh.position.clone());
        if (this.trails[i].points.length > 100) this.trails[i].points.shift();
        // Remove old trail mesh
        if (this.trails[i].line) {
          this.scene.remove(this.trails[i].line);
        }
        // Create fading trail (make visually distinct)
        const trailGeometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const baseColor = new THREE.Color(planet.color);
        for (let j = 0; j < this.trails[i].points.length; j++) {
          positions.push(this.trails[i].points[j].x, 0.2, this.trails[i].points[j].z);
          // Fading color, more vibrant
          const fade = j / this.trails[i].points.length;
          const fadedColor = baseColor.clone().lerp(new THREE.Color(0x000000), 1 - fade);
          colors.push(fadedColor.r, fadedColor.g, fadedColor.b);
        }
        trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        trailGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const trailMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95, linewidth: 4 });
        const line = new THREE.Line(trailGeometry, trailMaterial);
        line.renderOrder = 1;
        this.scene.add(line);
        this.trails[i].line = line;
      } else if (this.trails[i].line) {
        this.scene.remove(this.trails[i].line);
        this.trails[i].line = null;
        this.trails[i].points = [];
      }
    });
  }
  setShowTrails(show) {
    this.showTrails = show;
  }
}
