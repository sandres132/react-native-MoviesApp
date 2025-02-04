import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { TopRatedResponse } from "../../../infrastructure/interfaces/top-rated.response";
import { Movie } from "../../entities/movie.entity";
import { TopRatedMapper } from "../../../infrastructure/mappers/topRated.mapper";


export const topRatedUseCase = async ( fetcher: HttpAdapter ):Promise<Movie[]> => {
    
    try {
        
        const topRated = await fetcher.get<TopRatedResponse>('/top_rated');
        // return topRated.results.map( result => TopRatedMapper.fromTopRatedResultToEntity(result));
        return topRated.results.map( TopRatedMapper.fromTopRatedResultToEntity );
        
    } catch (error) {
        console.log(error);
        
        throw new Error('Error fetching movies- NowPlaying');
    }
}