import { StyleSheet } from "react-native";

import { Colors, Metrics, Fonts } from '../../themes'

export default styles = StyleSheet.create({
    main: {
        overflow: "hidden",
        borderRadius: Metrics.borderRadius,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        minHeight: Metrics.ratio(50),
        marginVertical: Metrics.ratio(8),
        marginHorizontal: Metrics.ratio(10),
    },
    input: {
        width: Metrics.vw * 85,
        height: Metrics.ratio(55),
        textAlign: "left",
        backgroundColor: Colors.transparent,
        marginHorizontal: Metrics.ratio(10),
        fontSize: Metrics.ratio(14),
    },
    iconsRound: {
        width: Metrics.ratio(45),
        height: Metrics.ratio(45),
        borderRadius: Metrics.ratio(90),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.themeColor,
        backgroundColor: Colors.transparent,
    },
    passwordSecureiconStyle: {
        color: Colors.themeColor,
        fontSize: Metrics.ratio(24),
        position: "absolute",
        padding: Metrics.ratio(10),
        zIndex: 2,
        right: Metrics.ratio(10),
    },
});