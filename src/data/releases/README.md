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
   - Replace the placeholder text in the MDX body with release story, artist bios, etc. Standard Markdown in the body is rendered on the release page (`ReactMarkdown`).
   - **GNOS accent color:** wrap any inline phrase with `[[gnos]]` and `[[/gnos]]` to show it in label turquoise (still supports `*italic*` and `**bold**` inside the wrap). You can put spaces inside the markers or after `[[/gnos]]`; the page inserts a word space after each highlight where Markdown would drop it.
   - **New paragraph before another `[[gnos]]`:** leave a **blank line** (or a line that is only spaces) before the tag; the release page detects that and adds paragraph spacing before the next highlight.

   ```md
   Normal text. [[gnos]]This line uses GNOS color.[[/gnos]] More text.
   ```
