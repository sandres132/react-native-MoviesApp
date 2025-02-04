import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { FullMovie } from "../../entities/movie.entity";
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { MovieDBMovie } from "../../../infrastructure/interfaces/movie-db.responses";



export const getMovieByIdUseCase = async ( fetcher: HttpAdapter, movieId: number ): Promise<FullMovie> => {

    try {

        // usar el fetcher
        const movie = await fetcher.get<MovieDBMovie>(`/${ movieId }`);

        //mapeo
        const fullMovie = MovieMapper.fromMovieDBToEntity( movie );

        return fullMovie
        
    } catch (error) {
        throw new Error(`Cannot get movie by id: ${ movieId }`);
    }
}