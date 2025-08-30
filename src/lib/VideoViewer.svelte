<script>
    let { src } = $props();
</script>

<video controls playsinline loop>
  <source {src} type="video/mp4" /> 
  <!-- MUST ADD SOURCE AND TYPE B/C on mobile the element is Content-Type: text/html which prevents rendering -->
  <track kind="captions" />
</video>