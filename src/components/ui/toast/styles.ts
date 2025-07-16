
import { ToastVariant } from '@custom-types/variants';
import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@styles/variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    toast: {
        padding: SPACING.medium,
        borderRadius: RADIUS.medium,
        marginVertical: SPACING.small,
        minWidth: "80%",
        maxWidth: "100%",
    },
    titleText: {
        fontSize: FONT_SIZE.titleMedium,
        color: "white",
        fontWeight: FONT_WEIGHT.bold
    },
    text: {
        fontSize: FONT_SIZE.labelMedium,
        color: "white",
    },
    container: {
        position: "absolute",
        bottom: 60,
        width: "100%",
        alignItems: "center",

    },
});

export const getToastStyle = (variant: ToastVariant = "default") => {
    const colorKey = (variant in COLORS ? variant : "primary") as keyof typeof COLORS
    return { backgroundColor: COLORS[colorKey] };
}

export default styles;