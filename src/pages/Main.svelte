<script lang="ts">
    import { onMount } from "svelte";
    import Filters from "../lib/Filters.svelte";
    import GenreChooser from "../lib/GenreChooser.svelte";
    import {
      genresStore,
      genres,
      randomSelectedAnimeStore,
      randomSelectedAnime,
      selectedGenres,
  selectedTypes,
    } from "../store";
    import api from "../util/api";

    let time = true

    onMount(async () => {
      //https://api.jikan.moe/v4/anime/1
      //https://api.jikan.moe/v4/genres/anime
      const genreOptions = await api("genres/anime");
      genresStore.set(genreOptions);
      //render anime on start (recommendation?)
      
      //getRandomAnime()
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
      //Scroll("randomAnime");

      //cap api calls to prevent overflow
      time = false;
      setTimeout(() => time = true, 1000)
    };
  
    //maybe have some sort of recommendation button too!
    //https://api.jikan.moe/v4/recommendations/anime
  </script>
  
  <main>
    <section>
      <div class="options">
        <GenreChooser {genres} />
        <Filters />
      </div>
      <button on:click={getRandomAnime} disabled={!time}>Get a random Anime!</button>
    </section>
  </main>
  
  <style lang="scss">
    main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: 0 64px;
    }
    section {
      width: 465px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .options {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 250px;
      /* margin-top: 232px; */
    }
  
    button {
      width: 465px;
      height: 134px;
      font-size: 2rem;
      background-color: hsl(25.2, 100%, 61.8%);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: hsla(25.2, 100%, 61.8%, 92%);
      }
      &:disabled {
        background-color: hsla(25.2, 100%, 61.8%, 80%);
        cursor: auto;
      }
    }
  </style>
  