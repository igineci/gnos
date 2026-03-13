import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import contentCollections from '@content-collections/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), contentCollections()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
