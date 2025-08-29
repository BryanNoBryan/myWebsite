<script>
    import Animation from '$lib/Animation.svelte';
    import { onMount } from 'svelte';
    import { navBarHeight } from "$lib/shared.svelte.js";
    import { base } from '$app/paths';
    import { isMobile } from '$lib/isMobile.js';

    let mobile = $state(isMobile());

    function update() {
        mobile = isMobile();
        console.log(`mobile ${mobile}`);
    }

    onMount(() => {
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    });
</script>

<div class='w-full flex flex-row' style='height: calc(100vh - {navBarHeight.height}px);'>
    {#if !mobile}
    <div class='flex-1'>
        <Animation size=40 speed=1 count=20 interval=30 />
    </div>
    {/if}
    <div class='glass rounded-lg flex-5 flex {!mobile ? 'flex-row' : 'flex-col'} justify-items-center justify-center m-4 p-4'>
        <div class='flex-1 flex flex-col justify-center justify-items-center m-4 p-4'>
            <div class='prose'>
                <h1>Hi, my name is</h1>
                <h1 class="text-5xl font-bold text-white [text-shadow:0_0_10px_rgba(59,130,246,0.9)]">Bryan Liu</h1>
                <h4>Developer for Fun</h4>
                <h4>Experience with full-stack development and robotics. 
                    I love <code>SvelteKit</code></h4>
            </div>
            <div class='flex flex-row justify-start'>
                <div class='mb-2 mr-2 mt-2'>
                <a href='https://github.com/BryanNoBryan'>
                    <img
                        src="{base}/svg/github.svg"
                        alt='github'
                        class=''
                        height=30
                        width=30
                    />
                </a>
                </div>
                <div class='m-2'>
                <a href='https://www.linkedin.com/in/bryan-liu-b880b8270'>
                    <img
                        src="{base}/svg/linkedin.svg"
                        alt='linkedin'
                        class=''
                        height=30
                        width=30
                    />
                </a>
                </div>
            </div>
        </div>
        <div class="flex-1 h-full flex flex-col justify-center m-4 p-4">
            <div class='h-1/2 flex flex-col justify-items-center justify-evenly'>
                <a href='{base}/projects' class="btn btn-primary">Projects</a>
                <a href='{base}/aboutme' class="btn btn-secondary">About Me</a>
                <a class="btn btn-warning" target="_blank" href='https://www.youtube.com/watch?v=grd-K33tOSM'>Do not Press</a>
            </div>
        </div>
    </div>
    {#if !mobile}
    <div class='flex-1'>
        <Animation size=40 speed=1 count=20 interval=30 />
    </div>
    {/if}
</div>
<div class='flex flex-row justify-center-safe'>
<h4>among us</h4>
</div>