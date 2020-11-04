import React, { useContext, useEffect, useState, useLayoutEffect,StatusBar } from "react";
import { SafeAreaView, Alert, Text, View, FlatList,StyleSheet,Button,Linking } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ImagePicker from "react-native-image-picker";
import { Profile, ShowUsers, StickyHeader,ShowActives, ShowDriver, ShowPrice } from "../../component";
import firebase from "../../firebase/config";
import { color,appStyle } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight,cuuid, setUniqueValue } from "../../utility/constants";
import { clearAsyncStorage, setAsyncStorage,keys } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser,AddTask, RemoveActive,RemoveTask } from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  //drivenow = "k";
  //cuuid = cuuid;
  const [drivet,setDriver] = useState("");
  const [locationt,setLocation] = useState("");
  const [endlocationt,setEndLocation] = useState("");
  const [pricet,setPrice] = useState("");
  const [waitert,setWaiter] = useState("");
  const [isMet,checkMeet] = useState(true);
  const [startipt,setStartIp]=useState("");
  const [destipt,setDestIp]=useState("");

  // var allprice = 800;
  // var head = 8;
  // var eachprice = allprice/head;

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
      //   .ref("actives/"+cuuid+"/driveid")
      //   .on("value", (dataSnapshot) => {
      //     checkdriverid = dataSnapshot.val();
      //     if (uuid != checkdriverid){
      //       cuuid = ""
      //       navigation.navigate("Task Feed");
      //     }
      //     dispatchLoaderAction({
      //       type: LOADING_STOP,
      //     });
      //   });
      
        firebase
        .database()
        .ref("actives/"+cuuid+"/cusname")
        .on("value", (dataSnapshot) => {
          drivenow = dataSnapshot.val();
          setDriver(drivenow)
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
    setnewuuid = uuid;
    RemoveActive(cuuid);
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

  //var location = {location}
  //var price = {price}
  //var driver = {driver}
  // * GET OPACITY


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
      style={{textAlign: "center",}}
      >
        Status: Pick up your customer
        </Text>
      <Text
      style={color.BLACK}
      style={{textAlign: "center",}}
      >
        Your Customer: {drivet}
        </Text>
        <Text
      style={color.BLACK}
      style={{textAlign: "center",}}
      >
        Detail of your ride: From {locationt}  To {endlocationt}
        </Text>
        <Text
      style={color.BLACK}
      style={{textAlign: "center",}}
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
       />
      <RoundCornerButton title="End Job" 
       onPress={() => onEndJob()} />
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
        onPress={() => onChattap(drivet,cuuid)}
        title= "Chat"
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
       
    </SafeAreaView>
  );
};

