import { useEffect, useState } from "react"
import type { Movie } from "../../core/entities/movie.entity";

import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";

let popularPageNumber = 1;

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, settopRated] = useState<Movie[]>([])
    const [upComing, setUpComing] = useState<Movie[]>([])

    useEffect(() => {
      initialLoad();
    
    }, [])
    

    const initialLoad = async () => {
        // Peticiones una por una
        // const nowPlayingMovies = await UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        // const popularMovies = await UseCases.MoviesPopularUseCase(movieDBFetcher);
        // const topRatedMovies = await UseCases.topRatedUseCase(movieDBFetcher);
        // const upComingMovies = await UseCases.upComingUseCase(movieDBFetcher);

        // console.log( 'nowPlayingMovies: ', nowPlayingMovies[0] );
        // console.log( 'PopularMovies: ', popularMovies[0] );
        // console.log( 'topRatedMovies: ', topRatedMovies[0] );
        // console.log( 'upComingMovies: ', upComingMovies[0] );

        // Peticiones simultaneas
        const nowPlayingMoviesPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const popularMoviesPromise = UseCases.MoviesPopularUseCase(movieDBFetcher);
        const topRatedMoviesPromise = UseCases.topRatedUseCase(movieDBFetcher);
        const upComingMoviesPromise = UseCases.upComingUseCase(movieDBFetcher);

        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,
        ] = await Promise.all([
            nowPlayingMoviesPromise,
            popularMoviesPromise,
            topRatedMoviesPromise,
            upComingMoviesPromise
        ]);

        setNowPlaying( nowPlayingMovies );
        setPopular( popularMovies );
        setUpComing( topRatedMovies );
        settopRated( upComingMovies );
        setIsLoading( false );

        // console.log({
        //     nowPlayingMovies,
        //     popularMovies,
        //     topRatedMovies,
        //     upComingMovies
        // });
        
    }



    return {
        // Properties
        isLoading,
        nowPlaying,
        popular,
        upComing,
        topRated,

        // Methods
        popularNextPage: async() => {
            popularPageNumber++;
            const popularMovies = await UseCases.MoviesPopularUseCase( movieDBFetcher, {
                page: popularPageNumber,
            });
            setPopular( prev => [ ...prev, ...popularMovies ] ); //Nota el prev es para recoger lo que ya estaba en el state
        }
    }
}
