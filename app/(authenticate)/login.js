import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { router } from "expo-router";
import axios from "axios";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://10.2.14.38:8001/login", user)
      .then((res) => {
        console.log(res.data.token);
        router.replace("/(tabs)/home");
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
        console.log("Error:", errorMessage);
        alert(errorMessage); // Display error to the user
      });
  };

  const handlelogin = () => {
    router.replace("/(authenticate)/register");
  };
  return (
    <SafeAreaView style={{ marginTop: 80 }}>
      <View
        style={{
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 30 }}>Diabetus</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            login to your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="enter your email"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 17 : 17,
              }}
              placeholder="enter your password"
            />
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>keep me logged in!</Text>
            <Text style={{ fontWeight: "500", color: "#007FFF" }}>
              Forget password
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Pressable
              onPress={handleSubmit}
              style={{
                backgroundColor: "#6699CC",
                alignItems: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 10,
                paddingBottom: 10,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Signin
              </Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 30 }}>
            <Pressable
              onPress={handlelogin}
              style={{
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "black" }}>
                Dont have account? Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
