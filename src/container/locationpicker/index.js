import React, { useContext, useEffect, useState, useLayoutEffect, Component, Fragment } from "react";
import { SafeAreaView, Alert, Text, View, FlatList ,Picker ,Image,Linking,StyleSheet,BackHandler} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../../firebase/config";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight, setZone } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { UpdateUser, LogOutUser , AddTask, AddActive,UserFree ,UserAsCus} from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";
import { globalStyle, color } from "../../utility";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { TouchableOpacity } from "react-native-gesture-handler";
import locations from './location';
import Prices from './price';
import Prices2 from './pricecal';




export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  let items = require('./localist.json');
  const [firstL,setFirstL] = useState("Faculty of Medicine");
  const [lastL,setLastL] = useState("Faculty of Medicine");
  const [firstIP,setFirstIP] = useState("https://goo.gl/maps/9NrZQhdYj7j1CMYXA");
  const [lastIP,setLastIP] = useState("https://goo.gl/maps/9NrZQhdYj7j1CMYXA");
  const [startZone,setStartZone] = useState('A');
  const[endZone,setEndZone]=useState('A');
  const [cost,setCost] = useState(0);
  const [myitem,setMyitem] = useState({
    name: "",
    zone: "",
    ip: "",
    //phone: "",
  });
  const [myitem2,setMyitem2] = useState("");

 


  


  
  



  const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
    phone:"",
  });
  var places = {}
  var Place=()=>{
      alert(myitem);
    }
 
  const  onChangeHandler =  (place, value) => {
    //setCost(Prices2(startZone,endZone))
    // setggg(ggg+1);
    // zch += 1;
    places[place] = value
    if (place == "place1"){
      setFirstL(value.name)
      setStartZone(value.zone)
      setFirstIP(value.ip)
      setCost(Prices2(startZone,endZone))



    } else if (place == "place2"){
      setLastL(value.name)
      setEndZone(value.zone)
      setLastIP(value.ip)
      setCost(Prices2(startZone,endZone))

     
    }
  }

  const { profileImg, name,phone } = userDetail; //df
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
                  onPress: () => Linking.openURL('mailto:konfiree@gmail.com?subject=K-RIDER Support&body=Describe Your Problems Here'),
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
                  source={require("./optionsmaster.png")}
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
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => true)
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', () => true)
  // }, [])
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])
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
            phone: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
              currentUser.phone = child.val().phone;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
                phone: child.val().phone,
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
  },[]

   );
   useEffect (() => {
    setCost(Prices2(startZone,endZone));
   });
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
  const onCall = (phonenumb) => {
  //Linking.openURL(`tel:${phoneNumber}`)
  Linking.openURL(`tel:${phonenumb}`)
  };
 

    const DataPusher2 = (location,destinationq,price,uuid,dummyzoneq,startipq,destipq) => {
     AddTask(location,destinationq,price,uuid,name,dummyzoneq,startipq,destipq);
     AddActive(location,destinationq,price,uuid,name,startipq,destipq,phone);
     UserAsCus(uuid)
     navigation.navigate("Lobby");
      
  };
  // const SelPick = () => {
  // const [selectedValue, setSelectedValue] = useState("java");
  // };

  return(
    <View style={[globalStyle.containerCentered]} >
      <Text>Where are you now ? </Text>
      
      {/* <Text>{fp}</Text> */}
      <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            onItemSelect={(item => onChangeHandler("place1", item))}
            // onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
            onValueChange={(itemValue,itemIndex) => setMyitem2(itemValue)}
            containerStyle={{padding: 5}}
            // Suggestion container style
            textInputStyle={{
              // Inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
              // Single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              // Text style of a single dropdown item
              color: '#222',
            }}
            itemsContainerStyle={{
              // Items container style you can pass maxHeight
              // To restrict the items dropdown hieght
              maxHeight: '60%',
            }}
            items={locations}
            // Mapping of item array
            defaultIndex={2}
            // Default selected item index
            placeholder="location"
            // place holder for the search input
            resPtValue={false}
            // Reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            // To remove the underline from the android input
          />
          <Text style={styles.headingText}>
            Where do you want to go?
          </Text>
          <SearchableDropdown
              onItemSelect={(value => onChangeHandler("place2", value))}
              // Called after the selection from the dropdown
              onTextChange={(text) => console.log(text)}
              onValueChange={(itemValue,itemIndex) => setMyitem2(itemValue)}
              containerStyle={{padding: 5}}
              // Suggestion container style

              textInputStyle={{
                // Inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
              }}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                // Text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '50%',
              }}
              items={locations}
              // Mapping of item array
              defaultIndex={2}
              // Default selected item index
              placeholder="location"
              // Place holder for the search input
              resetValue={false}
              // Reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              // To remove the underline from the android input
          />
          <Text style={styles.titleTextL}>
            Price : {cost} baht
          </Text>
      
       {/* <RoundCornerButton title="Enter Lobby" 
       onPress={() =>  navigation.navigate("Lobby")} /> */}
       {/* <RoundCornerButton title="Enter Yardfon" 
       onPress={() =>  navigation.navigate("Yardfon")} /> */}
       {/* <RoundCornerButton title="Enter Yardfon" 
       onPress={() =>  pushfp()} /> */}
       <RoundCornerButton title="Find Driver" 
       onPress={() =>  DataPusher2(firstL,lastL,cost,uuid,startZone,firstIP,lastIP)} />
       {/* <RoundCornerButton title="Call me" 
       onPress={() =>  onCall("0944647711")} /> */}
       {/* <RoundCornerButton title="Dashboard" 
       onPress={() =>  navigation.navigate("Dashboard")} /> */}
       
    </View>
   
  );
  
    
  };
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextL: {
    padding: 8,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});



  // <Fragment>
          
  //         {/* Single */}
  //         <SearchableDropdown
  //           onItemSelect={(item) => {
  //           }}
  //           containerStyle={{ padding: 5 }}
  //           itemStyle={{
  //             padding: 10,
  //             marginTop: 2,
  //             backgroundColor: '#ddd',
  //             borderColor: '#bbb' ,
  //             borderWidth: 1,
  //             borderRadius: 5,
  //           }}
  //           itemTextStyle={{ color: '#222' }}
  //           itemsContainerStyle={{ maxHeight: 140 }}
  //           items={items}
  //           defaultIndex={2}
  //           resetValue={false}
  //           textInputProps={
  //             {
  //               placeholder: "Select your startpoint here",
  //               underlineColorAndroid: "transparent",
  //               style: {
  //                   padding: 12,
  //                   borderWidth: 1,
  //                   borderColor: '#ccc',
  //                   borderRadius: 5,
  //               },
  //             }
  //           }
  //           listProps={
  //             {
  //               nestedScrollEnabled: true,
  //             }
  //           }
  //       />
  //     </Fragment>
  //     <Text>ENDPOINT</Text>
  //     <Fragment>
          
  //         {/* Single */}
  //         <SearchableDropdown
  //           onItemSelect={(item) => {
  //           }}
  //           containerStyle={{ padding: 5 }}
            
  //           itemStyle={{
  //             padding: 10,
  //             marginTop: 2,
  //             backgroundColor: '#ddd',
  //             borderColor: '#bbb' ,
  //             borderWidth: 1,
  //             borderRadius: 5,
  //           }}
  //           itemTextStyle={{ color: '#222' }}
  //           itemsContainerStyle={{ maxHeight: 140 }}
  //           items={items}
  //           defaultIndex={2}
  //           resetValue={false}
  //           textInputProps={
  //             {
  //               placeholder: "Select your endpoint here",
  //               underlineColorAndroid: "transparent",
  //               style: {
  //                   padding: 12,
  //                   borderWidth: 1,
  //                   borderColor: '#ccc',
  //                   borderRadius: 5,
  //               },
  //             }
  //           }
  //           listProps={
  //             {
  //               nestedScrollEnabled: true,
  //             }
  //           }
  //       />
  //     </Fragment>
  