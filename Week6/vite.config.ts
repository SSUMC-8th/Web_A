import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }, // 루트
      { find: '@apis', replacement: path.resolve(__dirname, 'src/apis') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      { find: '@context', replacement: path.resolve(__dirname, 'src/context') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@schemas', replacement: path.resolve(__dirname, 'src/schemas') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      {
        find: '@features',
        replacement: path.resolve(__dirname, 'src/features'),
      },
    ],
  },
});
