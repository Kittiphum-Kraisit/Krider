import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, Alert, Text, View, FlatList,Image,Linking } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ImagePicker from "react-native-image-picker";
import { Profile, ShowUsers, StickyHeader } from "../../component";
import firebase from "../../firebase/config";
import { color } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { UpdateUser, LogOutUser,AddTask } from "../../network";
import { InputField, RoundCornerButton, Logo } from "../../component";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const { profileImg, name } = userDetail;
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
                  text:"Cancel",
                  
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
        //   color={color.Orange}
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
          setAllUsers(users);
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

  const selectPhotoTapped = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // Base 64 image:
        let source = "data:image/jpeg;base64," + response.data;
        dispatchLoaderAction({
          type: LOADING_START,
        });
        UpdateUser(uuid, source)
          .then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          })
          .catch(() => {
            alert(err);
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          });
      }
    });
  };
  // * LOG OUT
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

  // * ON IMAGE TAP
  const imgTap = (profileImg, name) => {
    if (!profileImg) {
      navigation.navigate("ShowFullImg", {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate("ShowFullImg", { name, img: profileImg });
    }
  };

  // * ON NAME TAP
  const nameTap = (profileImg, name, guestUserId) => {
    if (!profileImg) {
      navigation.navigate("Chat", {
        name,
        imgText: name.charAt(0),
        guestUserId,
        currentUserId: uuid,
      });
    } else {
      navigation.navigate("Chat", {
        name,
        img: profileImg,
        guestUserId,
        currentUserId: uuid,
      });
    }
  };
  // * GET OPACITY

  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.CREAM }}>
      {/* {getScrollPosition > getOpacity() && (
        <StickyHeader
          name={name}
        //   img={profileImg}
        //   onImgTap={() => imgTap(profileImg, name)}
        />
      )} */}
      <Text> </Text>
      <Text> </Text>
      <Text
      style={{textAlign: "center",color : color.Orange,fontSize: 25,fontWeight: 'bold'}}
      >Welcome Back {name} ! </Text>
      <Text
      style={{textAlign: "center",color : color.WHITE,fontSize: 25,fontWeight: 'bold'}}
      > Select your role to continue </Text>
      <Text> </Text>
      <RoundCornerButton title="Enter As Driver" 
       onPress={() => navigation.navigate("Task Feed")} />
       <RoundCornerButton title="Enter As Customer" 
       onPress={() => navigation.navigate("Location Picker")} />
      {/* ALL USERS */}
      {/* <FlatList
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
            <Profile
              img={profileImg}
              onImgTap={() => imgTap(profileImg, name)}
              onEditImgTap={() => selectPhotoTapped()}
              name={name}
            />
          </View>
        }
        renderItem={({ item }) => (
          <ShowUsers
            name={item.name}
            img={item.profileImg}
            onImgTap={() => imgTap(item.profileImg, item.name)}
            onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
          />
        )}
      /> */}
    </SafeAreaView>
  );
};
