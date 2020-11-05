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
  RoleSelect,
  LocationF,
  TaskLoader,
  ZoneA,
  ZoneB,
  ZoneC,
  ZoneD,
  ZoneSelect,
  MapTour
} from "../container";
import { color } from "../utility";
import zoneselector from "../container/zoneselector";

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
          name="Map Tour"
          component={MapTour}
          options={{
            headerBackTitle: null,
          }}
        />
        <Stack.Screen
          name="Location Picker"
          component={AsCus}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Task Feed"
          component={AsRider}
          //options={{ headerShown: false }}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Task Feed Zone A"
          component={ZoneA}
          //options={{ headerShown: false }}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Task Feed Zone B"
          component={ZoneB}
          //options={{ headerShown: false }}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Task Feed Zone C"
          component={ZoneC}
          //options={{ headerShown: false }}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Task Feed Zone D"
          component={ZoneD}
          //options={{ headerShown: false }}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Lobby"
          component={Lobby}
          options={{ headerShown: false }}
          // options={{
          //   headerBackTitle: null,
          //    headerLeft: null,

          // }}
        />
        <Stack.Screen
          name="Select Your Zone"
          component={ZoneSelect}
         // options={{ headerShown: false }}
          options={{
            headerBackTitle: null,
             headerLeft: null,

          }}
        />
        <Stack.Screen
          name="Task Room"
          component={Taskroom}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Role Select"
          component={RoleSelect}
          options={{
            headerBackTitle: null,
             headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Yardfon"
          component={LocationF}
          options={{
            headerBackTitle: null,
          }}/>
          <Stack.Screen
          name="Task Loader"
          component={TaskLoader}
          options={{ headerShown: false }}
          // options={{
          //   headerBackTitle: null,
          //    headerLeft: null,

          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default NavContainer;
