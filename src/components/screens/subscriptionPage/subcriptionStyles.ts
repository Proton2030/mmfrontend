import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#889797',
  },
  scrollDownBtn: {
    position: 'absolute',
    bottom: 0, // Adjust according to your layout
    alignSelf: 'center',
    zIndex: 1,
    flexDirection: "row",
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,

  },

  /** Header */
  header: {
    paddingHorizontal: 24,
    marginBottom: 28,
    paddingTop: 20
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdada',
    marginBottom: 16,
  },
  /** Form */
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingBottom: 24,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  form2: {
    flexShrink: 1,
    flexBasis: 0,
    paddingBottom: 24,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 20
  },
  formFooterText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Radio */
  radio: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderRadius: 24,
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
  },
  radioBody: {
    paddingLeft: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  radioLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  radioText: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '500',
    color: '#889797',
  },
  radioPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1d1d1d',
  },
  radioPriceActive: {
    transform: [
      {
        scale: 1.2,
      },
    ],
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: '#F82E08',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    borderColor: '#F82E08',
    marginTop: 12,
  },
  btnEmptyText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#F82E08',
  },
});
