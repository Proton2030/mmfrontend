import { View, Text, ScrollView, Image, Animated, Easing } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import { muslim, welcome } from '../../../assets';
import UiContext from '../../../contexts/uiContext/UIContext';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const Language = () => {
  const { ui, setUi } = useContext(UiContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  // Create an animated value
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    // Animate the translateY value to 0
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);

  const handleLanguageChange = (language: 'BENGALI' | 'ENGLISH') => {
    if (language) {
      setUi({ ...ui, language: language });
      navigation.navigate('Auth');
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, paddingBottom: 0, backgroundColor: "white" }}
      contentContainerStyle={globalStyles.parentScrollContainer}
    >

      <View style={[globalStyles.childContainer,]}>
        <Image
          source={{ uri: "https://www.shutterstock.com/image-vector/two-hearts-simple-one-line-260nw-2410879045.jpg" }}
          style={globalStyles.landinImage}
        />
      </View>
      <Animated.View style={{ paddingLeft: 20, transform: [{ translateY }] }}>
        <Text style={{ textAlign: "left", fontWeight: "500", fontSize: 50, color: "black" }}>
          Select your

        </Text>
        <Text style={{ color: colors.primary, textAlign: "left", fontWeight: "500", fontSize: 50, marginTop: -15 }}>
          Language
        </Text>
        <Text style={{ textAlign: "left", fontWeight: "500", fontSize: 16, color: "gray", width: "60%", marginTop: 10 }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime neque no
        </Text>
        <View style={{ marginTop: 20, flexDirection: "row", width: "100%", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary, borderColor: colors.primary, width: 150, paddingHorizontal: 6, paddingVertical: 13,
              borderTopEndRadius: 25, borderBottomEndRadius: 25, borderTopLeftRadius: 25
            }}
            onPress={() => handleLanguageChange('ENGLISH')}
          >
            <Text style={{ fontWeight: "400", fontSize: 20, justifyContent: "center", textAlign: "center", color: "white" }}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.secondary, borderColor: colors.primary, width: 150, paddingHorizontal: 6, paddingVertical: 13,
              borderTopEndRadius: 25, borderBottomLeftRadius: 25, borderTopLeftRadius: 25
            }}
            onPress={() => handleLanguageChange('BENGALI')}
          >
            <Text style={{ fontWeight: "400", fontSize: 20, justifyContent: "center", textAlign: "center", color: colors.primary }}>
              বাংলা
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
          onPress={() => handleLanguageChange('BENGALI')}
        >
          <Icon name='rightcircle' size={20} color={colors.primary} />
          <Text style={{ textAlign: "left", fontWeight: "500", fontSize: 16, color: "gray", width: "60%", }}>

            ‎ Skip for now
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default Language;
