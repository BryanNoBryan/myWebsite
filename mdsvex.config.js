import { defineMDSveXConfig as defineConfig } from "mdsvex";
import path from 'node:path';
import { fileURLToPath } from "node:url";

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const config = defineConfig({
    extensions: ['.md', '.svx'],
    // layout: {
    //     default: path.join(dirname, './src/lib/mdsvex/default-layout.svelte')
    // }, //currently layouts in svelte 5 ARE BROKEN due to $$props depreciation
    smartypants: {
        quotes: true,
        ellipses: true,
        backticks: false,
        dashes: 'inverted', //When 'inverted', converts two dashes into an em-dash, and three dashes into an en-dash.
    },
});

export default config;