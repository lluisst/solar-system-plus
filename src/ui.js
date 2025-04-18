import { PLANETS, MOONS } from './planets.js';
import { PLANET_DATA } from './planetData.js';

// UI module for Solar System Plus
const LOCALIZATION = {
  en: {
    cameraFocus: 'Camera Focus:',
    timeControls: 'Time Controls:',
    play: 'Play', pause: 'Pause', rewind: 'Rewind', fastforward: 'Fast Forward',
    showTrails: 'Show Orbit Trails',
    timeSpeed: 'Time Speed:',
    diameter: 'Diameter',
    distance: 'Distance from Sun',
    orbitalPeriod: 'Orbital Period',
    description: 'Description',
    close: 'Close',
    noData: 'No detailed data available.'
  },
  es: {
    cameraFocus: 'Enfoque de cámara:',
    timeControls: 'Controles de tiempo:',
    play: 'Reproducir', pause: 'Pausa', rewind: 'Rebobinar', fastforward: 'Avance rápido',
    showTrails: 'Mostrar órbitas',
    timeSpeed: 'Velocidad del tiempo:',
    diameter: 'Diámetro',
    distance: 'Distancia al Sol',
    orbitalPeriod: 'Período orbital',
    description: 'Descripción',
    close: 'Cerrar',
    noData: 'No hay datos detallados.'
  },
  ca: {
    cameraFocus: 'Enfocament de càmera:',
    timeControls: 'Controls de temps:',
    play: 'Reprodueix', pause: 'Pausa', rewind: 'Rebobina', fastforward: 'Avanç ràpid',
    showTrails: 'Mostra òrbites',
    timeSpeed: 'Velocitat del temps:',
    diameter: 'Diàmetre',
    distance: 'Distància al Sol',
    orbitalPeriod: 'Període orbital',
    description: 'Descripció',
    close: 'Tanca',
    noData: 'No hi ha dades detallades.'
  },
  fr: {
    cameraFocus: 'Mise au point caméra:',
    timeControls: 'Contrôles du temps:',
    play: 'Lecture', pause: 'Pause', rewind: 'Rembobiner', fastforward: 'Avance rapide',
    showTrails: 'Montrer les orbites',
    timeSpeed: 'Vitesse du temps:',
    diameter: 'Diamètre',
    distance: 'Distance au Soleil',
    orbitalPeriod: 'Période orbitale',
    description: 'Description',
    close: 'Fermer',
    noData: 'Aucune donnée détaillée.'
  }
};

const PLANET_NAME_LOCALIZATION = {
  en: {
    Sun: 'Sun', Mercury: 'Mercury', Venus: 'Venus', Earth: 'Earth', Mars: 'Mars', Jupiter: 'Jupiter', Saturn: 'Saturn', Uranus: 'Uranus', Neptune: 'Neptune'
  },
  es: {
    Sun: 'Sol', Mercury: 'Mercurio', Venus: 'Venus', Earth: 'Tierra', Mars: 'Marte', Jupiter: 'Júpiter', Saturn: 'Saturno', Uranus: 'Urano', Neptune: 'Neptuno'
  },
  ca: {
    Sun: 'Sol', Mercury: 'Mercuri', Venus: 'Venus', Earth: 'Terra', Mars: 'Mart', Jupiter: 'Júpiter', Saturn: 'Saturn', Uranus: 'Urà', Neptune: 'Neptú'
  },
  fr: {
    Sun: 'Soleil', Mercury: 'Mercure', Venus: 'Vénus', Earth: 'Terre', Mars: 'Mars', Jupiter: 'Jupiter', Saturn: 'Saturne', Uranus: 'Uranus', Neptune: 'Neptune'
  }
};

