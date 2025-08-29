import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdvexConfig from './mdsvex.config.js';

import path from 'node:path';
import { fileURLToPath } from "node:url";

console.log('default config: ' + path.join(path.resolve(fileURLToPath(import.meta.url), '../'), './src/lib/mdsvex/default-layout.svelte'));
console.log(`path ${process.argv.includes('dev') ? '' : '/myWebsite'}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdvexConfig.extensions],
    preprocess: [
        vitePreprocess(), mdsvex(mdvexConfig)
    ],
    kit: { 
        adapter: adapter({
            pages: 'docs',
            fallback: '404.html'
        }),
        paths: {
            relative: false,
            base: '/myWebsite' //process.argv.includes('dev') ? '' : 
            // I'll just keep base this way, it helps debug
        }

    },
    runes: true
};

export default config;
