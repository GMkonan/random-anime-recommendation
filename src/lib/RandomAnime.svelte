<script lang="ts">
  export let randomSelectedAnime;
  console.log($randomSelectedAnime);
</script>

<main>
  <section>
    <div class="important-info">
      <img
        src={$randomSelectedAnime.images.jpg.image_url}
        alt={$randomSelectedAnime.title}/>
      <section class="relevant">
        <div class="circle-wrapper">
          <div class="circle">
            {$randomSelectedAnime.score}
          </div>
          <h2>Score</h2>
        </div>
        <div class="circle-wrapper">
          <div class="circle">
            {$randomSelectedAnime.episodes}
          </div>
          <h2>Episodes</h2>
        </div>
      </section>
    </div>
    <div class="brief">
      <h1>{$randomSelectedAnime.title}</h1>
      <p>{$randomSelectedAnime.synopsis}</p>
    </div>
  </section>
  <section class="info">

  </section>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    margin: 144px 64px;
  }
  img {
    width: min-content;
    height: min-content;
  }

  section {
    display:flex;
  }
  
  .important-info {
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  .relevant {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    gap: 32px;
  }

  .circle-wrapper {
    text-align: center;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    font-weight: 400;
    width: 128px; //134px? 
    height: 128px;
    border-radius: 50%;
    border: 4px solid #FF8E3C;
    color: #FF8E3C;
  }
  h2 {
    margin-top: 4px;
    font-weight: 500;
    font-size: 26px;
    color: #0D0D0D;
  }

  .brief {
    margin-left: 48px;
    margin-top: 16px;
  }

  h1 {
    font-size: 28px;
    font-weight: 500;
  }

  p {

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
