import type { Person } from './person';
import { TARENS_SHARED } from './sharedPeople';

export const TEAM_MEMBERS: Person[] = [
  {
    name: 'Tarens',
    slug: 'tarens',
    ...TARENS_SHARED,
    promoLinks: [...TARENS_SHARED.promoLinks],
    role: 'Founder',
  },
  {
    name: 'Andjela Djekic',
    slug: 'igineci',
    image: '/images/team/andjela-left.webp',
    imageTopRight: '/images/team/andjela-left1.webp',
    imageBottomRight: '/images/team/andjela-br.webp',
    promoLinks: [
      { label: 'PORTFOLIO', url: 'https://www.andjeladjekic.com' },
      { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/andjeladjekic1111/' },
      { label: 'GITHUB', url: 'https://github.com/igineci' },
      { label: 'OTHER PROJECTS', url: 'https://www.unicam.app' },
      { label: 'INSTAGRAM', url: 'https://www.instagram.com/iginecci/' },
      { label: 'EMAIL', url: 'mailto:andjeladjek@gmail.com'},
    ],
    role: 'Web Developer',
    bio: [
      'Andjela is 23 year old frontend engineer focused on building authentic web experiences where technology and creativity merge.',
      'Alongside her engineering work on platforms and large web applications, she enjoys exploring the more expressive side of the web — creating immersive, visually distinctive interfaces that reflect the identity of the projects behind them.',
      'Her work combines performance-focused engineering with a strong sense of aesthetics, translating the energy of the music into a digital space. She is particularly interested in how new technologies can expand what is possible on the web while maintaining thoughtful design and clean architecture.',
    ]
  },
  {
    name: 'Ema Djipalo',
    slug: 'ema',
    image: '/images/team/ema-left.jpeg',
    imageTopRight: '/images/team/ema-tr.jpeg',
    imageBottomRight: '/images/team/ema-br.webp',
    promoLinks: [
      { label: 'INSTAGRAM', url: 'https://www.instagram.com/djipaloo/' },
    ],
    bio: 'Ema is a graphic designer from Serbia with a passion for creating clean, memorable visual identities. With a background in graphic design, she has worked with a variety of clients on projects ranging from logo and packaging design to building complete brand visuals. Alongside static design, Ema also enjoys working with animation, creating logo animations and short illustrated sequences that bring brands to life in a dynamic way. Beyond design, Ema draws inspiration from her passion for film, music, Japanese culture, and anime, influences that often inform her visual sensibility and creative approach.',
    role: 'Graphic Designer',
  },
  {
    name: 'Isidora Isailovic',
    slug: 'isidora',
    image: '/images/team/isidora-left.webp',
    imageTopRight: '/images/team/isidora-tr.jpeg',
    imageBottomRight: '/images/team/isidora-bg.jpeg',
    promoLinks:[
      {label: 'EMAIL', url: 'mailto:isailovic.isidora01@gmail.com'},
    ],
    role: 'Marketing and Social Media Manager',
    bio: 'Isidora is a marketing manager from Serbia with a passion for building brands through thoughtful strategy and creative storytelling. With experience spanning digital marketing and the film festival circuit, she has worked across a range of projects, from crafting campaign strategies to planning and executing marketing actions that connect brands with their audiences in meaningful ways. Alongside strategy, Isidora has a natural affinity for the creative industries, bringing a considered aesthetic sensibility to everything she works on, developing campaigns that feel culturally relevant. Beyond marketing, she draws inspiration from film and music, influences that shape her instinct for narrative, tone, and visual language, and that keep her work grounded in genuine creative thinking rather than convention.'
  },
  {
    name: 'Kabay',
    slug: 'kabay',
    image: '/images/team/kabay-left.webp',
    imageTopRight: '/images/team/kabay-tr.webp',
    imageBottomRight: '/images/team/kabay-br.webp',
    bio: [
      'Eryk Kabay is a UK and Berlin-based mastering engineer, DJ and producer specialising in electronic music. With over six years immersed in the techno scene, his work is driven by a deep understanding of the emotional and physical impact of sound on the dancefloor.',
      'Trained at subSine Academy of Electronic Music in Glasgow, he developed his craft under the mentorship of Ableton Certified Trainer Simon Stokes (Petrichor), gaining a strong technical foundation alongside a refined artistic perspective.',
      'Alongside mastering, Eryk is an active artist with releases on respected labels such as Clergy, Vault Sessions and his own imprint Kybera. This dual perspective allows him to approach each project not only with technical precision, but with a clear sensitivity to the artistic vision behind the music.',
      'His mastering process focuses on clarity, translation and impact, ensuring tracks retain their character while performing at a professional standard across club systems and streaming platforms.',
      'Known for his collaborative approach and attention to detail, he works closely with artists to deliver results that feel true to their intent while meeting the demands of modern electronic music.',
    ],
    role: 'Mastering Engineer',
    promoLinks: [
      { label: 'MASTERING & TEACHING', url: 'https://www.kabaymusic.com/' },
      { label: 'INSTAGRAM', url: 'https://www.instagram.com/kabay._/' },
      { label: 'SOUNDCLOUD', url: 'https://soundcloud.com/kabay_music' },
      { label: 'ALL LINKS (LINKTREE)', url: 'https://linktr.ee/kabay_music' },
    ],
  },
  {
    name: 'Andrija Radojevic',
    slug: 'andrija',
    image: '/images/team/andrija-left.webp',
    imageTopRight: '/images/team/andrija-tr.webp',
    imageBottomRight: '/images/team/andrija-br.webp',
    bio: 'Andrija can be described as a photographer, but what truly drives him is the fusion of nature and art through the lens. Every frame he captures seeks to reveal the beauty of the world around us—the subtle details and fleeting moments often overlooked in the rush of modern life. An adventurer at heart, he is constantly in search of new horizons and adrenaline-filled challenges. His passion for photography grew while spending time in untouched nature, exploring mountains, lakes, and uncharted paths.',
    role: 'Photographer',
    promoLinks: [
      { label: 'INSTAGRAM', url: 'https://www.instagram.com/andrija420/' },
    ],
  },
];
