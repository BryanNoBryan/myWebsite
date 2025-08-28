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
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/aboutme",
				pattern: /^\/aboutme\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/projects/programming",
				pattern: /^\/projects\/programming\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/projects/robotics",
				pattern: /^\/projects\/robotics\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
