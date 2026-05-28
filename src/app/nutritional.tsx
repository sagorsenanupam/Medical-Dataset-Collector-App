import { useFormContext } from "@/context/FormContext";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function NutritionalScreen() {
  const { nutritional, updateNutritional } = useFormContext();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nutritional Status & Summary</Text>

      <Text style={styles.sectionTitle}>Nutritional Measurements:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          value={nutritional.weight}
          onChangeText={(value) => updateNutritional({ weight: value })}
          placeholder="Enter weight"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height/Length (cm):</Text>
        <TextInput
          style={styles.input}
          value={nutritional.height}
          onChangeText={(value) => updateNutritional({ height: value })}
          placeholder="Enter height"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>MUAC (cm):</Text>
        <TextInput
          style={styles.input}
          value={nutritional.MUAC}
          onChangeText={(value) => updateNutritional({ MUAC: value })}
          placeholder="Mid-Upper Arm Circumference"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>WHZ (Weight-Height Z-score):</Text>
        <TextInput
          style={styles.input}
          value={nutritional.WHZ}
          onChangeText={(value) => updateNutritional({ WHZ: value })}
          placeholder="Enter WHZ value"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Classification (based on WHO Z score):</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={nutritional.classification}
            onValueChange={(itemValue) =>
              updateNutritional({ classification: itemValue })
            }
          >
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item
              label="Moderate malnutrition"
              value="Moderate malnutrition"
            />
            <Picker.Item
              label="Severe malnutrition"
              value="Severe malnutrition"
            />
          </Picker>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Additional Information:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Investigations (if any):</Text>
        <TextInput
          style={[styles.input, { minHeight: 80, textAlignVertical: "top" }]}
          value={nutritional.investigations}
          onChangeText={(value) => updateNutritional({ investigations: value })}
          placeholder="Enter any investigations performed"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Provisional Diagnosis:</Text>
        <TextInput
          style={[styles.input, { minHeight: 80, textAlignVertical: "top" }]}
          value={nutritional.diagnosis}
          onChangeText={(value) => updateNutritional({ diagnosis: value })}
          placeholder="Enter provisional diagnosis"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Interviewer Name:</Text>
        <TextInput
          style={styles.input}
          value={nutritional.interviewerName}
          onChangeText={(value) =>
            updateNutritional({ interviewerName: value })
          }
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Next Steps:</Text>
        <Text style={styles.infoText}>
          • Review all responses before submission
        </Text>
        <Text style={styles.infoText}>• Data will be saved to your device</Text>
        <Text style={styles.infoText}>
          • You can export responses as CSV file
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => router.push("/clinical")}
        >
          <Text style={styles.buttonText}>← Back</Text>
        </Pressable>
        <Pressable
          style={styles.customButton}
          onPress={() => router.push("/summary")}
        >
          <Text style={styles.customButtonText}>Review & Save</Text>
        </Pressable>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#2196F3",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2196F3",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#1976d2",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  customButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonBack: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  customButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomPadding: {
    height: 50,
  },
});
