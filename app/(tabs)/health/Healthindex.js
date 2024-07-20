import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";

const Healthindex = () => {
  const [Pregnancies, setPregnancies] = useState("");
  const [Glucose, setGlucose] = useState("");
  const [BloodPressure, setBloodPressure] = useState("");
  const [SkinThickness, setSkinThickness] = useState("");
  const [Insulin, setInsulin] = useState("");
  const [BMI, setBMI] = useState("");
  const [DiabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState("");
  const [Age, setAge] = useState("");
  const [name, setName] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = () => {
    const diabetusData = {
      Pregnancies: Number(Pregnancies),
      Glucose: Number(Glucose),
      BloodPressure: Number(BloodPressure),
      SkinThickness: Number(SkinThickness),
      Insulin: Number(Insulin),
      BMI: Number(BMI),
      DiabetesPedigreeFunction: Number(DiabetesPedigreeFunction),
      Age: Number(Age),
    };

    console.log("Data being sent to server:", { name, diabetusData });

    axios
      .post("http://10.2.14.38:8001/predict", { name, diabetusData })
      .then((response) => {
        console.log("Response from server:", response.data);

        // Update the state with the prediction
        setPrediction(response.data.message);

        // Show alert based on prediction
        Alert.alert("Diabetes Prediction", response.data.message);

        // Clear input fields
        setName("");
        setPregnancies("");
        setGlucose("");
        setBloodPressure("");
        setSkinThickness("");
        setInsulin("");
        setBMI("");
        setDiabetesPedigreeFunction("");
        setAge("");

        // Navigate to the status page
        router.replace("/(tabs)/status");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
        Alert.alert(
          "Error",
          "Failed to make prediction. Please try again later."
        );
      });
  };
  return (
    <SafeAreaView style={{ marginTop: 30 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "black", fontWeight: "500", fontSize: 15 }}>
          Enter your patient details
        </Text>
      </View>
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <View style={{}}>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  fontSize: 17,
                  color: "black",
                  borderRadius: 5,
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter your name"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={Pregnancies}
                onChangeText={(text) => setPregnancies(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  fontSize: 17,
                  color: "black",
                  borderRadius: 5,
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter your number of pregnancies"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={Glucose}
                onChangeText={(text) => setGlucose(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  fontSize: 17,
                  color: "black",
                  borderRadius: 5,
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter glucose levels"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={BloodPressure}
                onChangeText={(text) => setBloodPressure(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  fontSize: 17,
                  borderRadius: 5,
                  color: "black",
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter blood pressure"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={SkinThickness}
                onChangeText={(text) => setSkinThickness(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  borderRadius: 5,
                  fontSize: 17,
                  color: "black",
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter skin thickness"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={Insulin}
                onChangeText={(text) => setInsulin(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  borderRadius: 5,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  fontSize: 17,
                  color: "black",
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter insulin levels"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={BMI}
                onChangeText={(text) => setBMI(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  borderRadius: 5,
                  fontSize: 17,
                  color: "black",
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter BMI"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={DiabetesPedigreeFunction}
                onChangeText={(text) => setDiabetesPedigreeFunction(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  width: 300,
                  borderRadius: 5,
                  fontSize: 17,
                  color: "black",
                  textAlign: "auto",
                  marginBottom: 10,
                }}
                placeholder="Enter diabetes pedigree function"
              />
            </View>
            <View style={{}}>
              <TextInput
                value={Age}
                onChangeText={(text) => setAge(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  backgroundColor: "#E0E0E0",
                  color: "black",
                  width: 300,
                  borderRadius: 5,
                  textAlign: "auto",
                  fontSize: 17,
                  marginBottom: 10,
                }}
                placeholder="Enter age"
              />
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
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Healthindex;
