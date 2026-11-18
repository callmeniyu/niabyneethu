const DEFAULT_CLOUDINARY_VIDEOS = {
  video1: "https://res.cloudinary.com/wintaphy/video/upload/v1794985889/video1.mp4",
  video2: "https://res.cloudinary.com/wintaphy/video/upload/v1794985883/video2.mp4",
  video3: "https://res.cloudinary.com/wintaphy/video/upload/v1794985884/video3.mp4",
  video4: "https://res.cloudinary.com/wintaphy/video/upload/v1794985887/video4.mp4",
  background: "https://res.cloudinary.com/wintaphy/video/upload/v1794985884/bg_video.mp4",
} as const;

export const MEDIA_VIDEOS = {
  video1: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO1_URL?.trim() || DEFAULT_CLOUDINARY_VIDEOS.video1,
  video2: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO2_URL?.trim() || DEFAULT_CLOUDINARY_VIDEOS.video2,
  video3: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO3_URL?.trim() || DEFAULT_CLOUDINARY_VIDEOS.video3,
  video4: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO4_URL?.trim() || DEFAULT_CLOUDINARY_VIDEOS.video4,
  background:
    process.env.NEXT_PUBLIC_CLOUDINARY_BACKGROUND_VIDEO_URL?.trim() ||
    DEFAULT_CLOUDINARY_VIDEOS.background,
} as const;

export const MEDIA_IMAGES = {
  heroMobile: "/images/hero1.webp",
  heroDesktop: "/images/hero2.webp",
  texture: "/images/texture.webp",
  saree: "/images/saree1.webp",
  kurti: "/images/kurti1.webp",
  topsAndSets: "/images/top2.webp",
} as const;
