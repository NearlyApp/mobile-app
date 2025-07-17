import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import * as VARIABLES from '@styles/variables';
import { ButtonSize } from '.';
import { ButtonVariant } from '@custom-types/variants';

export default StyleSheet.create({
    baseButton: {
        borderRadius: VARIABLES.RADIUS.small,
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export const getButtonStyle = (variant: ButtonVariant, size: ButtonSize, disabled: boolean) => {
    const styles: StyleProp<ViewStyle>[] = []
    switch (typeof size) {
        case 'number': {
            styles.push({ paddingVertical: size, paddingHorizontal: size });
            break;
        }
        case 'string': {
            styles.push({ paddingVertical: VARIABLES.SPACING[size], paddingHorizontal: VARIABLES.SPACING[size] });
            break;
        }
    }

    const colorKey = (variant in VARIABLES.COLORS ? variant : 'secondary') as keyof typeof VARIABLES.COLORS;
    styles.push({
        backgroundColor: VARIABLES.COLORS[colorKey],
        opacity: disabled ? 0.5 : 1,
    })

    return styles
};

