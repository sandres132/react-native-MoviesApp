import { View, Text } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isLoading, nowPlaying, popular, topRated, upComing, popularNextPage } = useMovies();

    if ( isLoading ) {
        return ( <FullScreenLoader/> )
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20, paddingBottom: 30 }}>

                {/* nowPlaying */}
                <PosterCarousel movies={ nowPlaying }/>

                {/* popular */}
                <HorizontalCarousel movies={ popular } title='Populares' loadNextPage={ popularNextPage } />

                {/* topRated  */}
                <HorizontalCarousel movies={ topRated } title='Mejor Calificadas' />

                {/* upComing */}
                <HorizontalCarousel movies={ upComing } title='Proximamente' />
            </View>
        </ScrollView>
    )
}