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
    <p>
        <!-- Maybe add synopsis here too-->
        {$randomSelectedAnime.score}
    </p>
    
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 32px 0 16px 0;
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
    width: 500px;
  }
</style>
