import { Image, ScrollView, View } from 'react-native';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { support } from '../../../../assets';
import SupportContainer from './supportContainer/SupportContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';

const HelpAndSupport = () => {
    return (
        // <SafeAreaView>
        <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer} >
            <Image source={support} style={globalStyles.topScreenImage} />
            <SupportContainer />
        </ScrollView >

    );
};


export default HelpAndSupport;
