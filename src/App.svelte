<script lang="ts">
  import { onMount } from 'svelte';
  import RandomAnime from './lib/randomAnime.svelte';
  import { genresStore, genres, randomSelectedAnimeStore, randomSelectedAnime } from './store';

  onMount(async () => {
    //https://api.jikan.moe/v4/anime/1
    //https://api.jikan.moe/v4/genres/anime
    fetch("https://api.jikan.moe/v4/genres/anime")
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse)
      genresStore.set(jsonResponse);
    }).catch(error => {
      console.log(error);
      return [];
    });
  });

  const getRandomAnime = () => {
    //if any genre has been marked:
      //Get random anime based on choosen genres
      //https://api.jikan.moe/v4/anime?genres=27
    //else
    //get completely random anime
    fetch("https://api.jikan.moe/v4/random/anime")
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse.data)
      randomSelectedAnimeStore.set(jsonResponse);
    }).catch( error => {
      console.log(error);
      return [];
    })
  }

  //maybe have some sort of recommendation button too!
  //https://api.jikan.moe/v4/recommendations/anime

</script>

<main>
  <h1>Any favorite genre?</h1>
  <section>
    {#each $genres as genre}
      <div>
        {genre.name}
      </div>
    {/each}
  </section>
  
  <button on:click={getRandomAnime}>Get a random Anime!</button>
  
  {#if $randomSelectedAnime}
    <RandomAnime randomSelectedAnime={randomSelectedAnime}/>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  section {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
