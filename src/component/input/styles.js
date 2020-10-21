import { StyleSheet } from "react-native";
import { appStyle, color } from "../../utility";

export default StyleSheet.create({
  input: {
    paddingLeft: 16,
    //backgroundColor: appStyle.fieldBgColor,
    //backgroundColor: "rgb(250,220,170)" ,
    backgroundColor: "rgb(251, 198, 135)" ,
    opacity : 0.7,
    width: "90%",
    //color: appStyle.fieldTextColor,
    color: color.Orange,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16,
  },
});