const PLANET_DESCRIPTION_LOCALIZATION = {
  en: {
    Mercury: 'Smallest planet, closest to the Sun.',
    Venus: 'Second planet, hottest surface.',
    Earth: 'Our home planet, only known planet with life.',
    Mars: 'Known as the Red Planet.',
    Jupiter: 'Largest planet, famous for its Great Red Spot.',
    Saturn: 'Famous for its rings.',
    Uranus: 'Has a unique sideways rotation.',
    Neptune: 'Furthest planet from the Sun.',
    Moon: 'Earth\'s only natural satellite.'
  },
  es: {
    Mercury: 'El planeta más pequeño y el más cercano al Sol.',
    Venus: 'Segundo planeta, superficie más caliente.',
    Earth: 'Nuestro planeta, único conocido con vida.',
    Mars: 'Conocido como el Planeta Rojo.',
    Jupiter: 'El planeta más grande, famoso por la Gran Mancha Roja.',
    Saturn: 'Famoso por sus anillos.',
    Uranus: 'Tiene una rotación lateral única.',
    Neptune: 'El planeta más alejado del Sol.',
    Moon: 'Único satélite natural de la Tierra.'
  },
  ca: {
    Mercury: 'El planeta més petit i el més proper al Sol.',
    Venus: 'Segon planeta, superfície més calenta.',
    Earth: 'El nostre planeta, l\'únic conegut amb vida.',
    Mars: 'Conegut com el planeta vermell.',
    Jupiter: 'El planeta més gran, famós per la Gran Taca Vermella.',
    Saturn: 'Famos pels seus anells.',
    Uranus: 'Té una rotació lateral única.',
    Neptune: 'El planeta més allunyat del Sol.',
    Moon: 'Únic satèl·lit natural de la Terra.'
  },
  fr: {
    Mercury: 'La plus petite planète, la plus proche du Soleil.',
    Venus: 'Deuxième planète, surface la plus chaude.',
    Earth: 'Notre planète, seule connue avec la vie.',
    Mars: 'Connue comme la planète rouge.',
    Jupiter: 'La plus grande planète, célèbre pour sa Grande Tache Rouge.',
    Saturn: 'Célèbre pour ses anneaux.',
    Uranus: 'A une rotation latérale unique.',
    Neptune: 'La planète la plus éloignée du Soleil.',
    Moon: 'Seul satellite naturel de la Terre.'
  }
};

export function getPlanetNameLocalized(name, lang) {
  return (PLANET_NAME_LOCALIZATION[lang] && PLANET_NAME_LOCALIZATION[lang][name]) || name;
}

function getPlanetDescriptionLocalized(name, lang) {
  return (PLANET_DESCRIPTION_LOCALIZATION[lang] && PLANET_DESCRIPTION_LOCALIZATION[lang][name]) || '';
}

function updateStaticUITexts() {
  const lang = window._appLang || 'en';
  const L = LOCALIZATION[lang] || LOCALIZATION['en'];
  // Top bar (Time Speed, Show Orbit Trails)
  const speedLabel = document.querySelector('label[for="speedRange"]');
  if (speedLabel) speedLabel.textContent = L.timeSpeed;
  // Robust: find the label containing the #toggleTrails checkbox
  const allLabels = document.querySelectorAll('label');
  allLabels.forEach(label => {
    const checkbox = label.querySelector('input#toggleTrails');
    if (checkbox) {
      label.innerHTML = '';
      label.appendChild(checkbox);
      label.append(' ' + L.showTrails);
    }
  });
}

function getOverlayHtml(name, isMoon, L, N) {
  const safeName = name.toLowerCase().replace(/\s+/g, '');
  const imgPath1 = `assets/${safeName}_surface.jpg`;
  const imgPath2 = `src/assets/${safeName}_surface.jpg`;
  // Imatge flotant a la dreta
  const imgHtml = `<img class=\"surface-float-img\" src=\"${imgPath1}\" alt=\"Surface of ${name}\" onerror=\"this.onerror=null;this.src='${imgPath2}';this.onerror=function(){this.style.display='none';}\">`;
  if (!isMoon && PLANET_DATA[name]) {
    const d = PLANET_DATA[name];
    const desc = getPlanetDescriptionLocalized(name, window._appLang || 'en');
    return `
      <div style=\"min-height:70px;\">${imgHtml}
        <h2 style=\"margin-bottom:0.5em;font-size:1.2em;text-align:left;\">${N[name]}</h2>
        <ul style=\"list-style:none;padding:0;color:white;font-size:0.97em;text-align:left;\">
          <li><b>${L.diameter}:</b> ${d.diameter}</li>
          <li><b>${L.distance}:</b> ${d.distance}</li>
          <li><b>${L.orbitalPeriod}:</b> ${d.orbitalPeriod}</li>
          <li><b>${L.description}:</b> ${desc}</li>
        </ul>
      </div>
    `;
  } else {
    // Per llunes o dades absents, també mostrem la imatge
    const desc = getPlanetDescriptionLocalized(name, window._appLang || 'en');
    return `<div style=\"min-height:70px;\">${imgHtml}<h2 style='margin-bottom:0.5em;font-size:1.2em;text-align:left;'>${N[name] || name}</h2><div style='color:white;font-size:0.97em;text-align:left;'>${desc ? desc : L.noData}</div></div>`;
  }
}

