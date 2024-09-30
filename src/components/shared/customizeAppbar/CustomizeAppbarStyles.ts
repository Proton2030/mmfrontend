import { StyleSheet } from 'react-native';

export const appBarStyles = StyleSheet.create({
  parent: {
    paddingBottom: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    justifyContent: 'flex-end',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    borderBottomWidth: 0.5,
    paddingHorizontal: 15,
    elevation: 4,
    paddingTop: 30
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
