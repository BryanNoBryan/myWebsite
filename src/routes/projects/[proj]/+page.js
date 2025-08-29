import { projects } from '$lib/projects.js';

export async function load({ params }) {
	const proj = params.proj;

    const project = projects.find((item) => item.mdsvex == proj);

    console.log(proj);

    try {
        // Dynamically import the .svx file
        const post = (await import(`$lib/mdsvex/projects-svx/${proj}.svx`)).default;
        return { post, project };
    } catch (e) {
      // If file not found, redirect or 404
        return { status: 404 };
    }
}