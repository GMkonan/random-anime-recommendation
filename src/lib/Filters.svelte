<script lang="ts">
import { totalAnimes } from "../store";
import MultiSelect from "svelte-multiselect";
let typeOptions = ['TV', 'Movie']
</script>

<main>
    <!-- choose min score option? -->
    
    <!-- {#if $totalAnimes !== undefined}
        <h5>Total animes</h5>
        <div>{$totalAnimes}</div>
    {/if} -->

    <MultiSelect options={typeOptions}/>
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