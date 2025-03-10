import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.test.ts'],
        globals: true,
        environment: 'jsdom',
        setupFiles: ['vitest.setup.ts'],
        coverage: {
            reporter: 'lcov',
            exclude: ['docs/**', '.trunk/**', '.svelte-kit/**', 'tests/**', 'src/routes/**']
        },
        reporters: ['verbose', ['junit', { outputFile: './junit-vitest.xml' }]]
    },
    resolve: {
        conditions: mode === 'test' ? ['browser'] : []
    }
}))
