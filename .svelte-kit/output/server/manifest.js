export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "myWebsite/_app",
	assets: new Set([".nojekyll","robots.txt","triangle-black.svg","triangle-white.svg"]),
	mimeTypes: {".txt":"text/plain",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.4KTArnPA.js",app:"_app/immutable/entry/app.k_0LvjV2.js",imports:["_app/immutable/entry/start.4KTArnPA.js","_app/immutable/chunks/Cr1sbySC.js","_app/immutable/chunks/BFc5VLPi.js","_app/immutable/chunks/BpB3c4U8.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/entry/app.k_0LvjV2.js","_app/immutable/chunks/BpB3c4U8.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BFc5VLPi.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dnt8ataS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/myWebsite/","/myWebsite/aboutme","/myWebsite/projects","/myWebsite/projects/programming","/myWebsite/projects/robotics"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
