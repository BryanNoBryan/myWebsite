import { F as ensure_array_like, x as attr, G as attr_style, J as stringify, v as pop, t as push } from "../../chunks/index.js";
import "clsx";
const navBarHeight = { height: 0 };
function Animation($$payload, $$props) {
  push();
  let { size, speed, count, interval } = $$props;
  const MAX_SIZE = size;
  let positions = [];
  const each_array = ensure_array_like(positions);
  $$payload.out.push(`<div class="relative w-full h-full" style="/* From https://css.glass */ background: rgba(255, 255, 255, 0.3); border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.3);"><!--[-->`);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let pos = each_array[i];
    $$payload.out.push(`<img src="/triangle-white.svg" alt="triangle" class="absolute filter drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"${attr("height", MAX_SIZE)}${attr("width", MAX_SIZE)}${attr_style(`left: ${stringify(pos.x - MAX_SIZE / 2)}px; bottom: ${stringify(pos.y - MAX_SIZE / 2)}px; transform: rotate(${stringify(pos.rot)}deg);`)}/>`);
  }
  $$payload.out.push(`<!--]--></div>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  console.log(`navbarHeight ${navBarHeight.height}`);
  $$payload.out.push(`<div class="w-full flex flex-row"${attr_style(`height: calc(100vh - ${stringify(navBarHeight.height)}px);`)}><div class="flex-1">`);
  Animation($$payload, { size: "40", speed: "4", count: "20", interval: "30" });
  $$payload.out.push(`<!----></div> <div class="glass rounded-lg flex-5 flex flex-row justify-items-center justify-center m-4 p-4"><div class="flex-1 flex flex-col justify-center justify-items-center m-4 p-4"><div class="prose"><h1>Hi, my name is</h1> <h1 class="text-5xl font-bold text-white [text-shadow:0_0_10px_rgba(59,130,246,0.9)]">Bryan Liu</h1> <h4>Developer for Fun</h4> <h4>Experience with full-stack development and robotics. 
                    I love <code>SvelteKit</code></h4></div></div> <div class="flex-1 h-full flex flex-col justify-center m-4 p-4"><div class="h-1/2 flex flex-col justify-items-center justify-evenly"><a href="/projects" class="btn btn-primary">Projects</a> <a href="/aboutme" class="btn btn-secondary">About Me</a> <a class="btn btn-warning" href="https://www.youtube.com/watch?v=grd-K33tOSM">Do not Press</a></div></div></div> <div class="flex-1">`);
  Animation($$payload, { size: "40", speed: "4", count: "20", interval: "30" });
  $$payload.out.push(`<!----></div></div> <div class="flex flex-row justify-center-safe"><h4>among us</h4></div>`);
  pop();
}
export {
  _page as default
};
