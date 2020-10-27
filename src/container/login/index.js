import React, { useContext, useState   } from "react";
import {
  Text,
  Image,
  SafeAreaView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
("react-native-keyboard-aware-scroll-view");
import firebase from "../../firebase/config";
import { InputField, RoundCornerButton, Logo } from "../../component";
import { globalStyle, color } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/type";
import { setAsyncStorage, keys } from "../../asyncStorage";
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from "../../utility/constants";
import { LoginRequest } from "../../network";
import SearchableDropdown from 'react-native-searchable-dropdown';

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [logo, toggleLogo] = useState(true);
  const { email, password } = credential;
  
  



  const setInitialState = () => {
    setCredential({ email: "", password: "" });
  };
  // * HANDLE ON CHANGE
  const handleOnChange = (name, value) => {
    setCredential({
      ...credential,
      [name]: value,
    });
  };

  //   * ON LOGIN AS CUSTOMER PRESS
  const onLoginCPress = () => {
    Keyboard.dismiss();
    if (!email) {
      alert("Please enter your email");
    } else if (!password) {
      alert("Please enter your password");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          setInitialState();
          navigation.navigate("Location Picker");
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };
  //   * ON LOGIN AS CUSTOMER PRESS
  const onLoginRPress = () => {
    Keyboard.dismiss();
    if (!email) {
      alert("Please enter your email");
    } else if (!password) {
      alert("Please enter your password");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          Gname = 
          setInitialState();
          navigation.navigate("Task Feed");
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };
  // * ON INPUT FOCUS

  const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };
  // * ON INPUT BLUR

  const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(true);
    }, 200);
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={[globalStyle.flex1, { backgroundColor: color.WHITE }]}
        >
          {logo && (
            <View style={[globalStyle.containerCentered]}>
              {/* <Logo /> */}
              <Image style={globalStyle.tinyLogo}
    source={require('./kogo.png')}
  />
            </View>
          )}
          <View>
    
  </View>
          <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={(text) => handleOnChange("email", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => handleOnChange("password", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <RoundCornerButton title="Enter as Driver" onPress={() => onLoginRPress()} />
            <RoundCornerButton title="Enter as Customer" onPress={() => onLoginCPress()} />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: color.Orange,
              }}
              onPress={() => {
                setInitialState();
                navigation.navigate("SignUp");
              }}
            >
              Register
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
