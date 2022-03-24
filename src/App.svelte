<script lang="ts">
  import { onMount } from "svelte";
  import Filters from "./lib/Filters.svelte";
  import GenreChooser from "./lib/GenreChooser.svelte";
  import RandomAnime from "./lib/RandomAnime.svelte";
import Welcome from "./lib/Welcome.svelte";
  import {
    genresStore,
    genres,
    randomSelectedAnimeStore,
    randomSelectedAnime,
    selectedGenres,
  } from "./store";
  import api from "./util/api";
  import Scroll from "./util/Scroll";

  onMount(async () => {
    //https://api.jikan.moe/v4/anime/1
    //https://api.jikan.moe/v4/genres/anime
    api("https://api.jikan.moe/v4/genres/anime", genresStore);
  });

  const getRandomAnime = async () => {
    console.log({ $selectedGenres });
    //@ts-ignore
    if ($selectedGenres.length !== 0) {
      const formatedGenreIds = $selectedGenres.toString().split(" ").join(",");

      let lastVisiblePage;

      await fetch(`https://api.jikan.moe/v4/anime?genres=${formatedGenreIds}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          lastVisiblePage = jsonResponse.pagination.last_visible_page;
        });
      let selectRandomPage = Math.floor(Math.random() * lastVisiblePage);
      console.log(
        `https://api.jikan.moe/v4/anime?genres=${formatedGenreIds}&page=${selectRandomPage}`
      );
      fetch(
        `https://api.jikan.moe/v4/anime?genres=${formatedGenreIds}&page=${selectRandomPage}`
      )
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(jsonResponse);
          console.log(jsonResponse.data.length);
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
  <Welcome />
  <div class="options">
    <GenreChooser {genres} />
    <!-- <Filters /> -->
  </div>
  <button on:click={getRandomAnime}>Get a random Anime!</button>

  <div id="randomAnime">
    {#if $randomSelectedAnime}
      <RandomAnime {randomSelectedAnime} />
    {:else if $randomSelectedAnime == []}
      <h2>Could Not find any anime</h2>
      <p>
        Check if the "total animes" count is more than 0. This count represents
        the quantity of animes that fall under that genre of genres.
      </p>
    {/if}
  </div>
</main>


<style lang="scss">
  :root {
    font-family: 'Lato', sans-serif;
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
    border: 2px solid #2a2a2a;
    border-radius: 16px;
    width: 600px;
    height: 350px;
  }

  button {
    margin: 16px;
    width: 200px;
    height: 70px;
    font-size: 1.1rem;
    background-color: hsl(25.2, 100%, 61.8%);
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: hsla(25.2, 100%, 61.8%, 95%);
    }
  }
</style>
