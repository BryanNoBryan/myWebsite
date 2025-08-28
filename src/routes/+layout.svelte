<script>
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { onMount } from "svelte";
  import { navBarHeight } from "$lib/shared.svelte.js";

  let { children } = $props();

  let navbar;
  

  onMount(() => {
    // Get the height of the navbar after it's rendered
    console.log('anythign');
    console.log(`navbar ${navbar}`);
    navBarHeight.height = navbar.offsetHeight;
    console.log(`layout navbarheight ${navBarHeight.height}`);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div bind:this={navbar} class="navbar bg-base-100 shadow-sm">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Bryan Liu</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/projects">Projects</a></li>
    </ul>
  </div>
</div>

{@render children?.()}
