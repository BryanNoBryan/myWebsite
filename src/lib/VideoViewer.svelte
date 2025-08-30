<script>
    let { src } = $props();
</script>

<video controls playsinline loop>
  <source {src} type="video/mp4" />
  <track kind="captions" />
</video>