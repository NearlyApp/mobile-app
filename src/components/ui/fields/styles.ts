import { COLORS, RADIUS, SPACING } from '@styles/variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textField: {
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.gray300,
    marginVertical: SPACING.small,
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    color: COLORS.gray900,
  },
  textFieldErrored: {
    color: COLORS.destructive,
    borderColor: COLORS.destructive,
    borderWidth: 1,
  },

  wrapper: {
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xSmall,
  },
  checkbox: {
    width: SPACING.large,
    height: SPACING.large,
    borderRadius: RADIUS.xSmall,
    borderWidth: 2,
    borderColor: COLORS.gray500,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});

export default styles;
