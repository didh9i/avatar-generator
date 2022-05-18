export interface Theme {
  id: number,
  name: string,
  colors: Array<number>
}

const themes: Array<Theme> = [
  {
    id: 0,
    name: 'Rosy Dew',
    colors: [0xF9F1F0FF, 0xFADCD9FF, 0xF8AFA6FF, 0xF79489FF]
  },
  {
    id: 1,
    name: 'Summer Splash',
    colors: [0x05445EFF, 0x189AB4FF, 0x75E6DAFF, 0xD4F1F4FF]
  },
  {
    id: 2,
    name: 'The Deep Blue',
    colors: [0x050A30FF, 0x000C66FF, 0x0000FFFF, 0x7EC8E3FF]
  },
  {
    id: 3,
    name: 'Retro Punch',
    colors: [0x2FF3E0FF, 0xF8D210FF, 0xFA26A0FF, 0xF51720FF]
  },
  {
    id: 4,
    name: 'Healthy Leaves',
    colors: [0x3D550CFF, 0x81B622FF, 0xECF87FFF, 0x59981AFF]
  },
  {
    id: 5,
    name: 'Emerald Entrance',
    colors: [0xB68D40FF, 0xF4EBD0FF, 0x122620FF, 0xD6AD60FF]
  },
  {
    id: 6,
    name: 'Cheeky Marguerita',
    colors: [0x0A7029FF, 0xFEDE00FF, 0xC8DF52FF, 0xDBE8D8FF]
  },
  {
    id: 7,
    name: 'Green Blaze',
    colors: [0x76B947FF, 0xB1D8B7FF, 0x2F5233FF, 0x94C973FF]
  },
  {
    id: 8,
    name: 'Bubbly Banana',
    colors: [0x15B5B0FF, 0xF9BDC0FF, 0xFBE698FF, 0x6DECE0FF]
  },
  {
    id: 9,
    name: 'Sunlit Eggplant',
    colors: [0xEFD3B5FF, 0x5F093DFF, 0xB21368FF, 0xD67BA8FF]
  },
  {
    id: 10,
    name: 'Purple Fabric',
    colors: [0xBEAFC2FF, 0x695E93FF, 0x8155BAFF, 0x281C2DFF]
  },
  {
    id: 11,
    name: 'Wild Orchid',
    colors: [0x005437FF, 0xDEBAD6FF, 0x340744FF, 0x741AACFF]
  },
  {
    id: 12,
    name: 'Dark Road Curve',
    colors: [0x0A0708FF, 0x444444FF, 0x747474FF, 0xB1B1B1FF]
  },
  {
    id: 13,
    name: 'Colorful Powder Cracks',
    colors: [0x54086BFF, 0xFF0BACFF, 0x00BEC5FF, 0x050833FF]
  },
  {
    id: 14,
    name: 'Style and Grace',
    colors: [0x000000FF, 0xF41F4EFF, 0xFBFBFBFF, 0xFFC2C7FF]
  },
  {
    id: 15,
    name: 'Beautiful Abstraction',
    colors: [0x0000FFFF, 0x4B7BF5FF, 0x79A9F5FF, 0xC2E2F5FF]
  },
  {
    id: 16,
    name: 'Peach Party',
    colors: [0x190204FF, 0xFF8976FF, 0xCB4E47FF, 0xFFCBA4FF]
  },
  {
    id: 17,
    name: 'Strong and Curved',
    colors: [0x006884FF, 0x053D57FF, 0xF2F1EFFF, 0x97BCC7FF]
  },
  {
    id: 18,
    name: 'Bird of Prey',
    colors: [0xFFDB15FF, 0x020301FF, 0xB5A197FF, 0xF3F5F9FF]
  },
  {
    id: 19,
    name: 'Sunset Sightings',
    colors: [0xF9E9D0FF, 0xDB8780FF, 0xA30052FF, 0x26161FFF]
  },
  {
    id: 20,
    name: 'Morning Dew',
    colors: [0x31ED31FF, 0x10BC10FF, 0x11A7BBFF, 0x2AB67BFF]
  },
  {
    id: 21,
    name: 'Market Tourist',
    colors: [0xADD3D0FF, 0x970C10FF, 0x153250FF, 0xFEFCFFFF]
  },
  {
    id: 22,
    name: 'Earth Hands',
    colors: [0x4F3750FF, 0xCB9870FF, 0x8D8960FF, 0xAAA1A0FF]
  },
  {
    id: 23,
    name: 'Crimson and Blues',
    colors: [0xFF2768FF, 0xA3A3B7FF, 0x1B4A56FF, 0xF2EEF7FF]
  },
  {
    id: 24,
    name: 'Secret Keeper',
    colors: [0xFC4DB0FF, 0xF9E830FF, 0x221530FF, 0xF52870FF]
  },
  {
    id: 25,
    name: 'Endless Cubes',
    colors: [0x34DED0FF, 0x94FAF0FF, 0x3AF7F0FF, 0x31D1D0FF]
  },
  {
    id: 26,
    name: 'One-Man Show',
    colors: [0xCDBDB2FF, 0x89ACAAFF, 0xBB616CFF, 0x183A50FF]
  },
  {
    id: 27,
    name: 'Frosted Berries',
    colors: [0x3B2244FF, 0xCC3A73FF, 0xB4B8F5FF, 0xDDE0FFFF]
  },
  {
    id: 28,
    name: 'Leafy Touch',
    colors: [0x1F3750FF, 0x294A41FF, 0x518060FF, 0x89ACA0FF]
  },
  {
    id: 29,
    name: 'Cool Hair',
    colors: [0xFFECDDFF, 0xFFC1C5FF, 0xFF0BACFF, 0xFBF900FF]
  },
  {
    id: 30,
    name: 'Following the Sun',
    colors: [0xF0E8D1FF, 0xFF4500FF, 0xFDF344FF, 0x111F29FF]
  },
  {
    id: 31,
    name: 'Market Stall',
    colors: [0xC383B5FF, 0x2D1324FF, 0xC8BCC3FF, 0xA91D92FF]
  }
]

export default themes
