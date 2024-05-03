import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container: {
    marginTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  radio: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 20,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'white',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  radioActive: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 4,
  },
  radioTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  radioPrice: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
  },
  radioPriceActive: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  radioLabelActive: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  radioUsers: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  radioUsersActive: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  radioDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    marginTop: 10,
  },
  radioDescriptionActive: {
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
    marginTop: 10,
  },
  pointsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointIcon: {
    marginRight: 8,
  },
  pointText: {
    color: 'white',
    fontSize: 18,
  },
});
