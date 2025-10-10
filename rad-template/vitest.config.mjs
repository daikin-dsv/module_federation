import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
        exclude: ['tests/e2e/*'],
        globals: true,
        setupFiles: ['./vitest.setup.ts']
    }
});
