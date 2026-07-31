//imports

import { View } from 'react-native';
import {TarjetaPlatillo} from '../components/TarjetaPlatillo';



const TarjetasScreen = () => {
    return (
        <View>
            <TarjetaPlatillo nombre="Tacos" precio={12.5} paisOrigen="México" />
            <TarjetaPlatillo nombre="Enchiladas" precio={15.0} paisOrigen="México"/>
            <TarjetaPlatillo nombre="Guacamole" precio={10.0} paisOrigen="México"/>
        </View>
    );
};

export default TarjetasScreen;