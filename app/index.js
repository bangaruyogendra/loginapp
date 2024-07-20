import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./MyDrawer";
const index = () => {
  return (
    <View>
      <Redirect href={"/(authenticate)/login"} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
