import React, { useContext, useEffect, useState, useLayoutEffect, Component, Fragment } from "react";
import { SafeAreaView, Alert, Text, View, FlatList ,Picker ,Image} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../../firebase/config";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { UpdateUser, LogOutUser , AddTask, AddActive } from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";
import { globalStyle, color } from "../../utility";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { TouchableOpacity } from "react-native-gesture-handler";




export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  //const [selectedValue, setSelectedValue] = useState("java");
  var location = "E12 Building";
  //var location2 = "World"
  var price = 40;
  var destip = "https://goo.gl/maps/Jvk9PG1CUehnUAo89";
  var destination = "Bunnag Building";
  var startip = "https://goo.gl/maps/A8mT6vJGL19ZDcgv8";
  var dummyzone = "d";
  let items = require('./localist.json');
  
  

//   var items = [
//   {
//     id: 1,
//     name: 'HM Building',
//   },
//   {
//     id: 2,
//     name: 'E12 Building',
//   },
//   {
//     id: 3,
//     name: 'Airport raillink',
//   },
//   {
//     id: 4,
//     name: 'a',
//   },
//   {
//     id: 5,
//     name: 'RNP Alley',
//   },
//   {
//     id: 6,
//     name: 'AJ Park',
//   },
//   {
//     id: 7,
//     name: 'b',
//   },
//   {
//     id: 8,
//     name: 'c',
//   },
// ];

  const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });

  const { profileImg, name } = userDetail; //df
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity style={{ right: 10 }} onPress={() =>
            Alert.alert(
              "Options",
              "What do you want to do ?",
              [
                {
                  text: "Log out",
                  onPress: () => Alert.alert(
              "Log Out",
              "Do you want to log out ?",
              [
                {
                  text: "Sure",
                  onPress: () => logout(),
                },
                {
                  text: "No",
                },
              ],
              { cancelable: false }
            ),
                },
                {
                  text:"Change Role",
                  onPress:()=>navigation.navigate("Role Select"),
                },
                {
                  text: "Support",
                  onPress: () => Alert.alert(
              "Support",
              "What do you want us to help you with ?",
              [
                {
                  text: "Contact Us",
                  onPress: () => logout(),
                },
                {
                  text: "Cancel",
                },
                {
                  text: "Map Tour",
                  onPress:()=>navigation.navigate("Map Tour"),
                }
              ],
              { cancelable: false }
            ),
                },
                
                

              ],
              { cancelable: false }
            )
          }>
                  <Image 
                  source={require("./logkout4.png")}
                />
                </TouchableOpacity>
                {/* <SimpleLineIcons
          name="logout"
          size={26}
          color={color.WHITE}
          style={{ right: 30 }}
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
        /> */}
        {/* <SimpleLineIcons
          name="logout"
          size={26}
          color={color.Orange}
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
        /> */}
        </View>
        // <SimpleLineIcons
        //   name="logout"
        //   size={26}
        //   color={color.WHITE}
        //   style={{ right: 10 }}
        //   onPress={() =>
        //     Alert.alert(
        //       "Accident Prevention",
        //       "Do you want to log out",
        //       [
        //         {
        //           text: "Sure",
        //           onPress: () => logout(),
        //         },
        //         {
        //           text: "Cancel",
        //         },
        //       ],
        //       { cancelable: false }
        //     )
        //   }
        // />
        
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
        .ref("users")
        .on("value", (dataSnapshot) => {
          let users = [];
          let currentUser = {
            id: "",
            name: "",
            profileImg: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          setUserDetail(currentUser);
          //setAllUsers(users);
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
  const DataPusher = (location,price,uuid) => {
     AddTask(location,price,uuid,name);
     AddActive(location,price,uuid,name);
      
  };
    const DataPusher2 = (location,destinationq,price,uuid,dummyzoneq,startipq,destipq) => {
     AddTask(location,destinationq,price,uuid,name,dummyzoneq,startipq,destipq);
     AddActive(location,destinationq,price,uuid,name,startipq,destipq);
     navigation.navigate("Lobby");
      
  };
  // const SelPick = () => {
  // const [selectedValue, setSelectedValue] = useState("java");
  // };
  
  return(
    <View style={[globalStyle.containerCentered]} >
      <Text>STARTPOINT</Text>
      <Fragment>
          
          {/* Single */}
          <SearchableDropdown
            onItemSelect={(item) => {
            }}
            containerStyle={{ padding: 5 }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb' ,
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={items}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select your startpoint here",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </Fragment>
      <Text>ENDPOINT</Text>
      <Fragment>
          
          {/* Single */}
          <SearchableDropdown
            onItemSelect={(item) => {
            }}
            containerStyle={{ padding: 5 }}
            
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb' ,
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={items}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select your endpoint here",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </Fragment>
       <RoundCornerButton title="Enter Lobby" 
       onPress={() =>  navigation.navigate("Lobby")} />
       <RoundCornerButton title="Enter Yardfon" 
       onPress={() =>  navigation.navigate("Yardfon")} />
       <RoundCornerButton title="Find Driver" 
       onPress={() =>  DataPusher2(location,destination,price,uuid,dummyzone,startip,destip)} />
       {/* <RoundCornerButton title="Dashboard" 
       onPress={() =>  navigation.navigate("Dashboard")} /> */}
       
    </View>
   
  );
  
    
  };
  