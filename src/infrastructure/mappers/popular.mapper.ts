import { Result } from "../interfaces/popular.response";
import { Movie } from "../../core/entities/movie.entity";

export class PopularMapper {

    static fromPopularResultToEntity( result: Result ): Movie {
        
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