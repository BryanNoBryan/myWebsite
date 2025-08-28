import adapter from '@sveltejs/adapter-static';

const basePath = process.argv.includes('dev') ? '' : '/myWebsite';
console.log('✅ Base path resolved to:', basePath);

/** @type {import('@sveltejs/kit').Config} */
const config = {
    
    kit: { 
        adapter: adapter({
            fallback: '404.html'
        }),
        paths: {
            relative: false,
            base: process.argv.includes('dev') ? '' : '/myWebsite'
        }

     },
    runes: true
};

export default config;
