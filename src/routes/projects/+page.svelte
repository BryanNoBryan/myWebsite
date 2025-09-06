<script>
    import { base } from "$app/paths";
    import { projects, TYPES } from "$lib/projects";
    // const TYPES = ['programming', 'robotics'];
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { isSmall } from '$lib/isMobile.js';

    let small = $state(isSmall());

    function update() {
        small = isSmall();
        console.log(`isSmall ${isSmall}`);
    }

    onMount(() => {
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    });

    let type_state = $state([true, true]);

    // get unique list of years
    let years = $derived.by(() => {
      let year_arr = [];
      projects.forEach((proj) => {
        let type = proj.type;
        let i = TYPES.indexOf(type);
        if (type_state[i]) {
          let year = proj.year;
          if (!year_arr.includes(year)) {
            year_arr.push(year);
          }
        }
      });
      return year_arr;
    });

    let projects_map = $derived.by(() => {
      let map = new Map();
      projects.forEach((proj) => {
        let type = proj.type;
        let i = TYPES.indexOf(type);
        if (type_state[i]) {
          let year = proj.year;
          let title = proj.title;
          let desc = proj.desc;
          let icons = proj.icons.map((icon) => `${base}/svg/${icon}.svg`);
          let mdsvex = `${base}/projects/${proj.mdsvex}`;
          let image = `${base}/images/${proj.image}`;
          let star = proj.star;
          
          let card_data = ({title, desc, icons, mdsvex, image, star}); 

          //new key
          if (!map.has(year)) {
            map.set(year, [card_data]);
          } else {
            map.get(year).push(card_data); 
          }
        }
      });
      return map;
    });

    function updateTypes(i) {
      type_state[i] = !type_state[i];
    }

    let list = [1,2,3];
</script>

<div class="flex flex-row justify-center p-2 m-2">
    <div class='prose'><h2 class=''>Toggle</h2></div>
</div>
<div class="flex flex-row justify-center">
    <button onclick={() => updateTypes(0)} class="{type_state[0] ? 'btn' : 'btn btn-outline'} btn-accent">Programming</button>
    <div class='w-8'></div>
    <button onclick={() => updateTypes(1)} class="{type_state[1] ? 'btn' : 'btn btn-outline'} btn-info">Robotics</button>
</div>

<!-- flex-row for desktop, flex-col for mobile -->
<div class="{!small ? 'm-8' : 'm-1'}">
  <ul class="timeline timeline-vertical timeline-snap-icon timeline-compact">
    {#each years as year}
      <li class=''>
        {#if !(years.indexOf(year) == 0)}
          <hr />
        {/if}
        <div class="timeline-start">{year}</div>
        <div class="timeline-middle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5" >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="timeline-end timeline-box flex flex-row flex-wrap">
          <!-- start card -->
          {#each projects_map.get(year) as proj}
            <a href={proj.mdsvex} class="card bg-base-200 hover:bg-base-300 {!small ? 'w-96' : 'w-75'} shadow-lg p-1 m-2  transition-transform duration-200 ease-in-out hover:scale-102" transition:slide={{axis: 'y'}}>
              <figure>
                <img
                  src={proj.image}
                  alt="project" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">
                  {proj.title}
                  {#if proj.star}
                  <div class="badge badge-secondary">⭐</div>
                  {/if}
                </h2>
                <p>{proj.desc}</p>
                <div class='flex flex-row justify-center'>
                  {#each proj.icons as icon}
                    <div class="{!small ? 'm-5' : 'm-2'}">
                      <img
                        src={icon}
                        alt='language/tool icon'
                        class='filter drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] '
                        height={!small ? 25 : 20}
                        width={!small ? 25 : 20}
                      />
                    </div>
                  {/each}
                </div>
              </div>
            </a>
          {/each}
          <!-- end card -->
        </div>
        {#if !(years.indexOf(year) == years.length - 1)}
          <hr />
        {/if}
      </li>
    {/each}
  </ul>
</div>

