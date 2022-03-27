import axios from "axios";

const api = async (path: string, params?: Object) => {
  console.log(params)
    return axios.get(`https://api.jikan.moe/v4/${path}`, {params: params})
    .then((response) => {
      console.log(response)
      return response.data
    })
    .catch((error) => {
      console.log({ error });
      return error;
    });
;
  }
export default api;
