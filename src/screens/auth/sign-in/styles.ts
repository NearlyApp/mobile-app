import { SPACING } from "@styles/variables";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerMsg: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: [{ translateX: "-50%" }],
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: SPACING.large,
    },
});

export default styles;