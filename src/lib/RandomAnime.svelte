<script lang="ts">
  export let randomSelectedAnime;
  console.log($randomSelectedAnime)
</script>

<main>
  <h1>{$randomSelectedAnime.title}</h1>
  <section>
    <img
    src={$randomSelectedAnime.images.jpg.image_url}
    alt={$randomSelectedAnime.title}
    />
    <div class="wrapper">
      <div class="info">
        <div class="score">
          <div>
            <h4>SCORE</h4>
            <span>{$randomSelectedAnime.score == null ? "N/A" : $randomSelectedAnime.score}</span>
          </div>
          <div>
            <h4>TYPE</h4>
            <span>{$randomSelectedAnime.type}</span>
          </div>
          <div>
            <h4>EPISODES</h4>
            <span>{$randomSelectedAnime.episodes}</span>
          </div>
        </div>
      </div>
      <div class="genres">
        <h3>Genres</h3>
        <ul>
          {#each $randomSelectedAnime.genres as genre}
            <li>
              {genre.name} 
            </li>
          {/each}
        </ul>
      </div>
      <h3>Synopsis</h3>
      <p>{$randomSelectedAnime.synopsis}</p>
    </div>
    
  </section>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
    margin: 32px 0 16px 0;
    padding: 16px;
    /* border: 3px solid #0d0d0d; */
    border-radius: 8px;
  }
  h1 {
    margin: 0 auto;
    margin-bottom: 12px;
  }
  img {
    margin: 0 24px;
    width: min-content;
    height: min-content;
  }
  section {
    display:flex;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 64px;
  }
  h4 {
    font-size: 1.1rem;
    margin-top: 16px;
    margin-bottom: 8px;
    color: white;
    background: #ff8e3c;
    width: min-content;
    padding: 4px;
  }
  p {
    margin-top: 8px;
    font-size: 1.1rem;
  }
  span {
    font-size: 1.6rem;
    font-weight: 600;
    color: #2a2a2a;
  }
  .score {
    width: min-content;
    margin-left: 16px;
    text-align: center;
    display: flex;
    gap: 24px;
  }
  .score > div {
  }
  .info {
    border-radius: 8px;
    border: 2px solid black;
    height: 100px;
  }
  h3 {
    margin-top: 16px;
    color:#ff8e3c;
    border-bottom: 2px solid #ff8e3c;
  }
  ul {
    display: flex;
    list-style-type: none;
    gap: 10px;
  }
  li {
    margin-top: 8px;
    &:not(:last-child)::after {
      content: "|";
    }
  }
</style>
