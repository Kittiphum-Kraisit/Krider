import React from "react";
import { Text, TouchableOpacity,Button } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import styles from "./styles";
import { color } from "../../utility";

const ShowDriver = ({ driver}) => {
  return (
    <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          {/* <TouchableOpacity 
          //style={[styles.logoContainer]} 
          onPress={onAcceptTap}>
            <Text style={styles.textStyle} >ACCEPT TASK</Text>
            
          </TouchableOpacity> */}
          {/* <Button 
          color= "rgb(0,120,0)"
          title="ACCEPT TASK" 
          onPress={onAcceptTap}
           /> */}
           

          

          <Body>
              <Text style={styles.LocationName}
             
             >
              
              
              {driver} 

            </Text>
            {/* <Text style={styles.LocationName}
             
             >
              
            </Text>
            <Text style={styles.LocationName}
             
             >
              
            </Text> */}
           
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ShowDriver;
