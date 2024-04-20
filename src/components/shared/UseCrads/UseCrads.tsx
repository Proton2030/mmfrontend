import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import UiContext from '../../../contexts/uiContext/UIContext';

// Define the prop types for the component
interface MenuCardProps {
  option: {
    icon: string;
    text: {
      [language: string]: string;
    };
    route: string | null;
    color: string;
    onPress: (arg: string) => void;
    pressArg?: string;
  };
  ui: {
    language: string;
  };
  index: number;
}

// Define the MenuCard component
const MenuCard: React.FC<MenuCardProps> = ({ option, ui, index }: any) => (
  <Card
    key={index}
    style={[globalStyles.menuCard]}
    onPress={() => option.onPress(option.route ? option.route : option.pressArg)}
  >
    <Card.Content>
      <View style={styles.cardContainer}>
        <View style={styles.optionContainer}>
          <Icon2 name={option.icon} size={20} color={option.color} />
          <Text style={globalStyles.menucardText}>{option.text[ui.language]}</Text>
        </View>
        <Icon2 name="arrow-right" size={20} color={option.color} />
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  scrollContainer: {
    paddingLeft: 20,
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  listSection: {
    marginTop: 20,
    paddingRight: 15,
  },
});

export default MenuCard;
