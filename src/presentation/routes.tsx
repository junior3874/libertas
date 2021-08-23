import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./pages/home";
import CreateHabit from "./pages/createHabit";
import Habit from "./pages/habit";

export type StackParamList = {
  Home: undefined;
  CreateHabit: undefined;
  Habit: { performedLastDate: Date };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateHabit" component={CreateHabit} />
        <Stack.Screen name="Habit" component={Habit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
