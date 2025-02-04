import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { PopularResponse } from "../../../infrastructure/interfaces/popular.response";
import { Movie } from "../../entities/movie.entity";
import { PopularMapper } from "../../../infrastructure/mappers/popular.mapper";

interface Options {
    page?: number;
    limit?: number;
}

export const MoviesPopularUseCase = async( fetcher: HttpAdapter, options?: Options ):Promise<Movie[]> => {

    try {
        
        const popular = await fetcher.get<PopularResponse>('/popular', {
            params: {
                page: options?.page ?? 1
            }
        });
        // return popular.results.map( result => PopularMapper.fromPopularResultToEntity(result));
        return popular.results.map( PopularMapper.fromPopularResultToEntity );
        
    } catch (error) {
        console.log(error);
        
        throw new Error('Error fetching movies- Popular');
    }
}