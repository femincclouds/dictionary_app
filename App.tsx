import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import ThemeProvider from "./src/contexts/ThemeProvider";
import Dictionary from "./src/screens/Dictionary/Dictionary";
import Home from "./src/screens/Home/Home";
import Search from "./src/screens/Search/Search";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dictionary" component={Dictionary} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
