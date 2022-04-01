<script lang="ts">
    import { onMount } from "svelte";
    import Filters from "../lib/Filters.svelte";
    import GenreChooser from "../lib/GenreChooser.svelte";
    import Welcome from "../lib/Welcome.svelte";
    import {
      genresStore,
      genres,
      randomSelectedAnimeStore,
      randomSelectedAnime,
      selectedGenres,
  selectedTypes,
    } from "../store";
    import api from "../util/api";
    import Scroll from "../util/Scroll";
  
    onMount(async () => {
      //https://api.jikan.moe/v4/anime/1
      //https://api.jikan.moe/v4/genres/anime
      const genreOptions = await api("genres/anime");
      genresStore.set(genreOptions);
    });
  
    const getRandomAnime = async () => {
      if ($selectedGenres.length !== 0 || $selectedTypes !== "") {
        const formatedGenreIds = $selectedGenres.toString().split(" ").join(",");
  
        const {
          pagination: { last_visible_page },
        } = await api(`anime`, { genres: formatedGenreIds, type: $selectedTypes });
        console.log(last_visible_page);
        let selectRandomPage = Math.floor(Math.random() * last_visible_page);
  
        const { data } = await api(`anime`, {
          genres: formatedGenreIds,
          page: selectRandomPage,
          type: $selectedTypes
        });
  
        const selectRandom = Math.floor(Math.random() * data.length);
        console.log(data)
        randomSelectedAnimeStore.set(data[selectRandom]);
      } else {
        console.log($selectedTypes)
        const { data } = await api("random/anime");
        randomSelectedAnimeStore.set(data);
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
      <Filters />
    </div>
    <button on:click={getRandomAnime}>Get a random Anime!</button>
  </main>
  
  <style lang="scss">
  
    .options {
      display: flex;
      flex-direction: column;
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
  