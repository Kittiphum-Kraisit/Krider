import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  input: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "85%",
  },

  sendBtnContainer: {
    height: appStyle.fieldHeight,
    backgroundColor: color.DARK_GRAY,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "15%",
  },
  CameraBtn:{
    //backgroundColor: color.DARK_GRAY,
    borderRadius: 1,
    padding: 1,
    marginBottom: 1,
    //shadowColor: color.DARK_GRAY,
    //shadowOffset: { width: 0, height: 1 },
    //shadowRadius: 1,
    //shadowOpacity: 0.35,
    
  }
});

