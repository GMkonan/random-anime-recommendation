<script lang="ts">
import Main from "./pages/Main.svelte";
import RandomSection from "./pages/RandomSection.svelte";


</script>

<main>
  <Main />
  <RandomSection />
</main>

<style lang="scss">
    :root {
      font-family: "Lato", sans-serif;
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
</style>