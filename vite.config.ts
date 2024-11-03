/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        analyzer({
            analyzerMode: 'static',
            analyzerPort: 3001,
            defaultSizes: 'gzip',
            openAnalyzer: true,
        }),
    ],
    server: {
        port: 3000,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: ['./test.setup.ts'],
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
        },
    },
});
