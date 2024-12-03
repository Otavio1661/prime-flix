import axios from 'axios';

// Base da api:  https://api.themoviedb.org/3/
// URL da api: https://api.themoviedb.org/3/movie/now_playing?api_key=399d4a62fdf6abedf2d15a774cbbb062&language=pt-BR

const api = axios.create({
    baseURL:  'https://api.themoviedb.org/3/'
});

export default api;