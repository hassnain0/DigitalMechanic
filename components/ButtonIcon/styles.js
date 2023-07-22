import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../themes";
export default styles = StyleSheet.create({
  main: {
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
    paddingLeft:Metrics.ratio(10),
    // fontWeight: "bold",
  },
  buttonTouch: {
    width: "100%",
    minHeight: Metrics.ratio(70),
    alignItems: "center",
    justifyContent: "flex-start",
    // paddingHorizontal:Metrics.ratio(20),
    flexDirection:'row',
  },
  iconsRound: {
    width: Metrics.ratio(55),
    height: Metrics.ratio(45),
    borderTopLeftRadius:Metrics.ratio(22.5),
    borderBottomLeftRadius:Metrics.ratio(22.5),

    // borderRadius: Metrics.ratio(16),
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: Colors.themeColor,
    backgroundColor: Colors.white,
    
},
});