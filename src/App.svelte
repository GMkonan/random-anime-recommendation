<script lang="ts">
  import { onMount } from "svelte";
  import Filters from "./lib/Filters.svelte";
  import GenreChooser from "./lib/genreChooser.svelte";
  import RandomAnime from "./lib/randomAnime.svelte";
  import {
    genresStore,
    genres,
    randomSelectedAnimeStore,
    randomSelectedAnime,
  } from "./store";
  import api from "./util/api";
  import Scroll from "./util/Scroll";

  let selectedGenres = [];

  onMount(async () => {
    //https://api.jikan.moe/v4/anime/1
    //https://api.jikan.moe/v4/genres/anime
    api("https://api.jikan.moe/v4/genres/anime", genresStore);
  });

  const getRandomAnime = () => {
    if (selectedGenres.length !== 0) {
      const formatedGenreIds = selectedGenres.toString().split(" ").join(",");
      console.log(formatedGenreIds);
      const selectRandomPage = Math.floor(
            Math.random() * 278
          );
      fetch(`https://api.jikan.moe/v4/anime?genres=${formatedGenreIds}&page=${selectRandomPage}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(jsonResponse)
          console.log(jsonResponse.data.length)
          const selectRandom = Math.floor(
            Math.random() * jsonResponse.data.length
          );
          console.log(selectRandom);
          console.log(jsonResponse.data[selectRandom]);
          randomSelectedAnimeStore.set(jsonResponse.data[selectRandom]);
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    } else {
      fetch("https://api.jikan.moe/v4/random/anime")
        .then((response) => response.json())
        .then((jsonResponse) => {
          randomSelectedAnimeStore.set(jsonResponse.data);
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    }
    Scroll("randomAnime");
  };

  //maybe have some sort of recommendation button too!
  //https://api.jikan.moe/v4/recommendations/anime
</script>

<main>
  <div class="options">
    <GenreChooser {selectedGenres} {genres} />
    <Filters />
  </div>

  <button on:click={getRandomAnime}>Get a random Anime!</button>
</main>

<main>
  {#if $randomSelectedAnime}
    <RandomAnime {randomSelectedAnime} />
  {:else if $randomSelectedAnime == []}
    <h2>Could Not find any anime</h2>
    <p>
      Check if the "total animes" count is more than 0. This count represents
      the quantity of animes that fall under that genre of genres.
    </p>
  {/if}
</main>

<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    display: flex;
    align-items: center;
    //justify-content: center;
    flex-direction: column;
    width: 1500px;
    height: 100%;
    margin: 0 auto;
    background: #eff0f3;
    border-left: 2px solid #2a2a2a;
    border-right: 2px solid #2a2a2a;
  }

  .options {
    display: flex;
    margin-top: 32px;
  }

  button {
    margin: 16px;
    width: 200px;
    height: 70px;
    font-size: 1.1rem;
    background-color: #ff8e3c;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
