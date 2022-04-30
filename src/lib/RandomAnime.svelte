<script lang="ts">
  export let randomSelectedAnime;
  console.log($randomSelectedAnime);

  let readMore = true

  //function doesnt update (rerender) on bool change
  // const synopsis = () => {
  //   let synopsis = $randomSelectedAnime.synopsis
  //   console.log(readMore)
  //   return readMore == false ? `${synopsis.slice(0, 240)}...` : synopsis
  // }

  const handleReadMore = () => readMore = !readMore
</script>

<main>
  <section class="container">
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
      <p>{readMore && $randomSelectedAnime.synopsis.length > 240
          ? `${$randomSelectedAnime.synopsis.slice(0, 240)}...` 
          : $randomSelectedAnime.synopsis}
      </p>
      {#if $randomSelectedAnime.synopsis.length > 240}
        <button on:click={handleReadMore}>{readMore ? "Read More" : "Read Less"}</button>
      {/if}
      <div class="brief-info">
        <div>
          <h3>Genres</h3>
          <ul>
            {#each $randomSelectedAnime.genres as genre}
              <li>
                {genre.name}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>

    <section class="info">
      <div class="each-info">
        <h2 class="info-title">Alternative Title</h2>
        <span>{$randomSelectedAnime.title_english}</span>
      </div>
      <div class="each-info">
        <h2 class="info-title">Duration</h2>
        <span>{$randomSelectedAnime.duration}</span>
      </div>
      <div class="each-info">
        <h2 class="info-title">Status</h2>
        <span>{$randomSelectedAnime.status}</span>
      </div>
      <div class="each-info">
        <h2 class="info-title">Source</h2>
        <span>{$randomSelectedAnime.source}</span>
      </div>
      <div class="each-info">
        <h2 class="info-title">Season</h2>
        <span>{$randomSelectedAnime.season} {new Date($randomSelectedAnime.aired.from).getFullYear()}</span>
      </div>
      <div class="each-info">
        <h2 class="info-title">Studios</h2>
        {#each $randomSelectedAnime.studios as studio}
          <span class="studio-span">{studio.name}</span>
        {/each}
      </div>
    </section>
  
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

  .container {
    display:flex;
    flex-direction: row;
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
    font-weight: 600;
    font-size: 26px;
    color: #0D0D0D;
  }

  .brief {
    margin-left: 48px;
    margin-top: 16px;
    width: 680px; //this may have to be adjusted in the future
  }

  .brief-info {
    margin-top: 32px;
  }

  .brief-info > div > h3 {
    color: #FF8E3C;
    border-bottom: 2px solid #FF8E3C;
    font-size: 1.5rem;
  }

  ul {
    display: flex;
    list-style-type: none;
    gap: 8px;
  }
  li {
    font-size: 1.2rem;
    margin-top: 8px;
    &:not(:last-child)::after {
      content: "|";
    }
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
  }

  button {
    font: inherit;
    cursor: pointer;
    outline: inherit;
    background: none;
    color: #FF8E3C;
    padding: 0;
    border: none;

    text-decoration: underline;
    font-weight: 600;
    margin-top: 8px;
    &:hover {
      text-decoration: none;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    min-width: 240px;
    padding-left: 32px;
    margin-top: 32px;
    gap: 32px;
  }

  /* .each-info {
    
  } */

  .info-title {
    font-size: 1.4rem;
    color: #FF8E3C;
    border-bottom: 3px solid #FF8E3C;
    margin-bottom: 8px;
  }

  span {
    font-weight: 600;
  }
  
  .studio-span {
    &:not(:last-child)::after {
      content: "|";
      margin: 0 4px;
    }
  }
</style>
