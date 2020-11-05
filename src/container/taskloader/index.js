import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, Alert, Text, View, FlatList ,Picker} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { ShowTasks } from "../../component";
import firebase from "../../firebase/config";
import { color ,appStyle} from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight,cuuid,setCus, zonesort ,setZone } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import {  LogOutUser, RemoveTask, UpdateActive,UpdateActiveDid } from "../../network";
import {Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout} from 'async-mutex';
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ navigation }) => {
    useEffect(() => {
    // dispatchLoaderAction({
    //   type: LOADING_START,
    // });
    try {
    //  firebase
    //     .database()
    //     .ref("tasks")
    //     .on("value", (dataSnapshot) => {
    //       let users = [];
    //       let currentUser = {
    //         id: "",
    //         location: "",
    //         price: "",
    //       };
    //       dataSnapshot.forEach((child) => {
    //         if (uuid === child.val().uuid) {
    //           currentUser.id = uuid;
    //           currentUser.name = child.val().name;
    //           currentUser.location = child.val().location;
    //           currentUser.price = child.val().price;
    //         } else {
    //           if (child.val().zone== zonesort
    //           || child.val().allzone == zonesort
    //           ){
    //           users.push({
    //             id: child.val().uuid,
    //             location: child.val().location,
    //             price: child.val().price,
    //           });
    //           setAllUsers(users);
    //         }
    //         }
    //       });
    //       setUserDetail(currentUser);
          
        navigation.navigate("Task Feed");
        //   dispatchLoaderAction({
        //     type: LOADING_STOP,
        //   });
          
    //     });
    }
    catch (error) {
      alert(error);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    }
  }, []);
  return (
  <Text>{zonesort}</Text>
  );


  
};