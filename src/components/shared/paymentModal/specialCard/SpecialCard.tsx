import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Card, useTheme } from 'react-native-paper';

const SpecialCard = () => {
  const { colors } = useTheme();

  return (
    <>
      <Card
        style={{ marginVertical: 4, height: 'auto', padding: 10, backgroundColor: colors.background, marginTop: 20 }}
      >
        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Avatar.Icon size={26} icon="sale" />
            <Text style={{ fontSize: 17, fontWeight: '700', color: colors.primary }}>Special Offer</Text>
          </View>

          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.primary }}>&nbsp;Only 150৳</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 15, marginVertical: 8, color: colors.tertiary }}>
          Chat with Lia
        </Text>
        <Card
          style={{
            padding: 0,
            backgroundColor: colors.primary,
            borderRadius: 50,
            width: 'auto',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Buy Now</Text>
        </Card>
      </Card>
    </>
  );
};

export default SpecialCard;
