import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: [
    //     { find: '#', replacement: '/src' },
    //     { find: '#apis', replacement: '/src/apis' },
    //     { find: '#components', replacement: '/src/components' },
    //     { find: '#constants', replacement: '/src/constants' },
    //     { find: '#context', replacement: '/src/context' },
    //     { find: '#layout', replacement: '/src/layout' },
    //     { find: '#pages', replacement: '/src/pages' },
    //     { find: '#schemas', replacement: '/src/schemas' },
    //     { find: '#types', replacement: '/src/types' },
    //     { find: '#utils', replacement: '/src/utils' },
    // ],
    alias: [
      { find: '#', replacement: path.resolve(__dirname, 'src') }, // 루트
      { find: '#apis', replacement: path.resolve(__dirname, 'src/apis') },
      {
        find: '#components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '#hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: '#constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: '#context',
        replacement: path.resolve(__dirname, 'src/context'),
      },
      {
        find: '#layout',
        replacement: path.resolve(__dirname, 'src/layout'),
      },
      {
        find: '#pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '#schemas',
        replacement: path.resolve(__dirname, 'src/schemas'),
      },
      {
        find: '#types',
        replacement: path.resolve(__dirname, 'src/types'),
      },
      {
        find: '#utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
    ],
  },
});
