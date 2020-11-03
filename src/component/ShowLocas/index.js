import React from "react";
import { Text, TouchableOpacity,Button } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import styles from "./styles";
import { color } from "../../utility";

const ShowLocas = ({ id,locaname,ip,zone,onDirectTap}) => {
  return (
    <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          {/* <TouchableOpacity 
          //style={[styles.logoContainer]} 
          onPress={onAcceptTap}>
            <Text style={styles.textStyle} >ACCEPT TASK</Text>
            
          </TouchableOpacity> */}
          <Text style={styles.LocationName}

             >
              {id} 
            </Text>
          <Button 
          color= "rgb(0,120,0)"
          title="DIRECTION" 
          onPress={onDirectTap}
           />
          

          <Body>
            <Text style={styles.LocationName}

             >
              {locaname} 
            </Text>
            <Text style={styles.PriceName}
             >
              Zone: {zone} 
            </Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ShowLocas;
