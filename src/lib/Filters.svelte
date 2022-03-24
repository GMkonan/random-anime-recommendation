<script lang="ts">
import { totalAnimes } from "../store";
</script>

<main>
    <!-- choose min score option? -->
    {#if $totalAnimes !== undefined}
        <h5>Total animes</h5>
        <div>{$totalAnimes}</div>
    {/if}
    <!-- NSFW allowed/NSFW only? -->
</main>

<style lang="scss">

main {
    display: flex;
    width: 300px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

h5 {
    margin-bottom: 4px;

}

div {
    font-size: 1.6rem;
    border: 2px solid #ff8e3c;
    border-radius: 50%;
    padding: 8px;
}

</style>