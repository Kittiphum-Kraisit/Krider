import React from 'react';
import {Text, View , Image, ImageBackground ,Animated} from 'react-native';
import styles from './styles';
import { globalStyle, color } from "../../utility";

export default ({logoStyle, logoTextStyle}) => (
  <View 
  style={[styles.logo, logoStyle]}
  //style={styles.containerr}
  >
   
    
      {/* <Text style={[styles.text, logoTextStyle]}>K-RIDER</Text> */}
      <Animated.Image style={globalStyle.tinyLogo}
    source={require('./kogo.png')}
  />
            
      
    
  </View>
);
