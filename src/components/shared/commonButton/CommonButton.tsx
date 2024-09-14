import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import UiContext from '../../../contexts/uiContext/UIContext';
import { CommonButtonProps } from '../../../@types/props/CommonButton.props';

const CommonButton = ({ loading, handleAction, text }: CommonButtonProps) => {
  const { colors } = useTheme();
  const { ui } = useContext(UiContext);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        width: '100%',
        paddingHorizontal: 6,
        paddingVertical: 13,
        marginTop: 5,
        borderTopEndRadius: 25,
        borderBottomEndRadius: 25,
        borderTopLeftRadius: 25,
      }}
      onPress={handleAction}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          style={{
            fontWeight: '400',
            fontSize: 20,
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;