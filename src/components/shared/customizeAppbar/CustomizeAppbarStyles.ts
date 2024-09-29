import { StyleSheet } from 'react-native';

export const appBarStyles = StyleSheet.create({
  parent: {
    paddingBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    justifyContent: 'flex-end',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    borderBottomWidth: 0.5,
    elevation: 4,
    height: 78,
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
