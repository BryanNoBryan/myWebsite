

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": true,
  "trailingSlash": "never"
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.1eB_T56_.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BFc5VLPi.js","_app/immutable/chunks/BpB3c4U8.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/xxjaMA6k.js","_app/immutable/chunks/Dnt8ataS.js"];
export const stylesheets = ["_app/immutable/assets/0.D9MWjI_K.css"];
export const fonts = [];
