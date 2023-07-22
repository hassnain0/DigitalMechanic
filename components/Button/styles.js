import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../themes";
export default styles = StyleSheet.create({
  main: {
    borderBottomLeftRadius:10,
    overflow: "hidden",
    borderRadius: Metrics.borderRadius,
    // backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    height: Metrics.ratio(44),
    borderRadius: Metrics.ratio(90),
    marginVertical: Metrics.ratio(2.5),
    //   marginHorizontal:20 * Metrics.vw,
    justifyContent: "center",
    marginHorizontal: 0,
  },
  buttonText: {
    textAlign: "center",
    fontWeight:'bold',
    // fontSize: Metrics.ratio(14),
    color: Colors.white,
    // textTransform:"uppercase",
    textTransform: "uppercase",
    fontSize: Metrics.ratio(14),
    // fontWeight: "bold",
  },
  buttonTouch: {
    
    width: "100%",
    minHeight: Metrics.ratio(70),
    alignItems: "center",
    justifyContent: "center",
  },
});