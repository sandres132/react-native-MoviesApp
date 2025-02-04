import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { UpComingResponse } from "../../../infrastructure/interfaces/up-coming.response";
import { Movie } from "../../entities/movie.entity";
import { UpComingMapper } from "../../../infrastructure/mappers/upComing.mapper";



export const upComingUseCase = async ( fetcher: HttpAdapter ):Promise<Movie[]> => {
    try {
        
        const upComing = await fetcher.get<UpComingResponse>('/upcoming');
        // return UpComing.results.map( result => UpComingMapper.fromUpComingResultToEntity(result));
        return upComing.results.map( UpComingMapper.fromUpComingResultToEntity );
        
    } catch (error) {
        console.log(error);
        
        throw new Error('Error fetching movies- UpComing')
    }
}