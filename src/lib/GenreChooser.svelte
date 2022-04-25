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
  <h3>Genres:</h3>
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
  }

  h3 {
    font-size: 1.7rem;
    font-weight: 500;
  }

  :global(div.multiselect) {
    width: 465px;
    height: 40px;
  }

  :global(div.multiselect > ul.selected > li) {
    /* selected list items */
    background-color: #ff8e3c;
  }
</style>
