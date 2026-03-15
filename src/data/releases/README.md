# Releases Content

MDX files in this folder define releases. Each file is validated against the schema in `content-collections.ts`.

## IGNORANTIA (GNOS001)

**File:** `gnos001-ignorantia.mdx`

### Data to provide

1. **Cover art**
   - Add image to `public/covers/` as a `.webp` file (e.g. `ignorantia.webp`)
   - Update `coverArt` in the MDX frontmatter to `/covers/ignorantia.webp`

2. **Tracklist**
   - Add tracks under `tracklist:` in frontmatter:
   ```yaml
   tracklist:
     - title: "Track Name"
       artist: "Artist Name"
       duration: "6:42"
   ```

3. **Artists** (for VA)
   - Update `artists` with real names and optional bios:
   ```yaml
   artists:
     - name: "Artist One"
       bio: "Short bio..."
     - name: "Artist Two"
   ```

4. **Bandcamp** (when tracks are out)
   - Add `bandcampUrl` and `bandcampEmbedId` to frontmatter
   - `bandcampEmbedId` = the numeric album ID from the Bandcamp embed URL

5. **Release date**
   - Update `releaseDate` to actual date (e.g. `2025-06-15`)

6. **Credits**
   - Add mastering, artwork, A&R, etc.:
   ```yaml
   credits:
     - role: "Mastering"
       name: "Name"
     - role: "Artwork"
       name: "Name"
   ```

7. **Editorial body**
   - Replace the placeholder text in the MDX body with release story, artist bios, etc. Supports full MDX (headings, lists, emphasis, etc.).
