<script lang="ts">
import { selectedTypes, totalAnimes } from "../store";
import MultiSelect from "svelte-multiselect";

let typeOptions = ['tv', 'movie']
let selected = [];
const handleSelectedTypes = (selected) => {
    selectedTypes.set(selected[0].value);
    
  };
const removeSelectedType = () => selectedTypes.set(undefined)

</script>

<main>
    <!-- choose min score option? -->
    
    <!-- {#if $totalAnimes !== undefined}
        <h5>Total animes</h5>
        <div>{$totalAnimes}</div>
    {/if} -->
    <div>Type:</div>
    <MultiSelect 
    bind:selected 
    options={typeOptions}
    on:add={() => handleSelectedTypes(selected)}
    on:remove={removeSelectedType}
    maxSelect={1}/>
    <!-- NSFW allowed/NSFW only? -->
</main>

<style lang="scss">

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

h5 {
    margin-bottom: 4px;

}

</style>