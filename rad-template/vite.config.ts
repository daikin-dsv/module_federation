import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        // Configure library build mode for web components
        lib: {
            entry: resolve(__dirname, 'app/webcomponents.ts'),
            name: 'WebComponents',
            fileName: 'webcomponents',
            formats: ['umd']
        },
        // Output to public directory for Next.js static serving
        outDir: 'public',
        // Enable source maps for debugging
        sourcemap: true,
        // Production optimizations
        minify: true,
        rollupOptions: {
            output: {
                // Ensure the bundle is named webcomponents.js
                entryFileNames: 'webcomponents.js'
            }
        },
        emptyOutDir: false // Don't clear public dir as Next.js uses it
    },
    // Ensure TypeScript compilation
    esbuild: {
        target: 'es2015'
    }
});
