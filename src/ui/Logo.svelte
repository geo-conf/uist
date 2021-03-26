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

<!-- hadow-sm mb-3 mr-1 -->

<img
  on:click={forward}
  src={imgSrc}
  alt={imgSrc}
  class="rounded border border-primary bg-white rounded"
  class:unselected={!selected} />

<style>
  img {
    width: 100%;
  }
  .unselected {
    filter: grayscale(100%);
  }
</style>
