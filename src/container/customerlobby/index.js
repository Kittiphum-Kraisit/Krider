import React, { useContext, useEffect, useState, useLayoutEffect,StatusBar } from "react";
import { SafeAreaView, Alert, Text, View, FlatList,StyleSheet } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ImagePicker from "react-native-image-picker";
import { Profile, ShowUsers, StickyHeader,ShowActives, ShowDriver, ShowPrice } from "../../component";
import firebase from "../../firebase/config";
import { color } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser,AddTask, RemoveActive,RemoveTask } from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [drivet,setDriver] = useState("");
  const [driveidt,setDriverid] = useState("");
  const [locationt,setLocation] = useState("");
  const [pricet,setPrice] = useState("");
  const [waitert,setWaiter] = useState("");


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
          setDriverid(driveidnow)
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
  const onCanc = () => {
    navigation.navigate("Location Picker");
    RemoveTask(uuid);
    RemoveActive(uuid);

  };
  

  //var loca  = firebase.database().ref


  const onChattap = ( drivername, driveidna) => {
    navigation.navigate("Chat", {
      name: drivername,
      guestUserId: driveidna,
      currentUserId: uuid,
    });

  };

  return (
    <SafeAreaView 
    style={{ flex: 1, backgroundColor: color.WHITE }}
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
      <RoundCornerButton title =  "Chat"
       onPress={() => onChattap(drivet,driveidt)} />
      <RoundCornerButton title="Cancel Search" 
       onPress={() => onCanc()} />
      {/* <FlatList

      /> */}
    </SafeAreaView>
  );
};