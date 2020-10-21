import React, { useContext } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  ImageBackground,
  Animated,
} from "react-native";
import { Store } from "../../context/store";
import { globalStyle, color } from "../../utility";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 1,
    elevation: 2,
    height,
    width,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.SEMI_TRANSPARENT,
  },
  indicator: {
    //backgroundColor: color.DARK_GRAY,
    height: 44,
    width: 44,
    borderRadius: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
// const styles = StyleSheet.create({
//     container: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         opacity: 0.7,
//         //backgroundColor: "black",
//         justifyContent: "center",
//         alignItems: "center",
//         width: 10,
//         height: 10,
//     }
// });

const Loader = () => {
  const globalState = useContext(Store);
  const { mapLoaderState } = globalState;
  const { loading } = mapLoaderState;

  return loading ? (
    //<View style={styles.loaderContainer}>
    //   <View style={styles.container}>
    //     <ImageBackground>
          
    //       source={require('./animated loader.png')}
    //     </ImageBackground>
        

    //   {/* <View style={styles.indicator}>
        
    //     <ActivityIndicator
    //       size="large"
    //       animating={loading}
    //       color={color.WHITE}
    //       style={{
    //         left: Platform.OS === "ios" ? 1.3 : 0,
    //         top: Platform.OS === "ios" ? 1 : 0,
    //       }}
    //     />
        
    //   </View> */}
    // </View>
    <Animated.Image style={styles.indicator} 
    source={require('./kogo.png')}
    //source={require('./kogo.png')}
    >
       
  </Animated.Image>
  // <Animated.Image style={styles.container} source={require('./animated loader.png')}>
  //      </Animated.Image>


  ) : null;
};

export default Loader;
