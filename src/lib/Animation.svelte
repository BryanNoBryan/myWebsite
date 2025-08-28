<script>
    let { size, speed, count, interval } = $props();

    import { onMount, tick } from 'svelte';
    import { navBarHeight } from "$lib/shared.svelte.js";
    

    let container;
    let width = 0;
    let height = 0;

    const MAX_SIZE = size;  //40
    const MARGIN = MAX_SIZE/1.3;
    const SPEED = speed; //4
    const COUNT = count; //20
    const INTERVAL = interval; //30 //ms

    let positions = $state([]);

    // when screen resizes
    function updateSize() {
        const rect = container.getBoundingClientRect();
        
        const prev_width = width;
        const prev_height = height;

        width = rect.width;
        height = rect.height;
        console.log(`width ${width} height ${height}`);

        const x_scale = width/prev_width;
        const y_scale = height/prev_height;

        // positions = positions.map((pos) => {
        //     return {
        //         x: pos.x * x_scale,
        //         y: pos.y * y_scale,
        //         rot: pos.rot
        //     }
        // });
        // YOU SHOULD MUTATE THE ARRAY, NOT REASSIGN IN B/C WE DO DEEP REACTIVITY
        for (const pos of positions) {
            pos.x *= x_scale;
            pos.y *= y_scale;
        }
        
        positions.forEach((pos) => {
            console.log(`pos.x ${pos.x}`);
            console.log(`pos.y ${pos.y}`);
        });
        // optionally update positions here
    }

    //randomize the movement
    function entropy() {
        for (const pos of positions) {
            let rad = pos.rot * Math.PI / 180;

            // Proposed movement
            let new_x = pos.x + SPEED * Math.cos(rad);
            let new_y = pos.y + SPEED * Math.sin(rad);

            // Check for collision BEFORE bounding
            let hitVertical = (new_x < MARGIN || new_x > width - MARGIN);
            let hitHorizontal = (new_y < MARGIN || new_y > height - MARGIN);

            if (hitVertical || hitHorizontal) {
                if (hitVertical && hitHorizontal) {
                    // Corner bounce
                    pos.rot = (pos.rot + 180) % 360;
                } else if (hitVertical) {
                    // Reflect horizontally
                    pos.rot = (180 - pos.rot) % 360;
                } else if (hitHorizontal) {
                    // Reflect vertically
                    pos.rot = (-pos.rot) % 360;
                }
                if (pos.rot < 0) pos.rot += 360;

                // Recalculate movement after reflection
                rad = pos.rot * Math.PI / 180;
                new_x = pos.x + SPEED * Math.cos(rad);
                new_y = pos.y + SPEED * Math.sin(rad);
            }

            // Finally, bound the result
            let bounded = bound({ x: new_x, y: new_y });
            pos.x = bounded.x;
            pos.y = bounded.y;
        }
    }

    // initialize the array with randoms
    function randomPosition() {
        //margin
        let x = width * Math.random();
        let y = height * Math.random();
        return {
            ...bound({x, y}),
            rot: Math.random() * 360.0
        };
    }

    // has some margin so it's a bit better
    function bound({x, y}) {
        return {
            x: Math.max(MARGIN, Math.min(width - MARGIN, x)),
            y: Math.max(MARGIN, Math.min(height - MARGIN, y))
        };
    }

    // gets dimensions + generate random init positions + resize listener
    onMount(async () => {
        //omg DOM measurement timing issue
        //without await tick(); the DOM already mounts the parent DIV
        //however, the sizing of the parent DIV from css is not yet been applied
        //so the height would instead be 100vh instead of subtracting the navbar
        //we we wait for tick() to finish to get accurate height
        await tick();

        const rect = container.getBoundingClientRect();
        
        width = rect.width;
        height = rect.height;
        console.log(`widht ${width} height ${height}`);
		
        positions = Array.from({ length: COUNT }, (_, i) => ({
            id: i,
            ...randomPosition()
        }));

        window.addEventListener("resize", updateSize);
        console.log(positions);

        const interval = setInterval(() => {
			entropy();
		}, INTERVAL);

        // onDestroy
        return () => {
            window.removeEventListener("resize", updateSize);
            clearInterval(interval);
        }
	});
</script>

<!-- i have an animation idea where these tiny triangles move around and leave 
dash trails behind them, when you click one of them they disappear and new one spawns -->


<div bind:this={container} class = 'relative w-full h-full' style='
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.3);
'>
    {#each positions as pos, i (pos.id)}
        <img
            src="/triangle-white.svg"
            alt='triangle'
            class='absolute filter drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] '
            height={MAX_SIZE}
            width={MAX_SIZE}
            style='left: {pos.x - MAX_SIZE/2}px;
                    bottom: {pos.y - MAX_SIZE/2}px;
                    transform: rotate({pos.rot}deg);'
        />
    {/each}
</div>
