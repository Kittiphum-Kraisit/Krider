import React, { useContext, useEffect, useState, useLayoutEffect,StatusBar } from "react";
import { SafeAreaView, Alert, Text, View, FlatList,StyleSheet,Button,Linking } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../../firebase/config";
import { color,appStyle } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight,cuuid, setUniqueValue,setisgetTask,gettask } from "../../utility/constants";
import { clearAsyncStorage, setAsyncStorage,keys } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser,AddTask, RemoveActive,RemoveTask,LastUpdateActiveTransaction,RemoveMessageLog, UserFree } from "../../network";
import { InputField, RoundCornerButton, Logo, CuteButton } from "../../component";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [cusn,setCusname] = useState("");
  const [locationt,setLocation] = useState("");
  const [endlocationt,setEndLocation] = useState("");
  const [pricet,setPrice] = useState("");
  const [waitert,setWaiter] = useState("");
  const [isMet,checkMeet] = useState(true);
  const [startipt,setStartIp]=useState("");
  const [destipt,setDestIp]=useState("");
  const [driveState,setDriveState] = useState("");


  // var allprice = 800;
  // var head = 8;
  // var eachprice = allprice/head;

  const [userDetail, setUserDetail] = useState({
    id: "",
    driver: "",
    location: "",
    price:"",
    driveid:"",
    //cusnow:"",
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
  // useEffect (() => {
  //   firebase
  //       .database()
  //       .ref("actives/"+cuuid+"/driveid")
  //       .once("value", (dataSnapshot) => {
  //         var checkdriveid = dataSnapshot.val();
  //         if (checkdriveid != uuid & waitert == "Finding your driver"){
  //           var setnewuuid = uuid;
  //           clearAsyncStorage()
  //           setAsyncStorage(keys.uuid,setnewuuid)
  //           setUniqueValue(setnewuuid);
  //           navigation.navigate("Task Feed");
  //           alert("Sorry, This Task has been taken.")
  //         }
  //       });
  //  },[]);
  // useEffect (() => {
  //   if (gettask == "aborttask"){
  //    var setnewuuid = uuid;
  //           clearAsyncStorage()
  //           setAsyncStorage(keys.uuid,setnewuuid)
  //           setUniqueValue(setnewuuid);
  //           navigation.navigate("Task Feed");
  //           alert("Sorry, This Task has been taken.") 
  //   }
  //  },[]);
  
  useEffect (() => {
    if (waitert== "Found your driver"){
      setDriveState("Pickup Your Customer")
    }
    else if (waitert== "Enjoy The Ride !"){
      setDriveState("Bring Your Customer To Destination")
    }
   });
  

  useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
        firebase
        .database()
        .ref("actives/"+cuuid+"/cusname")
        .on("value", (dataSnapshot) => {
          cusnow = dataSnapshot.val();
          setCusname(cusnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+cuuid+"/startlocation")
        .on("value", (dataSnapshot) => {
          locationnow = dataSnapshot.val();
          setLocation(locationnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+cuuid+"/endlocation")
        .on("value", (dataSnapshot) => {
          endlocationnow = dataSnapshot.val();
          setEndLocation(endlocationnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+cuuid+"/startip")
        .on("value", (dataSnapshot) => {
          startipnow = dataSnapshot.val();
          setStartIp(startipnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+cuuid+"/destip")
        .on("value", (dataSnapshot) => {
          destipnow = dataSnapshot.val();
          setDestIp(destipnow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+cuuid+"/price")
        .on("value", (dataSnapshot) => {
          pricenow = dataSnapshot.val();
          setPrice(pricenow)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("actives/"+cuuid+"/waiter")
        .on("value", (dataSnapshot) => {
          waiternow = dataSnapshot.val();
          setWaiter(waiternow)
          if (waiternow == "Enjoy The Ride !"){
            checkMeet(false)
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



const onCall = (phonenumb) => {
  //Linking.openURL(`tel:${phoneNumber}`)
  Linking.openURL(`tel:${phonenumb}`)
  };

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
  const onEndJob = () => {
    var setnewuuid = uuid;
    RemoveActive(cuuid);
    clearAsyncStorage()
    setAsyncStorage(keys.uuid,setnewuuid)
    setUniqueValue(setnewuuid);
    navigation.navigate("Task Feed");
  };
  const onnewEndJob = () => {
    RemoveMessageLog(uuid)
    LastUpdateActiveTransaction(cuuid)
    UserFree(uuid)
    var setnewuuid = uuid;
    //RemoveActive(cuuid);
    clearAsyncStorage()
    setAsyncStorage(keys.uuid,setnewuuid)
    setUniqueValue(setnewuuid);
    navigation.navigate("Task Feed");
  };
  const openLink = (itsip) => {
    Linking.openURL(itsip);
  };

  



  const onChattap = ( custname, cusid) => {
      navigation.navigate("Chat", {
        name: custname,
        guestUserId: cusid,
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
      style={{textAlign: "center",color : color.BLUE,fontSize: 25, fontWeight: 'bold'}}
      >
        Status: {driveState}
        </Text>
        <Text> </Text>
      <Text
      style={{color : color.WHITE,fontSize: 20}}
      >
        Your Customer: {cusn}
        </Text>
        <Text> </Text>
        <Text
      style={{color : color.WHITE,fontSize: 20}}
      >
        Detail of your ride: From {locationt}  To {endlocationt}
        </Text>
        <Text> </Text>
        <Text
      style={{color : color.WHITE,fontSize: 20}}
      >
        Cost: {pricet} baht
        </Text>
        <Text> </Text>
       <Text> </Text>
      {/* <RoundCornerButton title=  "Chat"
       onPress={() => onChattap(drivet,cuuid)} /> */}
       <Button
       titleStyle={{
       color: color.BLACK,
       fontSize: 20,
   }}
       style = {{ 
         //backgroundColor: color.Orange,
    width: '50%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
        onPress={() => openLink(startipt)}
        title= "Direction To Customer"
        disabled={!isMet}
       />
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
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
        onPress={() => openLink(destipt)}
        title= "Direction To Destination"
        disabled={isMet}
       />
       <Text> </Text>
       <Text> </Text>
      {/* <RoundCornerButton title="End Job" 
       onPress={() => onEndJob()} /> */}
       <Button
       style = {{ backgroundColor: color.Orange,
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    //fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
        onPress={() => onChattap(cusn,cuuid)}
        title= "Chat"
        disabled={!isMet}
       />
       <Text> </Text>
       <Text> </Text>
       <Button
       style = {{ backgroundColor: color.Orange,
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    //fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
        onPress={() => onEndJob()}
        disabled={isMet}
        title= "End Job"
       />
       <Button
       style = {{ backgroundColor: color.Orange,
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
    //fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor
  }}
        onPress={() => onnewEndJob()}
        disabled={isMet}
        title= "End Job"
       />
       
    </SafeAreaView>
  );
};

