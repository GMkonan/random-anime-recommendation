import { writable, derived } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const genresStore = writable<{data: any[]}>();
/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const genres = derived(genresStore, ($genresStore) => {
  if ($genresStore){
    //temporary slice
    return $genresStore.data.slice(0, 9);
  }
  return [];
});

export const randomSelectedAnimeStore = writable();

export const randomSelectedAnime = derived(randomSelectedAnimeStore, ($randomSelectedAnimeStore) => {
    //@ts-ignore
    return $randomSelectedAnimeStore
})