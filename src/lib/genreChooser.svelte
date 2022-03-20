<script lang="ts">
import { totalAnimes } from "../store";


    export let selectedGenres;
    export let genres;

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
    <h1>Any favorite genre?</h1>
    <section>
      {#each $genres as genre}
      <div on:click={() => handleSelectedGenres(genre.mal_id)}>
        {genre.name}
      </div>
      {/each}
    </section>
</main>

<style lang="scss">

main {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #0d0d0d;
  }

section {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 350px;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
  }

div {
    cursor: pointer;
}

</style>