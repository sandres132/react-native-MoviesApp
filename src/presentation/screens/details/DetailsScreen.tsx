import { ScrollView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/Navigation';
// import { useRoute } from '@react-navigation/native';

import { useMovie } from '../../hooks/useMovie';

import { MovieHeader } from '../../components/movie/MovieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';

// Segunda forma para obtener el movieId esta forma es mejor por el tipado estricto que se le da
interface Props extends StackScreenProps<RootStackParams, 'Details'>{};

export const DetailsScreen = ({ route }:Props ) => {

    //Esta es una forma sencilla de obtener el movieId pues en el RootStackParams tenemos el movieId pero no la mas conveniente
    // const { movieId } = useRoute().params;
    
    // Parte de la segunda forma
    const { movieId } = route.params;

    const { isLoading, movie, cast = [] } = useMovie( movieId );// El '= []' es lo mismo como ponerle el signo de admiracion como en movie!

    if ( isLoading ) {
        return <Text>Cargando...</Text>
    }

    return (
        <ScrollView>
            
            {/* Header */}
            <MovieHeader
                originalTitle={ movie!.originalTitle }
                title={ movie!.title }
                poster={ movie!.poster }
            />

            {/* Detalles */}
            <MovieDetails movie={ movie! } cast={ cast }/>

        </ScrollView>
    )
}