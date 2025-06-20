import type { MovieLanguage } from '@/types/Movie';

export const LANGUAGE_OPTIONS_VALUES: Record<
  'KOREAN' | 'ENGLISH' | 'JAPANESE',
  MovieLanguage
> = {
  KOREAN: 'ko-KR',
  ENGLISH: 'en-US',
  JAPANESE: 'ja-JP',
};

export const LANGUAGE_OPTIONS = [
  { value: 'ko-KR', label: '한국어' },
  { value: 'en-US', label: 'English' },
  { value: 'ja-JP', label: '니혼말' },
];

export const IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const IMAGE_SIZE = {
  SMALL: 'w185',
  MEDIUM: 'w342',
  LARGE: 'w500',
  XL: 'w780',
  ORIGINAL: 'original',
} as const;

export type ImageSize = keyof typeof IMAGE_SIZE;

export const getPosterUrl = (path: string, size: ImageSize = 'LARGE') =>
  `${IMAGE_BASE}/${IMAGE_SIZE[size]}${path}`;