export class UI {
  constructor(solarSystem) {
    this.solarSystem = solarSystem;
    this.container = document.getElementById('ui-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'ui-container';
      document.body.appendChild(this.container);
    }
    this.speedInput = document.getElementById('speedRange');
    this.speedValue = document.getElementById('speedValue');
    this.trailsCheckbox = document.getElementById('toggleTrails');
    this.speed = 1;
    this.lastTime = performance.now();
    this.speedInput.addEventListener('input', () => this.updateSpeed());
    this.trailsCheckbox.addEventListener('change', () => this.toggleTrails());
    this.updateSpeed();
    this.createControls();
    this.addLanguageSelector();
    updateStaticUITexts();
  }

  updateSpeed() {
    this.speed = parseFloat(this.speedInput.value);
    this.speedValue.textContent = `${this.speed}x`;
  }

  toggleTrails() {
    this.solarSystem.setShowTrails(this.trailsCheckbox.checked);
  }

  getTimeDelta() {
    const now = performance.now();
    const dt = ((now - this.lastTime) * 0.001) * this.speed;
    this.lastTime = now;
    return dt;
  }

  createControls() {
    const lang = window._appLang || 'en';
    const L = LOCALIZATION[lang] || LOCALIZATION['en'];
    const N = PLANET_NAME_LOCALIZATION[lang] || PLANET_NAME_LOCALIZATION['en'];
    // Camera Presets
    const cameraPanel = document.createElement('div');
    cameraPanel.className = 'ui-panel';
    cameraPanel.innerHTML = `<b>${L.cameraFocus}</b><br>`;
    ['Sun', ...PLANETS.map(p => p.name)].forEach((name, idx) => {
      const btn = document.createElement('button');
      btn.textContent = getPlanetNameLocalized(name, lang);
      btn.className = 'ui-btn camera-focus-btn';
      btn.setAttribute('aria-label', `Focus camera on ${getPlanetNameLocalized(name, lang)}`);
      btn.tabIndex = 0;
      btn.onclick = () => this.focusCamera(name);
      btn.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') btn.onclick(); };
      cameraPanel.appendChild(btn);
    });
    this.container.appendChild(cameraPanel);

    // Time Controls
    const timePanel = document.createElement('div');
    timePanel.className = 'ui-panel';
    timePanel.innerHTML = `<b>${L.timeControls}</b><br>`;
    const controls = [
      { label: L.play, mode: 'play', key: 'p' },
      { label: L.pause, mode: 'pause', key: ' ' },
      { label: L.rewind, mode: 'rewind', key: 'r' },
      { label: L.fastforward, mode: 'fastforward', key: 'f' }
    ];
    controls.forEach(ctrl => {
      const btn = document.createElement('button');
      btn.textContent = ctrl.label;
      btn.className = 'ui-btn';
      btn.setAttribute('aria-label', `${ctrl.label} time`);
      btn.tabIndex = 0;
      btn.onclick = () => this.setTimeControl(ctrl.mode);
      btn.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') btn.onclick(); };
      timePanel.appendChild(btn);
    });
    this.container.appendChild(timePanel);

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      // Camera focus shortcuts: 1-8 for planets, 0 for Sun
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key >= '1' && e.key <= String(PLANETS.length)) {
        this.focusCamera(PLANETS[parseInt(e.key, 10)-1].name);
      } else if (e.key === '0') {
        this.focusCamera('Sun');
      }
      // Time controls
      if (e.key === 'p') this.setTimeControl('play');
      else if (e.key === ' ') this.setTimeControl('pause');
      else if (e.key === 'r') this.setTimeControl('rewind');
      else if (e.key === 'f') this.setTimeControl('fastforward');
    });
  }

  focusCamera(name) {
    let target;
    if (name === 'Sun') {
      target = new THREE.Vector3(0, 0, 0);
    } else {
      const idx = PLANETS.findIndex(p => p.name === name);
      if (idx !== -1 && this.solarSystem.planetMeshes[idx]) {
        target = this.solarSystem.planetMeshes[idx].position.clone();
      }
    }
    if (target) {
      // Smooth transition
      const cam = window._camera;
      const controls = window._controls;
      if (!cam || !controls) {
        console.warn('Camera or controls not available for camera focus.');
        return;
      }
      const startPos = cam.position.clone();
      const endPos = target.clone().add(new THREE.Vector3(0, 60, 120));
      let t = 0;
      function animate() {
        t += 0.05;
        cam.position.lerpVectors(startPos, endPos, t);
        controls.target.lerpVectors(controls.target, target, t);
        controls.update();
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          cam.position.copy(endPos);
          controls.target.copy(target);
          controls.update();
        }
      }
      animate();
      console.log(`Camera focusing on ${name}`);
    } else {
      console.warn('Target for camera focus not found:', name);
    }
  }

  setTimeControl(mode) {
    window._timeControlMode = mode;
  }

  showOverlay(name, isMoon = false) {
    let overlay = document.getElementById('planet-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'planet-overlay';
      overlay.className = 'planet-overlay';
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'block';
    overlay.innerHTML = '';
    const lang = window._appLang || 'en';
    const L = LOCALIZATION[lang] || LOCALIZATION['en'];
    const N = PLANET_NAME_LOCALIZATION[lang] || PLANET_NAME_LOCALIZATION['en'];
    let infoHtml = getOverlayHtml(name, isMoon, L, N);
    overlay.innerHTML = `
      <div style="padding:1em 1em 0.5em 1em;text-align:left;">
        ${infoHtml}
        <button class="ui-btn" id="close-overlay-btn" style="float:right;font-size:0.95em;margin-top:1em;">${L.close}</button>
      </div>
    `;
    document.getElementById('close-overlay-btn').onclick = () => this.hideOverlay();
    // Debug: log overlay display
    console.log('[UI] showOverlay called for', name, '| isMoon:', isMoon, '| lang:', lang);
    console.log('[UI] overlay content:', overlay.innerHTML);
    overlay.style.zIndex = 10002;
  }

  hideOverlay() {
    const overlay = document.getElementById('planet-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  addLanguageSelector() {
    let langSel = document.getElementById('language-selector');
    if (!langSel) {
      langSel = document.createElement('select');
      langSel.id = 'language-selector';
      langSel.style.margin = '0 0 12px 0';
      langSel.style.fontSize = '16px';
      [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' },
        { value: 'ca', label: 'Català' },
        { value: 'fr', label: 'Français' }
      ].forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.value;
        o.textContent = opt.label;
        langSel.appendChild(o);
      });
      // Insert at top of UI container
      this.container.insertBefore(langSel, this.container.firstChild);
    }
    langSel.onchange = () => {
      window._appLang = langSel.value;
      if (typeof window.updateLanguage === 'function') window.updateLanguage();
    };
    window._appLang = langSel.value || 'en';
  }
}

