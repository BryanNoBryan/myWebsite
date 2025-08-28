
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/aboutme" | "/projects" | "/projects/programming" | "/projects/robotics";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/aboutme": Record<string, never>;
			"/projects": Record<string, never>;
			"/projects/programming": Record<string, never>;
			"/projects/robotics": Record<string, never>
		};
		Pathname(): "/" | "/aboutme" | "/aboutme/" | "/projects" | "/projects/" | "/projects/programming" | "/projects/programming/" | "/projects/robotics" | "/projects/robotics/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.nojekyll" | "/robots.txt" | "/triangle-black.svg" | "/triangle-white.svg" | string & {};
	}
}