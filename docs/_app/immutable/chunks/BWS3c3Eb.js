import"./DsnmJJEf.js";import"./BUwabaiJ.js";import{f as i,s as o,a1 as l,t as r,a as p,c as d,b as n}from"./TpHHFT-8.js";import{s as c}from"./0gT6S2XD.js";import{b as m}from"./BPOEwgWL.js";var g=i(`<p>This website is a playground for me to make a maintainable blog-oriented website.</p> <p>It is by design made easy to add on new blogs.</p> <p>Tools used:</p> <ul><li>SvelteKit</li> <li>mdsvex (.md to svelte build converter)</li> <li>daisyUI</li> <li>tailwindCSS</li> <li>Github Pages</li></ul> <p>I create a <code>projects.js</code> to hold general data for all my projects
and for the <code>/projects</code> page functionality and several .svx files(svelte .md files)
for each project page. Each page is by route parameters so it’s automatic. The <code>+page.js</code> imports the .svx, pulls projects.js, and loads it into <code>+page.svelte</code>. By
the time preprocessing is done, the .svx file is actually a svelte file, so I can
directly use it as a component, rendering this page.</p> <p>The only pitfall is that Svelte 5 runes update break the layout functionality,
and thus also frontmatter. Although I could use the depreciated <code>&lt;slot /&gt;</code> to
make it work, I rather wait for a mdsvex update(doesn’t seem like it’s happening, no
git commits since 3 months ago, dated. 8/28/25).</p> <p><img alt="among us"/></p>`,1);function y(a){var e=g(),t=o(l(e),12),s=d(t);n(t),r(()=>c(s,"src",`${m??""}/images/website1.png`)),p(a,e)}export{y as default};
