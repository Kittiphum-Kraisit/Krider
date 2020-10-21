import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";
import { smallDeviceHeight } from "../../utility/constants";

const getDimensions = () => {
  if (appStyle.deviceHeight > smallDeviceHeight) {
    return {
      height: 150,
      width: 190,
      borderRadius: 50,
      logoFontSize: 50,
    };
  } else {
    return {
      height: 120,
      width: 160,
      borderRadius: 40,
      logoFontSize: 30,
    };
  }
};

export default StyleSheet.create({
  logo: {
    height: getDimensions().height,
    width: getDimensions().width,
    borderRadius: getDimensions().borderRadius,
    backgroundColor: color.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: getDimensions().logoFontSize,
    fontWeight: "bold",
    color: color.Orange,
  },
  imlogo:{
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  containerr: {
    flex: 1,
    flexDirection: "column"
  },
  imager: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textr: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  }

  
});


