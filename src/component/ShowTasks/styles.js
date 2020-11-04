import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: color.SEMI_TRANSPARENT,
    borderBottomWidth: 1,
    borderColor: color.SILVER,
    //height: 50,
  },
  cardItemStyle: {
    backgroundColor: color.WHITE,
    //height: 50,
  },
  textStyle: {
      color: color.WHITE,
      fontSize: 18,
      fontWeight:"bold",
      //backgroundColor: "rgb(255, 213, 205)",
      backgroundColor: color.GREEN,
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: color.WHITE,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.DARK_GRAY,
  },
  thumbnailName: { fontSize: 30, color: color.WHITE, fontWeight: "bold" },
  LocationName: { fontSize: 20, color: color.BLACK, fontWeight: "bold" },
  PriceName: { fontSize: 25, color: color.Orange, fontWeight: "bold" },
});
