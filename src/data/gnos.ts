import { sortedReleases } from '@/lib/releases';
import { TEAM_MEMBERS } from './teamMembers';
import { TARENS_SHARED } from './sharedPeople';

/** Slug-friendly string from display name */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export type Person = {
  name: string;
  slug: string;
  image?: string;
  /** Optional separate image for top-right slot; falls back to image if not set. */
  imageTopRight?: string;
  /** Optional separate image for bottom-right slot; falls back to image if not set. */
  imageBottomRight?: string;
  subtitle?: string;
  bio?: string;
  country?: string;
  activeSince?: string;
  labels?: string;
  /** Q&A for artists; not used for team members. */
  interview?: { q: string; a: string }[];
  /** Role/title for team members; not used for artists. */
  role?: string;
  promoLinks?: { label: string; url: string }[];
};

export type GnosArtist = Pick<Person, 'name' | 'image'>;

const DEFAULT_BIO =
  'Rooted in the underground since early days, exploring the deeper layers of hypnotic techno. Sound merges driving rhythms, deep atmospheres and evolving textures.';
const DEFAULT_INTERVIEW: { q: string; a: string }[] = [
  {
    q: 'What inspired your path into techno production?',
    a: 'The hypnotic energy of artists who focus on texture and depth reshaped the way I understood rhythm and sound design.',
  },
  {
    q: 'How do you approach creating a new track?',
    a: 'I start with atmosphere. Layers, frequencies, movement. I build slowly, letting the track breathe. Each element has to serve the journey.',
  },
];
const DEFAULT_PROMO_LINKS: { label: string; url: string }[] = [
  { label: 'BANDCAMP', url: '#' },
  { label: 'SPOTIFY', url: '#' },
  { label: 'SOUNDCLOUD', url: '#' },
  { label: 'INSTAGRAM', url: '#' },
  { label: 'BEATPORT', url: '#' },
  { label: 'RESIDENT ADVISOR', url: '#' },
];

/** Per-artist overrides (interview, bio, images, etc.) keyed by slug. */
const ARTIST_OVERRIDES: Partial<
  Record<string, Partial<Pick<Person, 'image' | 'imageTopRight' | 'imageBottomRight' | 'bio' | 'interview' | 'activeSince' | 'country' | 'labels' | 'promoLinks'>>>
