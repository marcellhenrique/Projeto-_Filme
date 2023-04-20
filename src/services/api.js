import axios from "axios";
//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=88822d0f7303867ad55cc3431c8ee984&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;