window.updateLanguage = () => {
  const lang = window._appLang || 'en';
  const L = LOCALIZATION[lang] || LOCALIZATION['en'];
  // Camera Focus label
  const cameraPanel = document.querySelector('.ui-panel');
  if (cameraPanel) {
    cameraPanel.querySelector('b').textContent = L.cameraFocus;
    // Update planet button texts
    const btns = cameraPanel.querySelectorAll('button');
    ['Sun', ...PLANETS.map(p => p.name)].forEach((name, i) => {
      if (btns[i]) btns[i].textContent = getPlanetNameLocalized(name, lang);
    });
  }
  // Time Controls label
  const panels = document.querySelectorAll('.ui-panel');
  if (panels[1]) {
    panels[1].querySelector('b').textContent = L.timeControls;
    const btns = panels[1].querySelectorAll('button');
    [L.play, L.pause, L.rewind, L.fastforward].forEach((txt, i) => {
      if (btns[i]) btns[i].textContent = txt;
    });
  }
  updateStaticUITexts();
  // Only hide overlay if open (not always)
  const overlay = document.getElementById('planet-overlay');
  if (overlay && overlay.style.display === 'block') overlay.style.display = 'none';
  // Fire languagechange event for labels
  window.dispatchEvent(new Event('languagechange'));
};
