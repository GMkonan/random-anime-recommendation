import axios from "axios";

const api = async (path: string, params?: Object) => 
    axios.get(`https://api.jikan.moe/v4/${path}`, {params: params})
    .then((response) => response.data)
    .catch((error) => {
      console.log({ error });
      return error;
    });
;

export default api;
