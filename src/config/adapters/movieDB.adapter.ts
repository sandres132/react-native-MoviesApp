import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";


export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    Params: {
        // api_key: '9f972e2a21d42372c7dff1dc69bcd80d',
        api_key: THE_MOVIE_DB_KEY ?? 'No key',
        language: 'es',
    }
});