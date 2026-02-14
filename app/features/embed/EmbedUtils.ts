import { EmbedType } from "../../core/EditorTypes";

// Patterns for detecting embeddable URLs
const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const VIMEO_REGEX = /(?:vimeo\.com\/)(\d+)/;
const TWITTER_REGEX = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;

export interface EmbedInfo {
  type: EmbedType;
  embedUrl: string;
  originalUrl: string;
}

/**
 * Check if URL is embeddable (video/social media)
 */
export const isEmbeddableUrl = (url: string): boolean => {
  return (
    YOUTUBE_REGEX.test(url) || VIMEO_REGEX.test(url) || TWITTER_REGEX.test(url)
  );
};

/**
 * Parse URL and return embed info
 */
export const parseEmbedUrl = (url: string): EmbedInfo | null => {
  // YouTube
  const youtubeMatch = url.match(YOUTUBE_REGEX);
  if (youtubeMatch) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
      originalUrl: url,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(VIMEO_REGEX);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      originalUrl: url,
    };
  }

  // Twitter/X
  const twitterMatch = url.match(TWITTER_REGEX);
  if (twitterMatch) {
    return {
      type: "twitter",
      embedUrl: url,
      originalUrl: url,
    };
  }

  return null;
};

/**
 * Get YouTube video ID from URL
 */
export const getYouTubeId = (url: string): string | null => {
  const match = url.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
};

/**
 * Get Vimeo video ID from URL
 */
export const getVimeoId = (url: string): string | null => {
  const match = url.match(VIMEO_REGEX);
  return match ? match[1] : null;
};
