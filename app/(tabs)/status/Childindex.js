import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const Childindex = () => {
  const [name, setName] = useState("");
  const [diabetusData, setDiabetusData] = useState(null);

  const handleFetchData = () => {
    axios
      .post("http://10.2.14.38:8001/getDiabetusData", { name })
      .then((response) => {
        console.log("Response from server:", response.data);
        setDiabetusData(response.data);

        if (!response.data) {
          Alert.alert(
            "No data found",
            "No diabetus details found for the entered name"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred while fetching data");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          placeholder="Enter person name"
        />
        <Pressable onPress={handleFetchData} style={styles.button}>
          <Text style={styles.buttonText}>Fetch Data</Text>
        </Pressable>
      </View>
      {diabetusData && (
        <View style={styles.dataContainer}>
          <View style={styles.row}>
            <Text style={styles.dataText}>Pregnancies:</Text>
            <Text style={styles.dataValue}>
              {diabetusData.Pregnancies}
              <Text>(no of times)</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dataText}>Glucose:</Text>
            <Text style={styles.dataValue}>{diabetusData.Glucose}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dataText}>Blood Pressure:</Text>
            <Text style={styles.dataValue}>
              {diabetusData.BloodPressure}
              <Text>(mm Hg)</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dataText}>Skin Thickness:</Text>
            <Text style={styles.dataValue}>
              {diabetusData.SkinThickness}
              <Text>(mm)</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dataText}>Insulin:</Text>
            <Text style={styles.dataValue}>
              {diabetusData.Insulin}
              <Text>(mu U/ml)</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dataText}>BMI:</Text>
            <Text style={styles.dataValue}>
              {diabetusData.BMI} <Text>(kg/(m)^2) </Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dataText}>Diabetes Pedigree Function:</Text>
            <Text style={styles.dataValue}>
              {diabetusData.DiabetesPedigreeFunction}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dataText}>Age:</Text>
            <Text style={styles.dataValue}>
              {diabetusData.Age}
              <Text>(y) </Text>
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
    marginLeft: 1,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  dataContainer: {
    marginTop: 20,
    width: "80%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dataText: {
    fontSize: 16,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default Childindex;
