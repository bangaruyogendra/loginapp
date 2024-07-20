require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const diabetus = require("./models/diabetus");
const app = express();
const port = process.env.PORT || 8001;
const person = require("./models/person");
const { PythonShell } = require("python-shell");
const { spawn } = require("child_process");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path = require("path");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

mongoose.set("debug", true);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering the user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const secretKey = process.env.SECRET_KEY;
//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
//adding details without person
app.post("/details", async (req, res) => {
  try {
    const {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age,
    } = req.body;
    if (
      !Pregnancies ||
      !Glucose ||
      !BloodPressure ||
      !SkinThickness ||
      !Insulin ||
      !BMI ||
      !DiabetesPedigreeFunction ||
      !Age
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("adding new Details");
    const details = new diabetus({
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age,
    });
    await details.save();

    res.status(200).json({ message: "Details added successfully" });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ message: "Error in getting details" });
  }
});
//predict results
app.post("/predict", async (req, res) => {
  try {
    const { name, diabetusData } = req.body;

    // Find the person by name
    const personRecord = await person.findOne({ name });
    if (!personRecord) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Create a new diabetes record
    const newDiabetus = new diabetus(diabetusData);
    await newDiabetus.save();

    // Link the diabetes record to the person
    personRecord.diabetusId = newDiabetus._id;
    await personRecord.save();

    // Call the Python script to get the prediction
    const pythonProcess = spawn("python", [
      "predict.py",
      JSON.stringify(diabetusData),
    ]);

    let dataString = "";

    pythonProcess.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      if (!res.headersSent) {
        res.status(500).send(data.toString());
      }
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const prediction = JSON.parse(dataString);
          if (!res.headersSent) {
            res.json({
              message: prediction.prediction,
              person: personRecord,
              newDiabetus,
            });
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          if (!res.headersSent) {
            res.status(500).send("Error parsing prediction result");
          }
        }
      } else {
        if (!res.headersSent) {
          res.status(500).send("Python script exited with error");
        }
      }
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Error adding diabetes data", error });
  }
});

//getting particular person details
app.post("/getDiabetusData", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(`Searching for person with name: ${name}`); // Debugging log
    const person1 = await person.findOne({ name }).populate("diabetusId");
    if (!person1) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(person1.diabetusId);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
//adding person details
app.post("/home", async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    console.log("Adding Name and Address");
    const personDetails = new person({ name, address });
    await personDetails.save();
    res.status(200).json({
      message: "Details added successfully",
      personId: personDetails._id,
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ message: "Error in posting details" });
  }
});

//adding person and details
app.post("/addDiabetusData", async (req, res) => {
  try {
    const { name, diabetusData } = req.body;

    // Find the person by name
    const personRecord = await person.findOne({ name });
    if (!personRecord) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Create a new diabetus record
    const newDiabetus = new diabetus(diabetusData);
    await newDiabetus.save();

    // Link the diabetus record to the person
    personRecord.diabetusId = newDiabetus._id;
    await personRecord.save();

    res.status(201).json({ person: personRecord, newDiabetus });
  } catch (error) {
    res.status(500).json({ message: "Error adding diabetus data", error });
  }
});
