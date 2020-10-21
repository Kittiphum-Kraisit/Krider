import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  SignUp,
  Dashboard,
  Splash,
  ShowFullImg,
  Chat,
  AsCus,
  AsRider,
  Lobby,
  Taskroom,
} from "../container";
import { color } from "../utility";

const Stack = createStackNavigator();

function NavContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: color.DARK_GRAY },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTintColor: color.WHITE,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="ShowFullImg"
          component={ShowFullImg}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="Location Picker"
          component={AsCus}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="Task Feed"
          component={AsRider}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="Lobby"
          component={Lobby}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="Task Room"
          component={Taskroom}
          options={{
            headerBackTitle: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default NavContainer;
