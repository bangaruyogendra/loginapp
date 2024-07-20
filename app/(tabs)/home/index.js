import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";
const index = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    const data = {
      name: name,
      address: address,
    };
    console.log(data);
    axios
      .post("http://10.2.14.38:8001/home", data)
      .then((response) => {
        console.log("Response from server:", response.data);
        Alert.alert("Details added successfully", "patient details added");
        setName("");
        setAddress("");
        router.replace("(tabs)/health");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#0066b2" }}>
          Diabetes
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            enter your personal details
          </Text>
        </View>
        <ScrollView>
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
              <Ionicons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="black"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 17 : 17,
                }}
                placeholder="enter your name"
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
              <FontAwesome
                style={{ marginLeft: 8 }}
                name="address-card"
                size={24}
                color="black"
              />
              <ScrollView>
                <TextInput
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    height: 100,
                    fontSize: address ? 17 : 17,
                  }}
                  placeholder="enter your address"
                />
              </ScrollView>
            </View>

            <View style={{ marginTop: 60 }} />

            <Pressable
              onPress={handleSubmit}
              style={{
                width: 150,
                backgroundColor: "#6699CC",
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
