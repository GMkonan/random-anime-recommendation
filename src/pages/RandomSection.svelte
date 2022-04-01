<script lang="ts">
import RandomAnime from "../lib/RandomAnime.svelte";
import { randomSelectedAnime } from "../store";



</script>

<div id="randomAnime">
    {#if $randomSelectedAnime}
      <RandomAnime {randomSelectedAnime} />
    {:else if $randomSelectedAnime == []}
      <h2>Could Not find any anime</h2>
    {/if}
</div>

<style lang="scss">

</style>