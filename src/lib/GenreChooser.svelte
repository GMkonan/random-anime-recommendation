<script lang="ts">
  import { selectedGenres, totalAnimes } from "../store";

  import MultiSelect from "svelte-multiselect";
  export let genres;
  let selected = [];
  let checked = false;

  const handleSelectedGenres = (selecteds) => {
    selectedGenres.set(selecteds.map((s) => s.value));

    //dont know if still gonna use this totalAnimes stuff
    //if you still want to use you should use the "count" that comes in the
    //JSON response
    
    // const formatedGenreIds = selectedGenres.toString().split(" ").join(",")
    // fetch(`https://api.jikan.moe/v4/anime?genres=${formatedGenreIds}`)
    // .then(response => response.json())
    // .then(jsonResponse => {
    //   totalAnimes.set(jsonResponse.data.length)
    // })
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
