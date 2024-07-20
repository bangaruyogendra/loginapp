import sys
import json
import joblib
import warnings

# Ignore warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Load model
model = joblib.load('model.pkl')

# Read input from command line
input_data = json.loads(sys.argv[1])

# Extract features
features = [
    input_data['Pregnancies'],
    input_data['Glucose'],
    input_data['BloodPressure'],
    input_data['SkinThickness'],
    input_data['Insulin'],
    input_data['BMI'],
    input_data['DiabetesPedigreeFunction'],
    input_data['Age'],
]

# Make prediction
prediction = model.predict([features])

# Output the prediction as a JSON string
result = {"prediction": "The patient has diabetes." if prediction[0] == 1 else "The patient does not have diabetes."}
print(json.dumps(result))
