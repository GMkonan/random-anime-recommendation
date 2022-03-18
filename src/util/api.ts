import type { Writable } from "svelte/store";

const api = (url: RequestInfo, store: Writable<any>) => {
    fetch(url)
    .then(response => response.json())
    .then(jsonResponse => {
      store.set(jsonResponse);
    }).catch(error => {
        console.log({error})
        return error
    });
}

export default api;