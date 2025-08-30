<script>
	let { data } = $props();
    import { base } from '$app/paths';
    import { onMount } from 'svelte';

    let width = $state(screen.width);

    function update() {
        width = screen.width;
    }

    onMount(() => {
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    });

    let project = data.project;
    let icons = project.icons.map((icon) => `${base}/svg/${icon}.svg`);
</script>

<svelte:head>
    <title>{data.project.title}</title>
</svelte:head>

<div class='flex flex-row justify-center mt-6 p-4 w-{width}'>
    <div class='prose prose-xl max-w-full'>
        <div>
            <h1>{project.title}</h1>
            <h3>{project.year}</h3>
            <img src='{base}/images/{project.image}' alt="post's display" class='mb-0'>
            <div class='flex flex-row justify-center flex-wrap'>
                {#each icons as icon}
                    <div class='pl-8 pr-8'>
                        <img
                            src={icon}
                            alt='language/tool icon'
                            class='filter drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] mb-1 mt-8'
                            height={25}
                            width={25}
                        />
                    </div>
                {/each}
            </div>
        </div>
        <data.post/>
    </div>
</div>
