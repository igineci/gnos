import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const tracklistItemSchema = z.object({
  title: z.string(),
  artist: z.string(),
  duration: z.string().optional(),
});

const artistSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
  image: z.string().optional(),
});

const creditSchema = z.object({
  role: z.string(),
  name: z.string(),
});

const releases = defineCollection({
  name: "releases",
  directory: "src/data/releases",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    type: z.enum(["album", "ep", "va"]),
    catalogNumber: z.string(),
    releaseDate: z.string(),
    coverArt: z.string(),

    tracklist: z.array(tracklistItemSchema),

    artist: z.string().optional(),
    artists: z.array(artistSchema).optional(),

    bandcampUrl: z.url().optional(),
    bandcampEmbedId: z.string().optional(),

    format: z.string().optional(),
    mastering: z.string().optional(),
    artwork: z.string().optional(),

    soundcloudUrl: z.url().optional(),
    spotifyUrl: z.url().optional(),
    beatportUrl: z.url().optional(),

    credits: z.array(creditSchema).optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return { ...document, mdx };
  },
});

export default defineConfig({
  content: [releases],
});