> = {
  anoy: {
    image: '/images/artists/gnosva001/anoy-left.webp',
    imageTopRight: '/images/artists/gnosva001/anoy.webp',
    imageBottomRight: '/images/artists/gnosva001/anoy-br.webp',
    bio: 'Born in Montenegro and based in Belgrade/Serbia, Anoy emerged in 2020 with a clear and uncompromising vision of techno. His releases on labels such as Crisis of Man, Märked, KKULA, and many others showcase a fast-paced, hypnotic and forward-driven sound designed for intense dancefloor moments. His work quickly caught the attention of the scene, gaining support from many leading artists and tastemakers in contemporary techno.',
    country: 'RS',
    activeSince: '2020',
    interview: [
      {
        q: "What does the name 'ANOY' represent to you?",
        a: "The name Anoy doesn't really have a deep or specific meaning, but it means a lot to me personally. I've been using it since I was very young through different activities like gaming and graffiti, and it simply stayed with me. Over time it became part of my identity. When I think about the name now, it reminds me of how much I've grown and changed, and of everything I've managed to achieve in my music career after many years of working under the same name.",
      },
      {
        q: 'Why did you start producing music?',
        a: "When I was 15, about 11 years ago, I was introduced to techno music for the first time. I was very lucky because the artists I discovered early on were pioneers like Jeff Mills, Robert Hood and Plastikman. I also had the opportunity to hear many of these artists play live, which left a huge impression on me. I immediately fell in love with the raw, hypnotic and uncompromising sound of the genre. It made me feel something I had never experienced while listening to other kinds of music. Not long after that, when I was 16, I decided to start experimenting with music production and learning how to create my own tracks. At the same age I had my first DJ gig in my hometown, playing for around 100 people. The reactions and feedback I received were incredible, and that was the moment when I truly realized that this is something I want to dedicate my life to.",
      },
      {
        q: 'Is there something you are still searching for in your sound?',
        a: "Yes, definitely. I'm constantly searching for new directions in my music and always trying to improve my sound — from sound design and mixing to overall musical ideas. I believe that with music and technology constantly evolving, you never really stop learning. That's why I enjoy experimenting with new sounds and approaches while still trying to maintain a recognizable signature in my productions.",
      },
    ],
  },
  crynn: {
    image: '/images/artists/gnosva001/crynn-left.webp',
    imageTopRight: '/images/artists/gnosva001/crynn-tr.webp',
    imageBottomRight: '/images/artists/gnosva001/crynn-br.webp',
    bio: 'CRY.NN is a young artist hailing from the Bohemian periphery. He has found his intuitive approach to techno and genres beyond on the viewfinder of the most prominent imprints of the modern hard techno scene. His discography features releases on prominent labels such as The Meaning Of Rave, SINDEX, Flesh and Hammers, and Childsplay, showcasing his ability to reflect his surrounding environment with violent and flashy sounds. His influence on the scene can be also seen from his newly founded imprint Neuphoria, which he founded with Swiss mastermind .wav_909; both are giving the spotlight to unique and precise sonic art.',
    country: 'CZ',
    labels: 'THE MEANING OF RAVE, SINDEX, FLESH AND HAMMERS, CHILDSPLAY, NEUPHORIA',
    interview: [
      {
        q: 'What is something you wish you knew when you started doing music?',
        a: "Knowing that following trends will lead only to forcing myself to create things I dont like. It just is not natural to force yourself to do stuff others crave for. Knowing that making art is about letting yourself flow in the process is a mindset I have come to my knowledge just recently.",
      },
      {
        q: "What was the inspiration behind AERIAL I?",
        a: "I realized I stopped listening to techno (with few exceptions) completely in my free time, but discovering producers like Selective Response and marathoning Dax J's releases made me come back to something I was lacking in general in the scene for a while. Just uncompromising, driving yet uplifting experience. Aerial I is definitely a throwback to the times I started listening to techno with addition of oldschool trance vibes.",
      },
      {
        q: 'What is something about your music that listeners might not immediately notice?',
        a: "Thats a very tough question because I can only think of what people can actually notice when theyre listening to me haha, however I think not many people realize that my discography is massive in comparison to other producers my age. They might also listen to techno tracks only, which I started to release primarily for a while now, but I have tons of other productions in various genres scattered on the internet.",
      },
    ],
  },
  essio: {
    image: '/images/artists/gnosva001/essio-left.webp',
    imageTopRight: '/images/artists/gnosva001/essio-tr.webp',
    imageBottomRight: '/images/artists/gnosva001/essio-br.webp',
    bio: 'Essio is a Producer and DJ from Serbia. The first encounter with techno happened in the eighth grade, when he described it as "boring music". Only later, under the influence of his older brother, he gave it a try and slowly started Djing. Sharp and unusual rhythms and euphoric melodies of fast tempo tracks got his attention. He reached a turning point and became a techno DJ. He still doesn\'t have a specific musical direction, likes to delve into unknown genres of electronic music and loves to experiment with different sounds. His current attention is primarily on the quick rhythms and smooth grooves. He uses persistent 3–4 deck action while continuously improvising. He sees music as a salvation from reality and boring everyday life, and the accumulated amount of energy, which is constantly increasing, is the reason for that fast tempo in his sets, because that fast rhythm contributes to the discharge of that energy. In addition to DJing, Essio runs a label and project called Manevarim with friends. In 2024, he released an EP titled I Should Run a Shitpost Page on the label, contributed to a VA release from the Grab The Groove Collective, and released a track on the second VA release by Kongres, an up-and-coming label from Croatia.',
    country: 'RS',
    labels: 'MANEVARIM, GRAB THE GROOVE COLLECTIVE, KONGRES',
    activeSince: '2020',
    promoLinks: [
      { label: 'INSTAGRAM', url: 'https://www.instagram.com/_essio_/' },
      { label: 'SOUNDCLOUD', url: 'https://soundcloud.com/essio1' },
      { label: 'RESIDENT ADVISOR', url: 'https://ra.co/dj/essio' },
      { label: 'BOOKINGS', url: 'mailto:essiomusic1@gmail.com' },
      { label: 'LINKTREE', url: 'https://linktr.ee/essio' },
    ],
    interview: [
      {
        q: 'Why did you start producing music?',
        a: "As I mentioned earlier, I first got into music through the influence of my older brother. He introduced me to that world and showed me a lot of the music that shaped my taste early on. My entry into production, though, happened during the COVID period. Like many people at the time, I suddenly had a lot of free time and honestly didn't know what to do with myself. I started experimenting in FL Studio completely blindly, no tutorials, no guidance, just clicking around and trying things out on old computer speakers. Later, for my 18th birthday, my parents bought me my first pair of studio monitors, and that's when things became more serious. I started approaching production and music in general much more intentionally. It's also worth mentioning that before techno, I was very fascinated by film scores and sound design. For a while I even considered studying that at university. That interest definitely played a role in shaping both my sound and my overall curiosity toward music.",
      },
      {
        q: 'What keeps you searching for new sounds instead of repeating what already works?',
        a: "Mostly monotony and repetition. I like to keep learning and stepping into the unknown. Of course, there's always that saying, if something works, don't change it, and there's definitely truth in that. But at the same time, I try not to limit myself to one formula. I don't only produce techno. I also make ambient music, different kinds of compositions, and sometimes explore breakbeat and electro. Because of that, I'm constantly learning new approaches and techniques across different genres. The interesting part is bringing those ideas back into techno and combining them into one whole. Technology also plays a big role in this. Both we and the tools we use evolve every day, and new technologies constantly open up new possibilities for manipulating sound in more creative and interesting ways. That evolution naturally pushes me to keep exploring rather than repeating the same ideas.",
      },
      {
        q: "Do you and your brother influence each other's sound, or do you try to stay independent from one another?",
        a: "From my perspective, it's both yes and no. If it wasn't for my brother, I probably wouldn't have become a DJ or a producer in the first place. He was the one who introduced me to that world and showed me the way haha. Anyway, in terms of sound, I'd say we complement each other more than we directly influence one another. Especially when we work together, our approaches tend to balance out. He works much more intuitively, following feeling and instinct, while I tend to approach things in a more rational, almost mathematical way. But that difference is actually what makes it work. It's not only true in music but in life in general, we complement each other and keep pushing each other to grow.",
      },
    ],
  },
  tarens: {
    ...TARENS_SHARED,
    promoLinks: [...TARENS_SHARED.promoLinks],
    country: 'RS',
    labels: 'OTIUM RECORDS, MANEVARIM, KKULA, KIBERNET KRIMINALITÄT, NEUPHORIA',
    interview: [
      { q: 'Who/what inspires you visually?', a: 'Answer to be added.' },
      { q: 'What does uncertainty mean in your creative process?', a: 'Answer to be added.' },
      { q: 'What motivates you to keep moving forward?', a: 'Answer to be added.' },
    ],
  },
};

