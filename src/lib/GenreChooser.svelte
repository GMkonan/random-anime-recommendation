<script lang="ts">
  import { selectedGenres, totalAnimes } from "../store";

  import MultiSelect from "svelte-multiselect";
  export let genres;
  let selected = [];
  let checked = false;

  const handleSelectedGenres = (selecteds) => {
    selectedGenres.set(selecteds.map((s) => s.value));
  };
</script>

<main>
  <MultiSelect
    on:add={() => handleSelectedGenres(selected)}
    on:remove={() => handleSelectedGenres(selected)}
    bind:selected
    options={$genres.map((genre) => ({
      label: genre.name,
      value: genre.mal_id,
    }))}
  />
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  :global(div.multiselect) {
    width: 500px;
    height: 40px;
  }

  :global(div.multiselect > ul.selected > li) {
    /* selected list items */
    background-color: #ff8e3c;
  }
</style>
