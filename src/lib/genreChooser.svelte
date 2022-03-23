<script lang="ts">
import { totalAnimes } from "../store";

    import MultiSelect from 'svelte-multiselect'
    export let selectedGenres;
    export let genres;
    let selected = []
    let checked = false;

    const handleSelectedGenres = (genre_id) => {
        if(selectedGenres.includes(genre_id)) {
        selectedGenres.splice(selectedGenres.indexOf(genre_id), 1)
        } else {
        selectedGenres.push(genre_id)
        }

      const formatedGenreIds = selectedGenres.toString().split(" ").join(",") 
      fetch(`https://api.jikan.moe/v4/anime?genres=${formatedGenreIds}`)
      .then(response => response.json())
      .then(jsonResponse => {
        totalAnimes.set(jsonResponse.data.length)
      })
    }
</script>

<main>
  <MultiSelect 
  bind:selected 
  options={$genres.map((genre) => genre.name)} />
</main>

<style lang="scss">

main {
    display:flex;
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