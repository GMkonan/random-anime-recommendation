<script lang="ts">
  import { onMount } from 'svelte';
  import RandomAnime from './lib/randomAnime.svelte';
  import { genresStore, genres, randomSelectedAnimeStore, randomSelectedAnime } from './store';

  let selectedGenres = [];

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

  const handleSelectedGenres = (genre_id) => {
    if(selectedGenres.includes(genre_id)) {
      selectedGenres.splice(selectedGenres.indexOf(genre_id), 1)
    } else {
      selectedGenres.push(genre_id)
    }
  }

  const getRandomAnime = () => {
    //if any genre has been marked:
      //Get random anime based on choosen genres
      //https://api.jikan.moe/v4/anime?genres=27
    //else
    //get completely random anime
    if(selectedGenres.length !== 0) {
      const formatedGenreIds = selectedGenres.toString().split(" ").join(",")
      console.log(formatedGenreIds)
      fetch(`https://api.jikan.moe/v4/anime?genres=${formatedGenreIds}`)
      .then(response => response.json())
      .then(jsonResponse => {
        const selectRandom = Math.floor(Math.random() * jsonResponse.data.length)
        console.log(selectRandom)
        console.log(jsonResponse.data[selectRandom])
        randomSelectedAnimeStore.set(jsonResponse.data[selectRandom]);
      }).catch( error => {
        console.log(error);
        return [];
      })
    } else {
      fetch("https://api.jikan.moe/v4/random/anime")
      .then(response => response.json())
      .then(jsonResponse => {
        randomSelectedAnimeStore.set(jsonResponse.data);
      }).catch( error => {
        console.log(error);
        return [];
      })
    }
  }

  //maybe have some sort of recommendation button too!
  //https://api.jikan.moe/v4/recommendations/anime

</script>

<main>
  <div class="options">
    <div class="genre_chooser">
      <h1>Any favorite genre?</h1>
      <section>
        {#each $genres as genre}
        <div on:click={() => handleSelectedGenres(genre.mal_id)}>
          {genre.name}
        </div>
        {/each}
      </section>
    </div>
    <div class="filters">
      <p>Score</p>
      <h5>Total animes</h5>
    </div>
  </div>
  <button on:click={getRandomAnime}>Get a random Anime!</button>
  {#if $randomSelectedAnime}
    <RandomAnime randomSelectedAnime={randomSelectedAnime}/>
  {:else if $randomSelectedAnime == []}
    <h2>Could Not find any anime (maybe try different genres!)</h2>  
  {/if}

</main>

<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1600px;
    margin: 0 auto;
    background: #eff0f3;
    border-left: 2px solid #2a2a2a;
    border-right: 2px solid #2a2a2a;
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

  .genre_chooser {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #0d0d0d;
  }

  .options {
    display: flex;
    margin-top: 32px;
  }
  .filters {
    display: flex;
    width: 300px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    margin: 16px;
    width: 200px;
    height: 70px;
    font-size: 1.1rem;
    background-color: #ff8e3c;
    border-radius: 4px;
  }

</style>
