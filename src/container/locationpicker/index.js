import React, { useContext, useEffect, useState, useLayoutEffect, Component, Fragment } from "react";
import { SafeAreaView, Alert, Text, View, FlatList ,Picker } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ImagePicker from "react-native-image-picker";
import { Profile, ShowUsers, StickyHeader } from "../../component";
import firebase from "../../firebase/config";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser , AddTask, AddActive } from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";
import { setAsyncStorage, keys } from "../../asyncStorage";
import { globalStyle, color } from "../../utility";
import SearchableDropdown from 'react-native-searchable-dropdown';





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
  

  var items = [
  {
    id: 1,
    name: 'HM Building',
  },
  {
    id: 2,
    name: 'E12 Building',
  },
  {
    id: 3,
    name: 'Airport raillink',
  },
  {
    id: 4,
    name: 'a',
  },
  {
    id: 5,
    name: 'RNP Alley',
  },
  {
    id: 6,
    name: 'AJ Park',
  },
  {
    id: 7,
    name: 'b',
  },
  {
    id: 8,
    name: 'c',
  },
];
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedItems: [
//         {
//           id: 5,
//           name: 'RNP Alley',
//         },
//         {
//           id: 6,
//           name: 'AJ Park',
//         }
//       ]
//     }
//   }
// }

  const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });
  // const onGoPress = ()=> {
  //   setAsyncStorage(keys.uuid, res.user.uid);
  //         setUniqueValue(res.user.uid);
  //         dispatchLoaderAction({
  //           type: LOADING_STOP,
  //         });
  //         setInitialState(); goBack
  //         navigation.navigate("Dashboard");
  // }
  
  //<RoundCornerButton title="Enter" onPress={() => onGoPress()} />

  //const [getScrollPosition, setScrollPosition] = useState(0);
  //const [allUsers, setAllUsers] = useState([]);
  const { profileImg, name } = userDetail; //df
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
  },
   [navigation]
   );
  

  // const handleOnChange = (name, value) => {
  //   setCredential({
  //     ...credential,
  //     [name]: value,
  //   });
  // };
  //   // * ON INPUT FOCUS

  // const handleFocus = () => {
  //   setTimeout(() => {
  //     toggleLogo(false);
  //   }, 200);
  // };
  // // * ON INPUT BLUR

  // const handleBlur = () => {
  //   setTimeout(() => {
  //     toggleLogo(true);
  //   }, 200);
  // };

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
              //const items = this.state.selectedItems;
              //items.push(item)
              //this.setState({ selectedItems: items });
            }}
            containerStyle={{ padding: 5 }}
            // onRemoveItem={(item, index) => {
            //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //   this.setState({ selectedItems: items });
            //}}
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
                //onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </Fragment>
      {/* <InputField
              placeholder="If you can't find location above"
              value={email}
              onChangeText={(text) => handleOnChange("email", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            /> */}
      <Text>ENDPOINT</Text>
      <Fragment>
          
          {/* Single */}
          <SearchableDropdown
            onItemSelect={(item) => {
              //const items = this.state.selectedItems;
              //items.push(item)
              //this.setState({ selectedItems: items });
            }}
            containerStyle={{ padding: 5 }}
            // onRemoveItem={(item, index) => {
            //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //   this.setState({ selectedItems: items });
            //}}
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
                //onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </Fragment>
       {/* <RoundCornerButton title="Find Driver" 
       onPress={() => DataPusher(location,price,uuid)} /> */}
       <RoundCornerButton title="Enter Lobby" 
       onPress={() =>  navigation.navigate("Lobby")} />
       <RoundCornerButton title="Find Driver" 
       onPress={() =>  DataPusher2(location,destination,price,uuid,dummyzone,startip,destip)} />
       {/* <RoundCornerButton title="Dashboard" 
       onPress={() =>  navigation.navigate("Dashboard")} /> */}
       
    </View>
   
  );
  
    
  };
  