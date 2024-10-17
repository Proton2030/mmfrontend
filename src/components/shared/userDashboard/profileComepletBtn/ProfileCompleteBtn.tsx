import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import {
  USER_INFO_FOUR,
  USER_INFO_THREE,
  USER_INFO_THREE_part2,
  USER_INFO_TWO,
} from '../../../../constants/forms/UserInformation';
import { useTheme } from 'react-native-paper';
import { selectLanguage } from '../../../../utils/commonFunction/languageSelect';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { OTHERS } from '../../../../constants/texts/others/Others';

const ProfileCompleteBtn = () => {
  const { user } = useContext<any>(AuthContext);
  const {
    ui: { language },
  } = useContext(UiContext);
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const isReligiousInfoIncomplete = USER_INFO_THREE_part2.some((field) => !user?.[field.id]);

  const isFamilyInfoIncomplete = USER_INFO_FOUR.some((field) => !user?.[field.id]);

  const isPersonalInfoIncomplete = USER_INFO_TWO.some((field) => !user?.[field.id]);

  const isEducationInfoIncomplete = USER_INFO_THREE.some((field) => !user?.[field.id]);

  const handlePersonalInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo2',
      params: {
        editable: true,
      },
    });
  };

  const handleEducationInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo3',
      params: {
        editable: true,
      },
    });
  };

  const handleReligiousInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo3_part2',
      params: {
        editable: true,
      },
    });
  };
  const handleFamilyInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo4',
      params: {
        editable: true,
      },
    });
  };

  const handleNavigate = () => {
    // if (isReligiousInfoIncomplete) {
    //   handleReligiousInfoNavigate();
    // } else if (isFamilyInfoIncomplete) {
    //   handleFamilyInfoNavigate();
    // } else if (isPersonalInfoIncomplete) {
    //   handlePersonalInfoNavigate();
    // } else if (isEducationInfoIncomplete) {
    //   handleEducationInfoNavigate();
    // } else {
    //   console.log('All sections are complete');
    // }

    if (isPersonalInfoIncomplete) {
      handlePersonalInfoNavigate();
    } else if (isEducationInfoIncomplete) {
      handleEducationInfoNavigate();
    } else if (isReligiousInfoIncomplete) {
      handleReligiousInfoNavigate();
    } else if (isFamilyInfoIncomplete) {
      handleFamilyInfoNavigate();
    } else {
      console.log('All sections are complete');
    }
  };

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleNavigate}>
      <Text style={[styles.buttonText, { color: colors.secondary }]}>
        {selectLanguage(OTHERS.complete_profile, language)}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileCompleteBtn;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
