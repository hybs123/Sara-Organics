import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: '/src/main.jsx',
      output: {
        manualChunks: (id) => {
          // Split vendor and specific libraries into separate chunks
          if (id.includes('node_modules')) {
            return 'vendor'; // All node_modules in a separate chunk
          }
          if (id.includes('src/components')) {
            return 'components'; // Split components into their own chunk
          }
          if (id.includes('src/utils')) {
            return 'utils'; // Split utility functions into their own chunk
          }
          // Add more conditions as necessary
        },
      },
    },
    chunkSizeWarningLimit: 800, // Increase chunk size limit further
  },
});
