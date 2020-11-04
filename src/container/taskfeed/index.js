import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, Alert, Text, View, FlatList ,Picker,Platform,PermissionsAndroid,Button,Linking} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { ShowTasks } from "../../component";
import firebase from "../../firebase/config";
import { color ,appStyle} from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight,cuuid,setCus, zonesort ,setZone } from "../../utility/constants";
import { clearAsyncStorage , setAsyncStorage,cuskeys } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import {  LogOutUser, RemoveTask, UpdateActive,UpdateActiveDid } from "../../network";
import {Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout} from 'async-mutex';
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputField, RoundCornerButton, Logo } from "../../component";
import Geolocation from '@react-native-community/geolocation'; 






export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
    const [userDetailn, setUserDetailn] = useState({
    id: "",
    name: "",
  });
  //cuuid = "";
  const [currentLong,setLong]=useState();
  const[currentLa,setLa]=useState();
  const[locaStatus,setlocaStatus]=useState('');


  const [checkdriveridt,Checkdrivebf] = useState("");

  const [userDetail, setUserDetail] = useState({
    id: "",
    startlocation: "",
    price: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersn, setAllUsersn] = useState([]);
  const {  name } = userDetailn;
   const [selectedValue, setSelectedValue] = useState("");
 // const [name,setUserDetailn]=useState("");
 const [nearest,setnear]=useState("Identify your zone ");
 var near = "hithere"
 //const [tryme,settry]=useState("sawas");

  


  const [getScrollPosition, setScrollPosition] = useState(0);
  const getLocation=()=>{
    setlocaStatus('Locating you...');
    Geolocation.getCurrentPosition(
      (position)=>{
        setlocaStatus('This is your location');

        const currentLong=JSON.stringify(position.coords.longitude);
        const currentLa=JSON.stringify(position.coords.latitude);
        setLong(currentLong);
        setLa(currentLa);
      },
      (error)=>{
        setlocaStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout:30000,
        maximumAge:1000
      },
    );

  };
  const trygetLocation=()=>{
    setlocaStatus('Locating you...');
    Geolocation.getCurrentPosition(
      (position)=>{
        setlocaStatus('This is your location');

        const currentLong=JSON.stringify(position.coords.longitude);
        const currentLa=JSON.stringify(position.coords.latitude);
        setLong(currentLong);
        setLa(currentLa);
      },
      (error)=>{
        setlocaStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout:30000,
        maximumAge:1000
      },
    );
    if (currentLong>=100.778166 && currentLong<=100.9){
      if (currentLa>=13.728611 && currentLa<=13.9){
        near = "Zone B"
      }else if (currentLa<13.728611 && currentLa>=13.1){
        near = "Zone A"
      }else {
        near = "You are too far from KMITL"
      }
    }
    else if (currentLong <100.778166 && currentLong >=100.1){
      if (currentLa>=13.728611 && currentLa<=13.9){
        near = "Zone C"
      }else if (currentLa <13.728611 && currentLa>= 13.1){
        near = "Zone D"
      }else {
        near = "You are too far from KMITL"
      }
    }
    else {
      near = "You are too far from KMITL"
    }
    setnear(near)
    
  };
  const subLocation=()=>{
    locaID = Geolocation.watchPosition(
      (position)=>{
        setlocaStatus('This is your position');
        console.log(position);
        const currentLong = JSON.stringify(position.coords.longitude);
        const currentLa = JSON.stringify(position.coords.latitude);
        setLong(currentLong);
        setLa(currentLa);
      },
      (error)=>{
        setlocaStatus(error.message);
      },
      {
        enableHighAccuracy:false,
        maximumAge:1000
      },
    );
  };

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
    const requestLocaPermission = async()=>{
      if (Platform.OS==='ios'){
        getLocation();
        subLocation();
      }else{
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              title:'Location Permission Required',
              message:'Please give this app permission to your location',

            },
          );
          if (granted ===PermissionsAndroid.RESULTS.GRANTED)
          {
            getLocation();
            subLocation();
          }else {
            setlocaStatus('Access Denied');
          }
        }catch (err){
          console.warn(err);
        }
      }
    };
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
            startlocation: "",
            price: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.startlocation = child.val().startlocation;
              currentUser.price = child.val().price;
            } else {
              users.push({
                id: child.val().uuid,
                startlocation: child.val().startlocation,
                price: child.val().price,
                endlocation: child.val().endlocation,
                startip: child.val().startip,
                destip: child.val().destip,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
        //  firebase
        // .database()
        // .ref("tasks")
        // .on("value", (dataSnapshot) => {
        //   let users = [];
        //   let currentUser = {
        //     id: "",
        //     location: "",
        //     price: "",
        //   };
        //   dataSnapshot.forEach((child) => {
        //     if (uuid === child.val().uuid) {
        //       currentUser.id = uuid;
        //       currentUser.name = child.val().name;
        //       currentUser.location = child.val().location;
        //       currentUser.price = child.val().price;
        //     } else {
              
        //       users.push({
        //         id: child.val().uuid,
        //         location: child.val().location,
        //         price: child.val().price,
        //       });
        //       setAllUsers(users);
            
        //     }
        //   });
        //   setUserDetail(currentUser);
          
        
        //   dispatchLoaderAction({
        //     type: LOADING_STOP,
        //   });
          
        // });
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
    setAsyncStorage(cuskeys.cuuid, guestUserId);
           RemoveTask(guestUserId);
           //let reusersagain = [];
           UpdateActive(guestUserId,name,uuid);
           setCus(guestUserId);
           //setAllUsers(reusersagain);
           navigation.navigate("Task Room");

  };
  const startloTap = (beginip) => {
    Linking.openURL(beginip);
  };
  const endloTap = (finip) => {
    Linking.openURL(finip);
  };
  const IdentZone = ()=>{
    getLocation();
    CalZone(currentLong,currentLa);
  }
  const CalZone =(cLong,cLa)=>{
    near = "Locating you"
    if (cLong>=100.778166 && cLong<=100.9){
      if (cLa>=13.728611 && cLa<=13.9){
        near = "Zone B"
      }else if (cLa<13.728611 && cLa>=13.1){
        near = "Zone A"
      }else {
        near = "You are too far from KMITL"
      }
    }
    else if (cLong <100.778166 && cLong >=100.1){
      if (cLa>=13.728611 && cLa<=13.9){
        near = "Zone C"
      }else if (cLa <13.728611 && cLa>= 13.1){
        near = "Zone D"
      }else {
        near = "You are too far from KMITL"
      }
    }
    else {
      near = "You are too far from KMITL"
    }
    setnear(near)
    settry("deekrub")
  }
  const ZoneCal = () => {
    getLocation();

    near = "Locating you"
    if (currentLong>=100.778166 && currentLong<=100.9){
      if (currentLa>=13.728611 && currentLa<=13.9){
        near = "Zone B"
      }else if (currentLa<13.728611 && currentLa>=13.1){
        near = "Zone A"
      }else {
        near = "You are too far from KMITL"
      }
    }
    else if (currentLong <100.778166 && currentLong >=100.1){
      if (currentLa>=13.728611 && currentLa<=13.9){
        near = "Zone C"
      }else if (currentLa <13.728611 && currentLa>= 13.1){
        near = "Zone D"
      }else {
        near = "You are too far from KMITL"
      }
    }
    else {
      near = "You are too far from KMITL"
    }
    setnear(near)

  };
  // near = "Locating you"
  //   if (currentLong>=13.728611 && currentLong<=13.9){
  //     if (currentLa>=100.778166 && currentLa<=100.9){
  //       near = "Zone B"
  //     }else if (currentLa<100.778166 && currentLa>=100.1){
  //       near = "Zone A"
  //     }else {
  //       near = "You are too far from KMITL"
  //     }
  //   }
  //   else if (currentLong <13.728611 && currentLong >=13.1){
  //     if (currentLa>=100.778166 && currentLa<=100.9){
  //       near = "Zone C"
  //     }else if (currentLa <100.778166 && currentLa>= 100.1){
  //       near = "Zone D"
  //     }else {
  //       near = "You are too far from KMITL"
  //     }
  //   }
  //   else {
  //     near = "You are too far from KMITL"
  //   }
  
  const zonerMaster = (zoneitem)=>{
     let reusers = [];
     setAllUsers(reusers);
     setSelectedValue(zoneitem);
     setZone(zoneitem);
    //  if(zoneitem=="a"){
    //    navigation.navigate("Task Feed Zone A");

    //  }
    //  else if(zoneitem=="b"){
    //    navigation.navigate("Task Feed Zone B");

    //  }
    //  else if(zoneitem=="c"){
    //    navigation.navigate("Task Feed Zone C");

    //  }
    //  else if(zoneitem=="d"){
    //    navigation.navigate("Task Feed Zone D");

    //  }
    //  else if(zoneitem=="z"){
    //    navigation.navigate("Task Feed");

    //  }
    //  navigation.navigate("Task Loader");
     firebase
        .database()
        .ref("tasks")
        .on("value", (dataSnapshot) => {
          let users = [];
          let currentUser = {
            id: "",
            startlocation: "",
            price: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.startlocation = child.val().startlocation;
              currentUser.price = child.val().price;
              // currentUser.startlocation = child.val().startlocation;
              // currentUser.price = child.val().price;
              // currentUser.endlocation = child.val().endlocation;
              // currentUser.zone = child.val().zone;
              // currentUser.startip = child.val().startip;
              // currentUser.desip = child.val().desip;
            } else {
              if (child.val().zone== zonesort
              || child.val().allzone == zonesort
              ){
              users.push({
                id: child.val().uuid,
                startlocation: child.val().startlocation,
                price: child.val().price,
                endlocation: child.val().endlocation,
                startip: child.val().startip,
                desip: child.val().desip,
              });
              
            }
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          
        
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          
        });
  }
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
    <SafeAreaView style={{ flex: 1, backgroundColor: color.WHITE }}>
      <RoundCornerButton title="Map Tour" 
       onPress={() => navigation.navigate("Map Tour")} />
       {/* <RoundCornerButton title="Identify My Zone" 
        onPress={getLocation}
       /> */}
       <RoundCornerButton title="Identify My Zone" 
         onPress={() => ZoneCal()}
       />
       {/* <Text
       style={color.BLACK}>Latitude: {currentLa}</Text>
       <Text
       style={color.BLACK}>Longitude: {currentLong}</Text> */}
       <Text
       style={color.BLACK}>Your Nearest Zone: {nearest}</Text>
       {/* <Button
        //onPress={() => }
        onPress={trygetLocation}
        title="Zone Identifier"
       /> */}
       

       {/* <Text
       style={color.BLACK}>Hello there</Text> */}
       
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => zonerMaster(itemValue)}
      >
        <Picker.Item label="All Zone" value="z" />
        <Picker.Item label="Zone A" value="a" />
        <Picker.Item label="Zone B" value="b" />
        <Picker.Item label="Zone C" value="c" />
        <Picker.Item label="Zone D" value="d" />
      </Picker>
      {/* All tasks */}
  {/* <Text>{zonesort}</Text> */}
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
            startlocation={item.startlocation}
            endlocation = {item.endlocation}
            price = {item.price}
            //checkip = {item.startip}
            onAcceptTap={() => acceptTap(item.id)}
            onStartloTap={() => startloTap(item.startip)}
            onEndloTap={() => endloTap(item.destip)}
            
            
          />
        )}
      />
      

    </SafeAreaView>
    
  );
        
  };
//}
