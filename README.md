# Nia by Neethu — editorial showcase

A motion-led, single-page Next.js showcase built from the existing Nia by Neethu brand and product categories. Product and campaign imagery are temporary online placeholders. Every collection and contact call to action opens Instagram direct messages.

## Run locally

1. Install a current Node.js LTS release.
2. From this folder run `npm install` and then `npm run dev`.
3. Open the local address printed by Next.js.

## Before launch

- Replace the Unsplash images and Pexels video in `components/showcase.tsx` with Nia-owned campaign imagery and an approved short film. Confirm that you have permission to use every image and video.
- To populate “Watch & buy”, place the three Instagram reel videos as MP4 files at `public/videos/nia-reel-01.mp4`, `public/videos/nia-reel-02.mp4`, and `public/videos/nia-reel-03.mp4`, in the same order as the three reel links shared in the project brief. The cards use local, muted, looping video and keep visitors on the page. Instagram itself does not provide a reliable, unbranded autoplay player for this use.
- Check the displayed categories, descriptions, brand story and wording with Neethu. Add any confirmed fabric, fit, care or sizing information that should help visitors choose a piece.
- Confirm the Instagram username and direct-message link (`https://ig.me/m/nia_by_neethu`) open the intended account on desktop and mobile.
- Add the final contact details and the preferred language(s), if visitors should be able to reach the brand in more than one language.
- Choose the publishing host, connect the domain, and point `metadataBase`, canonical, sitemap and robots URLs in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` at the final public domain if it changes.
- Once the site is live, submit its sitemap to Google Search Console and Bing Webmaster Tools. Add analytics or a consent banner only if you choose to use tracking.

The page already includes responsive layouts, reduced-motion support, semantic headings, page metadata, Open Graph/Twitter metadata, a generated social-share image, a canonical URL, robots and sitemap routes, and Organization/ClothingStore structured data.

The current update adds a responsive mobile/desktop hero, a four-video muted autoplay “Watch & Buy” section, and a three-card wardrobe using local category image paths. Place the assets in the exact locations listed in `public/README.md`. The background film keeps its existing source; a desktop export at 1920×1080 or higher plus a separate 1080×1920 mobile crop will preserve sharpness and framing on both screens.
