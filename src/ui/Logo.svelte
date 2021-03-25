<script>
  import { createEventDispatcher } from 'svelte';

  export let imgSrc;
  export let selected = false;
  export let id = 'uist';

  const dispatch = createEventDispatcher();

  function forward(event) {
    dispatch('click', { id });
  }
</script>

<span>
  <img
    on:click={forward}
    src={imgSrc}
    alt={imgSrc}
    class="rounded border border-primary hadow-sm mb-3 mr-1 bg-white rounded"
    class:unselected={!selected} />
</span>

<style>
  img {
    height: 7em;
  }
  .unselected {
    filter: grayscale(100%);
  }
</style>
