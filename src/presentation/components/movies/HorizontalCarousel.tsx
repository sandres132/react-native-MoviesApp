import { useEffect, useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler";

import { Movie } from "../../../core/entities/movie.entity"
import { MoviePoster } from "./MoviePoster";

interface Props {
    movies: Movie[];
    title?: string;
    loadNextPage?: () => void;
}

export const HorizontalCarousel = ({ movies, title, loadNextPage }: Props) => {

    const isLoading = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            isLoading.current = false;
        }, 200);
    }, [ movies ])
    

    const onScroll = ( event: NativeSyntheticEvent<NativeScrollEvent> ) => {
        if( isLoading.current ) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const isEndReach = ( contentOffset.x + layoutMeasurement.width + 600 ) >= contentSize.width;
        if ( !isEndReach ) return;

        isLoading.current = true;

        //Cargando la siguiente pag
        loadNextPage && loadNextPage();
    }

  return (
    <View
        style={{ height: title ? 260 : 220 }}
    >
        {
            title && (
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: '300',
                        marginLeft: 10,
                        marginBottom: 10
                    }}
                >
                    { title }
                </Text>
            )
        }

        <FlatList
            data={ movies }
            renderItem={ ({ item }) => (
                <MoviePoster movie={ item } width={ 140 } height={ 200 } />
            )}
            // keyExtractor={ (item) => item.id.toString() }// Este codigo funciona, solo toma los id de las peliculas
            keyExtractor={ (item, index) => `${item.id}-${ index }` }// Este codigo no agrega id repetido pues concatena el numero index al final del id de la pelicula
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={ onScroll }
        />
    </View>
  )
}
