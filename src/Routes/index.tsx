import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Splash from "../Pages/Splash";
import Checkout from "../Pages/Checkout";
import StartReview from "../Pages/StartReview";
import Tomorrow from "../Pages/Tomorrow";
import Wardrobe from "../Pages/Wardrobe";
import Dirt from "../Pages/Dirt";
import Others from "../Pages/Others";
import QRCode from "../Pages/QRCode";

const Stack = createNativeStackNavigator();

export const Routes: React.FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Tomorrow" component={Tomorrow} />
      <Stack.Screen name="StartReview" component={StartReview} />
      <Stack.Screen name="Wardrobe" component={Wardrobe} />
      <Stack.Screen name="Dirt" component={Dirt} />
      <Stack.Screen name="Others" component={Others} />
      <Stack.Screen name="QRCode" component={QRCode} />
    </Stack.Navigator>
  );
};
