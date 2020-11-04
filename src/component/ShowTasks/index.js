import React from "react";
import { Text, TouchableOpacity,Button } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import styles from "./styles";
import { color } from "../../utility";

const ShowTasks = ({ startlocation,endlocation,price, onAcceptTap,onStartloTap ,onEndloTap}) => {
  return (
    <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          {/* <TouchableOpacity 
          //style={[styles.logoContainer]} 
          onPress={onAcceptTap}>
            <Text style={styles.textStyle} >ACCEPT TASK</Text>
            
          </TouchableOpacity> */}
          <Button 
          color= "rgb(0,120,0)"
          title="ACCEPT TASK" 
          onPress={onAcceptTap}
           />
           {/* <Button 
          color= "rgb(0,120,0)"
          title="Startpoint Direction" 
          onPress={onStartloTap}
           />
           <Button 
          color= "rgb(0,120,0)"
          title="Endpoint Direction" 
          onPress={onEndloTap}
           /> */}
          

          <Body>
            <Text style={styles.LocationName}
<<<<<<< HEAD
=======
            onPress={onStartloTap}
             >
             From {startlocation} 
            </Text>
            <Text style={styles.LocationName}
            onPress={onEndloTap}
>>>>>>> d03791078f77854e869a727950637c35a112cd03
             >
             To {endlocation} 
            </Text>
            <Text style={styles.PriceName}
             >
              Price: {price} Baht
            </Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ShowTasks;
