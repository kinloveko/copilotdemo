import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ContactProvider } from "./ContactProvider";
import CreateContactScreen from "./components/CreateContactScreen";
import ContactListScreen from "./components/ContactListScreen";
import UpdateContactScreen from "./components/UpdateContactScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <ContactProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Lists" component={ContactListScreen} />
          <Tab.Screen name="Create" component={CreateContactScreen} />
          <Tab.Screen
            name="Update"
            component={UpdateContactScreen}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
