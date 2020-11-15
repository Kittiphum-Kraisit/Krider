import React, { useState, useContext } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
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
import { SignUpRequest, AddUser,AddNewUser } from "../../network";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [logo, toggleLogo] = useState(true);
  const { email, password, confirmPassword, name,phone } = credential;

  const setInitialState = () => {
    setCredential({ email: "", password: "", confirmPassword: "",phone:"" });
  };

  //   * ON SIGN UP PRESS
  const onSignUpPress = () => {
    Keyboard.dismiss();
    if (!name) {
      alert("Please fill your name");
    } else if (!email) {
      alert("Please fill your email");
    } else if (!password) {
      alert("Password is needed");
    } else if (password !== confirmPassword) {
      alert("Password is not match");
    } else if (!phone) {
      alert("Please enter your phone number correctly");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          let uid = firebase.auth().currentUser.uid;
          let profileImg = "";
          //AddUser(name, email, uid, profileImg)
          AddNewUser(name,email,uid,profileImg,phone)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              navigation.replace("Role Select");
            })
            .catch((err) => {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(err);
            });
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };
  // * HANDLE ON CHANGE
  const handleOnChange = (name, value) => {
    setCredential({
      ...credential,
      [name]: value,
    });
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
        <SafeAreaView style={{ flex: 1, backgroundColor: color.WHITE }}>
          {logo && (
            <View style={[globalStyle.containerCentered]}>
              <Logo />
            </View>
          )}

          <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
            <InputField
              placeholder="Enter your  name"
              value={name}
              onChangeText={(text) => handleOnChange("name", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => handleOnChange("email", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={(text) => handleOnChange("phone", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Create a password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => handleOnChange("password", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Repeat password again"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handleOnChange("confirmPassword", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <RoundCornerButton
              title="Create an account"
              onPress={() => onSignUpPress()}
            />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: color.Orange,
              }}
              onPress={() => {
                setInitialState();
                navigation.navigate("Login");
              }}
            >
              I have an account
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
