import { Result } from "../interfaces/top-rated.response";
import { Movie } from "../../core/entities/movie.entity";

export class TopRatedMapper {

    static fromTopRatedResultToEntity( result: Result ): Movie {
        
        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            releaseDate: new Date( result.release_date ),
            rating: result.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            backdrop: result.backdrop_path,
        }
    }
}