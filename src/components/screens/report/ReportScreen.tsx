import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AuthContext from '../../../contexts/authContext/authContext';
import { Button, useTheme } from 'react-native-paper';
import UiContext from '../../../contexts/uiContext/UIContext';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { api } from '../../../utils/api';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

export const ReportScreen = () => {
    const { user, setUser } = useContext(AuthContext);
    const { colors } = useTheme();
    const {
        ui: { language },
    } = useContext(UiContext);

    const route = useRoute<any>();
    let { userDetails, roomId } = route.params;

    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);

    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState<boolean>(false);


    const [form, setForm] = useState({
        title: '',
        desc: '',
    });

    const printj = () => {
        console.log(form)
    }
    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.8,
            cropperCircleOverlay: true, // Optional: circular cropping
            freeStyleCropEnabled: true, // Optional: freeform cropping
            mediaType: 'photo', // Ensures only photos are picked
        })
            .then((image: any) => {
                setProfilePhotoUrl(image.path);
                const file: File = {
                    uri: image.path,
                    name: image.filename || 'image.jpg',
                    type: image.mime || 'image/jpeg',
                } as unknown as File; // Casting to `File`
                setProfilePhoto(file);
            })
            .catch((error: any) => {
                console.log('ImagePicker Error:', error);
            });
    };

    const handleUpload = async () => {
        if (user && user._id && profilePhoto !== null) {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('image', profilePhoto);
                formData.append('userObjectId', user._id);
                formData.append('title', form.title);
                formData.append('description', form.desc);
                formData.append('roomId', roomId);
                formData.append('reportTo', userDetails?._id);

                const response = await api.report.reportAccount(formData);
                console.log(response)
                navigation.navigate('UserDashboard', { screen: 'Home' });
                setLoading(false);
            } catch (error) {
                console.log('Upload error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.header}>


                    <Text style={[styles.title, { color: colors.primary }]}>Report account</Text>

                    <Text style={styles.subtitle}>
                        Fill in the fields below to get started with your new account.
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={[styles.inputLabel, { color: colors.primary }]}>Report Title</Text>

                        <TextInput
                            clearButtonMode="while-editing"
                            onChangeText={title => setForm({ ...form, title })}
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.title} />
                    </View>

                    <View style={styles.input}>
                        <Text style={[styles.inputLabel, { color: colors.primary }]}>Description</Text>

                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            keyboardType="email-address"
                            onChangeText={desc => setForm({ ...form, desc })}
                            placeholderTextColor="#6b7280"
                            style={styles.inputControldesc}
                            value={form.desc} />
                    </View>

                    <View style={styles.input}>
                        <Text style={[styles.inputLabel, { color: colors.primary }]}>Support Image</Text>
                        {
                            profilePhotoUrl ?
                                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ position: 'relative' }}>
                                        {/* Image */}
                                        <Image
                                            source={{ uri: profilePhotoUrl }}
                                            style={{ height: 80, width: 80, borderRadius: 10 }}
                                        />

                                        <TouchableOpacity
                                            onPress={() => setProfilePhotoUrl(null)}
                                            style={{
                                                position: 'absolute',
                                                top: -10,
                                                right: -10,
                                                backgroundColor: 'white',
                                                borderRadius: 15,
                                                padding: 5,
                                                elevation: 3,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: 2,
                                            }}
                                        >
                                            <Icon name="circle-with-cross" size={20} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <TouchableOpacity onPress={pickImage} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                                    <Image source={{ uri: "https://static-00.iconduck.com/assets.00/insert-image-icon-1024x962-wzhwqwnm.png" }}
                                        style={{ height: 80, width: 80, borderRadius: 10 }} />
                                </TouchableOpacity>
                        }

                        <Button
                            mode="contained"
                            loading={loading}
                            style={{
                                backgroundColor: colors.primary,
                                borderColor: colors.primary,
                                width: '100%',
                                padding: 6,
                                marginVertical: 10,
                                marginTop: 50
                            }}
                            onPress={handleUpload}
                        >
                            Submit
                        </Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    title: {
        fontSize: 31,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
    },
    /** Header */
    header: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 24,
        paddingHorizontal: 24,
        paddingTop: 30
    },
    headerBack: {
        padding: 8,
        paddingTop: 0,
        position: 'relative',
        marginLeft: -16,
        marginBottom: 6,
    },
    /** Form */
    form: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    formAction: {
        marginTop: 4,
        marginBottom: 16,
    },
    formFooter: {
        paddingVertical: 24,
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
    /** Input */
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
    },
    inputControldesc: {
        height: 100,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#075eec',
        borderColor: '#075eec',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});