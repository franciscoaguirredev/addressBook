import {StyleSheet} from 'react-native';

export interface ThemeColors {
  primary: string;
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
  iconColor: string;
}
export const colors: ThemeColors = {
  primary: '#000417',
  text: 'white',
  background: '#000417',
  cardBackground: '#383D56',
  buttonTextColor: 'white',
  iconColor: 'white'
};

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.text,
  },
  text:{
    fontSize: 16,
    color: colors.text
  },
  sublitie: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  globalMargin: {
    paddingHorizontal: 20,
    flex: 1,
  },
  btnPrinary: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: colors.text,
    fontSize: 16,
  },
});
