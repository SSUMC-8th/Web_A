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
