import React, { useContext, useEffect, useState, useLayoutEffect,StatusBar } from "react";
import { SafeAreaView, Alert, Text, View, FlatList,StyleSheet,Button } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../../firebase/config";
import { color,appStyle } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight,cuuid } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser,AddTask, RemoveActive,RemoveTask } from "../../network";
import { InputField, RoundCornerButton, Logo, CuteButton } from "../../component";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [cusn,setCusname] = useState("");
  const [locationt,setLocation] = useState("");
  const [pricet,setPrice] = useState("");
  const [waitert,setWaiter] = useState("");
  const [isMet,checkMeet] = useState(true);
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
        .ref("actives/"+cuuid+"/location")
        .on("value", (dataSnapshot) => {
          locationnow = dataSnapshot.val();
          setLocation(locationnow)
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
    navigation.navigate("Task Feed");
    RemoveTask(cuuid);
    RemoveActive(cuuid);

  };
  



  const onChattap = ( driver, driveid) => {
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
      style={{textAlign: "center",}}
      >
        Status: Pick up your customer
        </Text>
      <Text
      style={color.BLACK}
      style={{textAlign: "center",}}
      >
        Your Customer: {cusn}
        </Text>
        <Text
      style={color.BLACK}
      style={{textAlign: "center",}}
      >
        Detail of your task: {locationt} 
        </Text>
        <Text
      style={color.BLACK}
      style={{textAlign: "center",}}
      >
        Cost: {pricet} baht
        </Text>
      <RoundCornerButton title=  "Chat"
       onPress={() => onChattap("aero","nvojufBwJJfuFqaIlYg17rtjLVo2")} />
      <RoundCornerButton title="End Job" 
       onPress={() => onEndJob()} />
      <Button
        onPress={() => onEndJob()}
        disabled={isMet}
        title= "End Job"
       />
    </SafeAreaView>
  );
};

