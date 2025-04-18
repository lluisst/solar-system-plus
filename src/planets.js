// Data for the Sun and planets: relative sizes, orbits, colors, and speeds
export const PLANETS = [
  {
    name: 'Mercury',
    radius: 2.4,
    orbitRadius: 50,
    orbitSpeed: 0.024,
    phase: 0.1,
    color: 0xaaaaaa,
    inclination: 7.0
  },
  {
    name: 'Venus',
    radius: 6,
    orbitRadius: 70,
    orbitSpeed: 0.018,
    phase: 0.2,
    color: 0xffc58f,
    inclination: 3.4
  },
  {
    name: 'Earth',
    radius: 6.4,
    orbitRadius: 100,
    orbitSpeed: 0.015,
    phase: 0.4,
    color: 0x3399ff,
    inclination: 0.0,
    axisTilt: 23.4
  },
  {
    name: 'Mars',
    radius: 3.4,
    orbitRadius: 140,
    orbitSpeed: 0.012,
    phase: 0.6,
    color: 0xff5533,
    inclination: 1.85
  },
  {
    name: 'Jupiter',
    radius: 13,
    orbitRadius: 200,
    orbitSpeed: 0.008,
    phase: 0.8,
    color: 0xf4e2b6,
    inclination: 1.3
  },
  {
    name: 'Saturn',
    radius: 11,
    orbitRadius: 260,
    orbitSpeed: 0.006,
    phase: 1.0,
    color: 0xf9d29f,
    inclination: 2.49,
    ringInclination: 26.7
  },
  {
    name: 'Uranus',
    radius: 8,
    orbitRadius: 320,
    orbitSpeed: 0.004,
    phase: 1.2,
    color: 0x7fffd4,
    inclination: 0.77,
    ringInclination: 97.8
  },
  {
    name: 'Neptune',
    radius: 7.8,
    orbitRadius: 370,
    orbitSpeed: 0.003,
    phase: 1.4,
    color: 0x4169e1,
    inclination: 1.77
  }
];

// Updated moon sizes and orbits proportional to parent planet radii
export const MOONS = {
  Earth: [
    { name: 'Moon', radius: 1.7, orbitRadius: 12, orbitSpeed: 0.08, color: 0xbbbbbb, inclination: 5.1 }
  ],
  Jupiter: [
    { name: 'Io', radius: 0.37 * 7.1, orbitRadius: 16, orbitSpeed: 0.19, color: 0xe3d7b6, inclination: 0.04 },
    { name: 'Europa', radius: 0.29 * 7.1, orbitRadius: 20, orbitSpeed: 0.13, color: 0xdedede, inclination: 0.47 },
    { name: 'Ganymede', radius: 0.41 * 7.1, orbitRadius: 26, orbitSpeed: 0.10, color: 0xb1b1b1, inclination: 0.20 },
    { name: 'Callisto', radius: 0.38 * 7.1, orbitRadius: 34, orbitSpeed: 0.07, color: 0x888888, inclination: 0.19 }
  ],
  Saturn: [
    { name: 'Titan', radius: 0.40 * 6, orbitRadius: 18, orbitSpeed: 0.07, color: 0xd2b48c, inclination: 0.33 }
  ],
  Uranus: [
    { name: 'Titania', radius: 0.20 * 5.1, orbitRadius: 10, orbitSpeed: 0.09, color: 0xcfcfcf, inclination: 0.08 }
  ],
  Neptune: [
    { name: 'Triton', radius: 0.21 * 4.9, orbitRadius: 11, orbitSpeed: 0.08, color: 0xb0c4de, inclination: 156.9 }
  ]
};

// Add more detailed facts for planets and moons
export const PLANET_FACTS = {
  Mercury: [
    'Smallest planet in the Solar System',
    'No moons',
    'Extreme temperature fluctuations'
  ],
  Venus: [
    'Hottest planet due to thick CO₂ atmosphere',
    'Rotates in the opposite direction to most planets',
    'No moons'
  ],
  Earth: [
    'Only planet known to support life',
    '70% of its surface is water',
    'Has one natural satellite: the Moon'
  ],
  Mars: [
    'Known as the Red Planet',
    'Home to the tallest volcano (Olympus Mons)',
    'Has two moons: Phobos and Deimos'
  ],
  Jupiter: [
    'Largest planet in the Solar System',
    'Has a Great Red Spot storm',
    'Has at least 79 moons'
  ],
  Saturn: [
    'Famous for its prominent ring system',
    'Least dense planet',
    'Has at least 83 moons'
  ],
  Uranus: [
    'Rotates on its side',
    'Has faint rings',
    'Coldest atmosphere of any planet'
  ],
  Neptune: [
    'Farthest planet from the Sun',
    'Strongest winds in the Solar System',
    'Has a dark storm called the Great Dark Spot'
  ]
};

export const MOON_FACTS = {
  Moon: [
    'Fifth largest moon in the Solar System',
    'Causes tides on Earth',
    'Surface covered in craters'
  ],
  Io: [
    'Most volcanically active body in the Solar System',
    'Has over 400 active volcanoes',
    'Surface is dotted with sulfur and lava flows'
  ],
  Europa: [
    'Surface is mostly water ice',
    'May have a subsurface ocean',
    'Considered a candidate for extraterrestrial life'
  ],
  Ganymede: [
    'Largest moon in the Solar System',
    'Larger than Mercury',
    'Has its own magnetic field'
  ],
  Callisto: [
    'Heavily cratered surface',
    'Third largest moon',
    'May have a subsurface ocean'
  ],
  Titan: [
    'Largest moon of Saturn',
    'Thick nitrogen-rich atmosphere',
    'Has lakes of liquid methane and ethane'
  ],
  Titania: [
    'Largest moon of Uranus',
    'Surface has canyons and faults',
    'Discovered by William Herschel in 1787'
  ],
  Triton: [
    'Largest moon of Neptune',
    'Retrograde orbit (opposite to Neptune’s rotation)',
    'Has geysers of nitrogen gas'
  ]
};
