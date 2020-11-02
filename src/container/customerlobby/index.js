import React, { useContext, useEffect, useState, useLayoutEffect,StatusBar } from "react";
import { SafeAreaView, Alert, Text, View, FlatList,StyleSheet } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ImagePicker from "react-native-image-picker";
import { Profile, ShowUsers, StickyHeader,ShowActives, ShowDriver, ShowPrice } from "../../component";
import firebase from "../../firebase/config";
import { color,appStyle } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser,AddTask, RemoveActive,RemoveTask,UpdateActiveMeet } from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";
import { Button } from "native-base";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [drivet,setDriver] = useState("");
  const [locationt,setLocation] = useState("");
  const [pricet,setPrice] = useState("");
  const [waitert,setWaiter] = useState("");
  const [driveidt,setDriveid] = useState("");
  const [isFound,checkFound] = useState(true);
  const [isMetc,checkMeetc] = useState(true);

  const [userDetail, setUserDetail] = useState({
    id: "",
    driver: "",
    location: "",
    price:"",
    driveid:"",
    //drivenow:"",
  });
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const { profileImg, name } = userDetail;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcons
          name="logout"
          size={26}
          color={color.WHITE}
          style={{ right: 10 }}
          onPress={() =>
            Alert.alert(
              "Accident Prevention",
              "Do you want to log out",
              [
                {
                  text: "Sure",
                  onPress: () => logout(),
                },
                {
                  text: "Cancel",
                },
              ],
              { cancelable: false }
            )
          }
        />
        
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
      // firebase
      //   .database()
      //   .ref("actives/"+uuid+"/uuid")
      //   .on("value", (dataSnapshot) => {
      //     checkstill = dataSnapshot.val();
      //     if (uuid != checkstill){
      //       navigation.navigate("Location Picker");
      //     }
      //     dispatchLoaderAction({
      //       type: LOADING_STOP,
      //     });
      //   });
      firebase
        .database()
        .ref("actives/"+uuid+"/driveid")
        .on("value", (dataSnapshot) => {
          driveidnow = dataSnapshot.val();
          setDriveid(driveidnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+uuid+"/driver")
        .on("value", (dataSnapshot) => {
          drivenow = dataSnapshot.val();
          setDriver(drivenow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+uuid+"/location")
        .on("value", (dataSnapshot) => {
          locationnow = dataSnapshot.val();
          setLocation(locationnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+uuid+"/price")
        .on("value", (dataSnapshot) => {
          pricenow = dataSnapshot.val();
          setPrice(pricenow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+uuid+"/waiter")
        .on("value", (dataSnapshot) => {
          waiternow = dataSnapshot.val();
          setWaiter(waiternow)
          if(waiternow != "Finding your driver"){
            checkFound(false)
            checkMeetc(false)
          }
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      alert(error);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    }
  }, []);

  // * LOG OUT
  const logout = () => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            navigation.replace("Login");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(err));
  };
  const onCanc = () => {
    navigation.navigate("Location Picker");
    RemoveTask(uuid);
    RemoveActive(uuid);

  };
  const onMeet = () => {
    UpdateActiveMeet(uuid);
    checkMeetc(true);

  };

  




  const onChattap = () => {
      navigation.navigate("Chat", {
        driver,
        driveid,
        currentUserId: uuid,
      });

  };

  


  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };
  return (
    <SafeAreaView 
    style={{ flex: 1, backgroundColor: color.WHITE }}
    //style={stylex.container}
    >
      
      <Text
      style={color.RED}
      >
        Status: {waitert}
        </Text>
      <Text
      style={color.BLACK}
      >
        Your driver: {drivet}
        </Text>
        <Text
      style={color.BLACK}
      >
        Detail of your ride: {locationt} 
        </Text>
        <Text
      style={color.BLACK}
      >
        Cost: {pricet} baht
        </Text>

        <Text>Chat</Text>
         <Button
       titleStyle={{
       color: color.BLACK,
       fontSize: 20,
   }}
       style = {{ 
         //backgroundColor: color.Orange,
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
         onPress={() => onChattap()}
        disabled={isFound}
        title= "Chat"
       />
      {/* <RoundCornerButton title=  "Chat"
       onPress={() => onChattap("aero","nvojufBwJJfuFqaIlYg17rtjLVo2")} /> */}
      <RoundCornerButton title="Cancel Search" 
       onPress={() => onCanc()} />
       <Text>Cancel Search</Text>
       <Button
       titleStyle={{
       color: color.BLACK,
       fontSize: 20,
   }}
       style = {{ 
         //backgroundColor: color.Orange,
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
        onPress={() => onCanc()}
        disabled={!isFound}
        title= "Cancel Search"
       />
       <Text>I Meet My Driver</Text>
       <Button 
      // style = {styles.text}
       titleStyle={{
       color: color.WHITE,
       fontSize: 16,
   }}
      style = {{ 
         //backgroundColor: color.Orange,
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
 }}
        onPress={() => onMeet()}
        disabled={isMetc}
        title= "I Meet My Driver"
       />
      {/* <FlatList

      /> */}
    </SafeAreaView>
  );
};
// const styles = StyleSheet.create({
//   text:{
//     fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
//     },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   myButton:{
//     width: '90%',
//     borderRadius: appStyle.btnBorderRadius,
//     height: appStyle.btnHeight,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: appStyle.btnMarginVertical,
//   }
// });
