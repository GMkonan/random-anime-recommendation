<script lang="ts">
  export let randomSelectedAnime;
</script>

<main>
  <h3>{$randomSelectedAnime.title}</h3>
  <section>
    <img
    src={$randomSelectedAnime.images.jpg.image_url}
    alt={$randomSelectedAnime.title}
    />
    <div>
      <p>{$randomSelectedAnime.synopsis}</p>
      <h4>{$randomSelectedAnime.score}</h4>
    </div>
    
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 32px 0 16px 0;
    padding: 16px;
    border: 3px solid #0d0d0d;
    border-radius: 8px;
  }
  h3 {
    margin-bottom: 12px;
  }
  img {
    width: min-content;
    height: min-content;
  }
  section {
    display:flex;
    width: 800px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
</style>
