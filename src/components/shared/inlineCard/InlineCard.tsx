import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { IInlineCardProps } from '../../../@types/props/InlineCardProps.types';
import { globalStyles } from '../../../globalStyles/GlobalStyles';

const InlineCard = ({ icon, titleKey, onClick, value, buttonIcon }: IInlineCardProps) => {
  const { colors } = useTheme();
  return (
    <Card
      style={{
        width: '100%',
        marginBottom: 16,
        backgroundColor: colors.surfaceVariant,
        justifyContent: 'space-between',
      }}
    >
      <Card.Content style={globalStyles.inlineFlex}>
        <View style={[globalStyles.inlineFlex, { columnGap: 10 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Icon name={icon} color={colors.primary} />
            <Text style={{ color: colors.scrim }}>{titleKey}</Text>
          </View>

          <TouchableOpacity onPress={() => onClick(value)}>
            <Text style={{ color: colors.scrim }}>{value}</Text>
          </TouchableOpacity>
        </View>

        <IconButton
          icon={buttonIcon}
          style={{ backgroundColor: colors.surface }}
          iconColor={colors.primary}
          onPress={() => onClick(value)}
        />
      </Card.Content>
    </Card>
  );
};

export default InlineCard;
