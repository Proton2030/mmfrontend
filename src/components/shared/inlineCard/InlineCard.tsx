import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { IInlineCardProps } from '../../../@types/props/InlineCardProps.types';
import { globalStyles } from '../../../globalStyles/GlobalStyles';

const InlineCard = ({ icon, titleKey, onClick, value, buttonIcon }: IInlineCardProps) => {
  const { colors } = useTheme();
  return (
    <Card style={{ width: '100%', marginBottom: 16, backgroundColor: '#E71B73' }}>
      <Card.Content style={globalStyles.inlineFlex}>
        <View style={[globalStyles.inlineFlex, { columnGap: 10 }]}>
          <Icon name={icon} color="white" />
          <Text style={{ color: 'white' }}>{titleKey}</Text>
        </View>
        <TouchableOpacity onPress={() => onClick(value)}>
          <Text style={{ color: 'white' }}>{value}</Text>
        </TouchableOpacity>
        <IconButton
          icon={buttonIcon}
          style={{ backgroundColor: '#fde8f1' }}
          iconColor="#E71B73"
          onPress={() => onClick(value)}
        />
      </Card.Content>
    </Card>
  );
};

export default InlineCard;
