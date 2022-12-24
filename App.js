import React, { useEffect } from "react"
import { Provider } from "react-native-paper"

import { DrawerActions, NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerContent } from "./source/DrawerContent"
import { Ionicons } from "@expo/vector-icons"

import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./config"

import Auth from "./source/Auth"
import SignIn from "./source/SignIn"
import SignUp from "./source/SignUp"
import Map from "./source/Map"
import Football from "./source/Football"
import Booking from "./source/Booking"
import Hesabım from "./source/Hesabım"
import Mesajlarım from "./source/Mesajlarım"
import İlanlarım from "./source/İlanlarım"

initializeApp(firebaseConfig)

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Tabs = () => {

  return (
    <Tab.Navigator
      initialRouteName={"Map"}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Football") {
            return (
              <Ionicons
                name={"football-outline"}
                color={color}
                size={35}
              />
            )
          }
          else if (route.name === "Menu") {
            return (
              <Ionicons
                name={"reorder-three-outline"}
                color={color}
                size={35}
              />
            )
          } else if (route.name === "Map") {
            return (
              <Ionicons
                name={"navigate-outline"}
                color={color}
                size={30}
              />
            )
          }
        },
      })}
    >
      <Tab.Screen name={"Map"} component={Map} />
      <Tab.Screen name={"Football"} component={Football} />
      <Tab.Screen name={"Menu"} component={App}
        listeners={({ navigation }) => ({
          tabPress: e => {
            navigation.dispatch(DrawerActions.openDrawer())
            e.preventDefault()
          }
        })} />
    </Tab.Navigator>
  )
}

const AuthScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={App} />
        
      </Stack.Navigator>
    </NavigationContainer>)
}
const App = () => {
  return (
    <Provider>
      <NavigationContainer independent={true}>
        <Drawer.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, gestureDirection: 'horizontal' }} initialRouteName="Football" drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Main" component={App} />
          <Drawer.Screen name="Hesabım" options={{ headerShown: true }} component={Hesabım} />
          <Drawer.Screen name="Mesajlarım" options={{ headerShown: true }} component={Mesajlarım} />
          <Drawer.Screen name="İlanlarım" options={{ headerShown: true }} component={İlanlarım} />
          <Stack.Screen name="Booking" component={App} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default AuthScreen;
