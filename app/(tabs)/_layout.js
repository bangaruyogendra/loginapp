import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarStyle: { color: "#7CB9E8" },
          tabBarLabel: "home",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#7CB9E8" />
            ) : (
              <Entypo name="home" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          tabBarStyle: { color: "#7CB9E8" },
          tabBarLabel: "health",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="heartbeat" size={24} color="#7CB9E8" />
            ) : (
              <FontAwesome name="heartbeat" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          tabBarStyle: { color: "#7CB9E8" },
          tabBarLabel: "status",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons
                name="health-and-safety"
                size={24}
                color="#7CB9E8"
              />
            ) : (
              <MaterialIcons name="health-and-safety" size={24} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