function toPerson(
  name: string,
  image: string | undefined,
  slug: string,
  overrides?: Partial<Pick<Person, 'image' | 'imageTopRight' | 'imageBottomRight' | 'subtitle' | 'bio' | 'country' | 'activeSince' | 'labels' | 'interview' | 'promoLinks'>>
): Person {
  return {
    name,
    slug,
    image: overrides?.image ?? image,
    imageTopRight: overrides?.imageTopRight,
    imageBottomRight: overrides?.imageBottomRight,
    subtitle: overrides?.subtitle ?? 'GNOS / ASCETIC LIMITED',
    bio: overrides?.bio ?? DEFAULT_BIO,
    country: overrides?.country ?? 'RO',
    activeSince: overrides?.activeSince ?? '2018',
    labels: overrides?.labels ?? 'GNOS / ASCETIC',
    interview: overrides?.interview ?? DEFAULT_INTERVIEW,
    promoLinks: overrides?.promoLinks ?? DEFAULT_PROMO_LINKS,
  };
}

export function getFeaturedArtists(): Person[] {
  const release = sortedReleases.find((r) => r.slug === 'ignorantia');
  const artists = release?.artists ?? [];
  return artists.map((a) => {
    const slug = nameToSlug(a.name);
    return toPerson(a.name, a.image, slug, ARTIST_OVERRIDES[slug]);
  });
}

export function getTeamMembers(): Person[] {
  return TEAM_MEMBERS;
}

export function getArtistBySlug(slug: string): Person | undefined {
  return getFeaturedArtists().find((p) => p.slug === slug);
}

export function getTeamMemberBySlug(slug: string): Person | undefined {
  return getTeamMembers().find((p) => p.slug === slug);
}
