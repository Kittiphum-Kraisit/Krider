import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, Alert, Text, View, FlatList } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { ShowTasks } from "../../component";
import firebase from "../../firebase/config";
import { color ,appStyle} from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight,cuuid,setCus } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import {  LogOutUser, RemoveTask, UpdateActive,UpdateActiveDid } from "../../network";
import {Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout} from 'async-mutex';
import { TouchableOpacity } from "react-native-gesture-handler";







export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
    const [userDetailn, setUserDetailn] = useState({
    id: "",
    name: "",
  });
  //cuuid = "";
  const [checkdriveridt,Checkdrivebf] = useState("");

  const [userDetail, setUserDetail] = useState({
    id: "",
    location: "",
    price: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersn, setAllUsersn] = useState([]);
  const {  name } = userDetailn;
 // const [name,setUserDetailn]=useState("");
  


  const [getScrollPosition, setScrollPosition] = useState(0);

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
        .ref("tasks")
        .on("value", (dataSnapshot) => {
          let users = [];
          let currentUser = {
            id: "",
            location: "",
            price: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.location = child.val().location;
              currentUser.price = child.val().price;
            } else {
              users.push({
                id: child.val().uuid,
                location: child.val().location,
                price: child.val().price,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        firebase
        .database()
        .ref("users")
        .on("value", (dataSnapshot) => {
          let usersn = [];
          let currentUsern = {
            id: "",
            name: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUsern.id = uuid;
              currentUsern.name = child.val().name;
            } else {
              usersn.push({
                id: child.val().uuid,
                name: child.val().name,
              });
            }
          });
          setUserDetailn(currentUsern);
          setAllUsersn(usersn);
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
  const acceptTap = ( guestUserId) => {
           RemoveTask(guestUserId);
           UpdateActive(guestUserId,name,uuid);
           setCus(guestUserId)
           navigation.navigate("Task Room");
  };
  // const mutex = new Mutex();
  // const acceptTap = async( guestUserId) => {
  //   console.log(guestUserId)
  //   const release = await mutex.acquire();
  //   try {
  //     RemoveTask(guestUserId);
  //     UpdateActive(guestUserId,name,uuid);
  //     //UpdateActiveDid(guestUserId,uuid);
  //     setCus(guestUserId)
  //     navigation.navigate("Task Room");
  //       } finally {
  //     release();
  //       }
  // };


  





    const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
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

    //render(){
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: color.BLACK }}>
      {/* All tasks */}
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(event) =>
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }
        ListHeaderComponent={
          <View
            style={{
              opacity:
                getScrollPosition < getOpacity()
                  ? (getOpacity() - getScrollPosition) / 100
                  : 0,
            }}
          >
            
          </View>
        }
        renderItem={({ item }) => (
          <ShowTasks
            location={item.location}
            price = {item.price}
            onAcceptTap={() => acceptTap(item.id)}
            
          />
        )}
      />
      

    </SafeAreaView>
    
  );
        
  };
//}
