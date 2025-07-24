import { COLORS, RADIUS } from '@styles/variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 0,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    borderTopStartRadius: RADIUS.xLarge,
  },
});

export default styles;
