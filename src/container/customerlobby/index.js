import React, { useContext, useEffect, useState, useLayoutEffect,StatusBar } from "react";
import { SafeAreaView, Alert, Text, View, FlatList,StyleSheet,Button,Linking } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../../firebase/config";
import { color,appStyle } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser,AddTask, RemoveActive,RemoveTask,UpdateActiveMeet } from "../../network";
import { InputField, RoundCornerButton, Logo, CuteButton } from "../../component";


export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [drivet,setDriver] = useState("");
  const [locationt,setLocation] = useState("");
  const [endlocationt,setEndLocation] = useState("");
  const [pricet,setPrice] = useState("");
  const [waitert,setWaiter] = useState("");
  const [driveidt,setDriveid] = useState("");
  const [isFound,checkFound] = useState(true);
  const [isMetc,checkMeetc] = useState(true);
  const [startipt,setStartIp]=useState("");
  const [destipt,setDestIp]=useState("");
 

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
        .ref("actives/"+uuid+"/startlocation")
        .on("value", (dataSnapshot) => {
          locationnow = dataSnapshot.val();
          setLocation(locationnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+uuid+"/endlocation")
        .on("value", (dataSnapshot) => {
          endlocationnow = dataSnapshot.val();
          setEndLocation(endlocationnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+uuid+"/startip")
        .on("value", (dataSnapshot) => {
          startipnow = dataSnapshot.val();
          setStartIp(startipnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+uuid+"/destip")
        .on("value", (dataSnapshot) => {
          destipnow = dataSnapshot.val();
          setDestIp(destipnow)
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
  const openLink = (itsip) => {
    Linking.openURL(itsip);
  };

  




  const onChattap = (drivername,driveridna) => {
      navigation.navigate("Chat", {
        name: drivername,
        guestUserId: driveridna,
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
    style={{ flex: 1, backgroundColor: color.Orange }}
    //style={stylex.container}
    >
      <Text> </Text>
        <Text> </Text>
      
      <Text
      style={{textAlign: "center",color : color.BLUE,fontSize: 25,fontWeight: 'bold'}}
      >
        Status: {waitert}
        </Text>
        <Text> </Text>
      <Text
      style={{color :color.WHITE, fontSize: 20}}
      >
        Your driver: {drivet}
        </Text>
        <Text> </Text>
        <Text
      style={{color:color.WHITE,fontSize: 20}}
      
      >
        Detail of your ride: From {locationt}  To {endlocationt}
        </Text>
        <Text> </Text>
        <Text
      style={{color:color.WHITE,fontSize: 20}}
      >
        Cost: {pricet} baht
        </Text>
        
        {/* <RoundCornerButton title="Cancel Search" 
       onPress={() => onCanc()} /> */}

        <Text> </Text>
        <Text> </Text>
         <Button
       titleStyle={{
       color: color.BLACK,
       fontSize: 20,
   }}
       style = {{ 
        backgroundColor: color.Orange,
    width: '50%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
         onPress={() => onChattap(drivet,driveidt)}
        disabled={isFound}
        
       />
      {/* <RoundCornerButton title=  "Chat"
       onPress={() => onChattap("aero","nvojufBwJJfuFqaIlYg17rtjLVo2")} /> */}
      
       <Text> </Text>
       <Text> </Text>
       <Button
       titleStyle={{
       color: color.BLACK,
       fontSize: 20,
   }}
       style = {{ 
         //backgroundColor: color.Orange,
    width: '50%',
    // height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: appStyle.btnMarginVertical,
    fontSize: 26, fontWeight: 'bold'
  }}
        onPress={() => onCanc()}
        disabled={!isFound}
        title= "Cancel Search"
       />
       <Text> </Text>
       <Text> </Text>
       <Button 
      // style = {styles.text}
       titleStyle={{
       color: color.WHITE,
       fontSize: 16,
   }}
      style = {{ 
         backgroundColor: color.Orange,
    width: '50%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    //fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
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

