/** Shared data for people who appear as both artists and team members. Avoids duplication. */

const TARENS_PROMO_LINKS: { label: string; url: string }[] = [
  { label: 'INSTAGRAM', url: 'https://www.instagram.com/tarens_tk/' },
  { label: 'SOUNDCLOUD', url: 'https://soundcloud.com/tarens' },
  { label: 'SPOTIFY', url: 'https://open.spotify.com/artist/7e3l3472m9Xx2nQdQw2pX3' },
  { label: 'LINKTREE', url: 'https://linktr.ee/tarens' },
];

export const TARENS_SHARED = {
  image: '/images/artists/gnosva001/tarens-left.jpg',
  imageTopRight: '/images/artists/gnosva001/tarens-tr.JPG',
  imageBottomRight: '/images/artists/gnosva001/tarens-br.JPG',
  bio: [
    'Tarens is a 25-year-old DJ and producer born in Serbia and based in Belgrade. Musically, he moves between raw, driving techno on one side and cinematic, industrial, and breakbeat-infused techno on the other. His productions aim to create a dark, provocative, and eerie atmosphere that captivates audiences and keeps their focus locked on the sound.',
    'Tarens has already built a solid discography with multiple releases on labels such as Otium Records, Manevarim, and KKula. He has also released two EPs—one on Kibernet Kriminalität and another on Neuphoria. Currently, he is dedicating countless hours in the studio, sharpening his craft and building an arsenal of new material. His growing catalog reflects his tireless pursuit of originality and uncompromising sound design.',
    'On stage, Tarens has left a mark at some of Serbia\'s most iconic nightclubs, including Drugstore, K9 Station, and Barutana, as well as other notable venues and clubs across the region. His festival appearances include Lovefest—one of Serbia\'s biggest electronic music festivals. ',
    'Driven by a constant desire to push boundaries, Tarens creates a unique auditory experience that challenges conventions and immerses the listener in evolving textures and sensations. His performances and productions act as a wormhole of sound, breaking free from the monotony of everyday life and embracing the freedom of artistic expression.',
],
  promoLinks: TARENS_PROMO_LINKS,
};
