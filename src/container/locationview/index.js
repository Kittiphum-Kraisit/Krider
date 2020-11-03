import React, {Component,useContext, useEffect, useState, useLayoutEffect} from 'react';
import { SafeAreaView, Alert, Text, View, FlatList ,Picker,TextInput,Linking} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { ShowTasks,ShowLocas } from "../../component";
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
import { InputField, RoundCornerButton, Logo } from "../../component";

//let Arrayhelper = require('../utility/locationlist/localist.json');
// export default ({ navigation }) => {
//   const globalState = useContext(Store);
//   const { dispatchLoaderAction } = globalState;
// const [getScrollPosition, setScrollPosition] = useState(0);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <SimpleLineIcons
//           name="logout"
//           size={26}
//           color={color.WHITE}
//           style={{ right: 10 }}
//           onPress={() =>
//             Alert.alert(
//               "Accident Prevention",
//               "Do you want to log out",
//               [
//                 {
//                   text: "Sure",
//                   onPress: () => logout(),
//                 },
//                 {
//                   text: "Cancel",
//                 },
//               ],
//               { cancelable: false }
//             )
//           }
//         />
        
//       ),
//     });
//   }, [navigation]);



  

//     const getOpacity = () => {
//     if (deviceHeight < smallDeviceHeight) {
//       return deviceHeight / 4;
//     } else {
//       return deviceHeight / 6;
//     }
//   };
//   const logout = () => {
//     LogOutUser()
//       .then(() => {
//         clearAsyncStorage()
//           .then(() => {
//             navigation.replace("Login");
//           })
//           .catch((err) => console.log(err));
//       })
//       .catch((err) => alert(err));
//   };

    //render(){
//   return(
//     <SafeAreaView style={{ flex: 1, backgroundColor: color.WHITE }}>
//       {/* <RoundCornerButton title="Zone Select" 
//        onPress={() => navigation.navigate("Select Your Zone")} /> */}
//       <Picker
//         selectedValue={selectedValue}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue, itemIndex) => zonerMaster(itemValue)}
//       >
//         <Picker.Item label="All Zone" value="z" />
//         <Picker.Item label="Zone A" value="a" />
//         <Picker.Item label="Zone B" value="b" />
//         <Picker.Item label="Zone C" value="c" />
//         <Picker.Item label="Zone D" value="d" />
//       </Picker>
//       {/* All tasks */}
//   {/* <Text>{zonesort}</Text> */}
//       <FlatList
//         alwaysBounceVertical={false}
//         data={allUsers}
//         keyExtractor={(_, index) => index.toString()}
//         onScroll={(event) =>
//           setScrollPosition(event.nativeEvent.contentOffset.y)
//         }
//         ListHeaderComponent={
//           <View
//             style={{
//               opacity:
//                 getScrollPosition < getOpacity()
//                   ? (getOpacity() - getScrollPosition) / 100
//                   : 0,
//             }}
//           >
            
//           </View>
//         }
//         renderItem={({ item }) => (
//           <ShowTasks
//             location={item.location}
//             price = {item.price}
//             onAcceptTap={() => acceptTap(item.id)}
            
//           />
//         )}
//       />
      

//     </SafeAreaView>
    
//   );
        
//   };
//}
// constructor(props) {
//     super(props);
//     this.state = {
//       allUsers: Arrayhelper,
//       usersFiltered: Arrayhelper,
//     };
//   }
//   componentDidMount() {}
//   searchUser = text => {
//     this.setState({
//       usersFiltered: this.state.allUsers.filter(i =>
//         i.name.toLowerCase().includes(text.toLowerCase()),
//       ),
//     });
//   };
//   render() {
//     return (
//       <Container>
//         <Header searchBar rounded>
//           <Item>
//             <Icon name="ios-search" />
//             <Input
//               placeholder="Search"
//               onChangeText={text => this.searchUser(text)}
//             />
//           </Item>
//         </Header>
//         <Content>
//           {this.state.usersFiltered.map(item => (
//             <ListItem avatar>
//               <Left>
//                 <Thumbnail source={{uri: item.image}} />
//               </Left>
//               <Body>
//                 <Text>{item.name}</Text>
//                 <Text note>{item.address}</Text>
//               </Body>
//             </ListItem>
//           ))}
//         </Content>
//       </Container>
//     );
//   }
// };
let helperArray = require('./localist.json');
export default ({ navigation }) => {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allUsers: helperArray,
//       usersFiltered: helperArray,
//     };
//   }
const directTap = ( locaip) => {
  Linking.openURL(locaip);
  };
 const [allloca, setAllLoca] = useState([]);

useEffect(() => {
    // dispatchLoaderAction({
    //   type: LOADING_START,
    // });
    try {
      let lolist = []

           lolist.push({
                id: helperArray.id,
                locaname: helperArray.locaname,
                ip: helperArray.ip,
                zone: helperArray.zone,
              });
        //setAllLoca(lolist)
        setAllLoca(helperArray)
    } catch (error) {
      alert(error);
      // dispatchLoaderAction({
      //   type: LOADING_STOP,
      // });
    }
  }, []);
      const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };
  //   const globalState = useContext(Store);
  // const { dispatchLoaderAction } = globalState;
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
//   componentDidMount() {}
//   searchUser = text => {
//     this.setState({
//       usersFiltered: this.state.allUsers.filter(i =>
//         i.name.toLowerCase().includes(text.toLowerCase()),
//       ),
//     });
//   };
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: color.WHITE }}>
      {/* <RoundCornerButton title="Zone Select" 
       onPress={() => navigation.navigate("Select Your Zone")} /> */}
      {/* <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => zonerMaster(itemValue)}
      >
        <Picker.Item label="All Zone" value="z" />
        <Picker.Item label="Zone A" value="a" />
        <Picker.Item label="Zone B" value="b" />
        <Picker.Item label="Zone C" value="c" />
        <Picker.Item label="Zone D" value="d" />
      </Picker> */}
      {/* All tasks */}
  {/* <Text>{zonesort}</Text> */}
      <FlatList
        alwaysBounceVertical={false}
        data={allloca}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(event) =>
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }
        // ListHeaderComponent={
        //   <View
        //     style={{
        //       opacity:
        //         getScrollPosition < getOpacity()
        //           ? (getOpacity() - getScrollPosition) / 100
        //           : 0,
        //     }}
        //   >
            
        //   </View>
        // }
        renderItem={({ item }) => (
          <ShowLocas
          id={item.id}
            locaname={item.locaname}
            ip={item.ip}
            zone = {item.zone}
            onDirectTap={() => directTap(item.ip)}
            
          />
        )}
      />
      

    </SafeAreaView>
    
  );
        
  };
