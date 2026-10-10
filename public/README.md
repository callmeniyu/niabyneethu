## Asset locations used by the page

Copy the supplied files into this `public` directory using these names:

- `hero1.png` — mobile hero image.
- `hero2.png` — desktop hero image.
- `video1.mp4` through `video4.mp4` — the four short, muted autoplay product clips.
- `images/sarees.png`, `images/kurtis.png`, and `images/tops-and-sets.png` — wardrobe category images.

If the originals have different filenames or formats, either rename them to these paths or update the references in `components/showcase.tsx` and `app/asset-overrides.css`.

For the full-width “Little things, lovely things” film, keep a high-resolution landscape export for desktop (at least 1920×1080) and a portrait crop for mobile (at least 1080×1920). Use separate `<source media="...">` entries so each screen gets the right crop and resolution. A crisp poster image also helps before playback begins.
