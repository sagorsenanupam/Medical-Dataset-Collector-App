import { DatePickerFields } from "@/components/date-picker-fields";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function IdentificationScreen() {
  const [studyId, setStudyId] = useState("");
  const [date, setDate] = useState("");
  const [respondentName, setRespondentName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [relationship, setRelationship] = useState("Mother");
  const [otherRelationship, setOtherRelationship] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Section A: Identification</Text>
      <Text style={styles.subtext}>
        Shaheed Suhrawardy Medical College & Hospital
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Study ID:</Text>
        <TextInput
          style={styles.input}
          value={studyId}
          onChangeText={setStudyId}
          placeholder="e.g., 1001"
        />
      </View>

      <DatePickerFields label="Date:" value={date} onChange={setDate} />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name of Respondent:</Text>
        <TextInput
          style={styles.input}
          value={respondentName}
          onChangeText={setRespondentName}
          placeholder="Enter name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Relationship to child:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={relationship}
            onValueChange={(itemValue) => setRelationship(itemValue)}
          >
            <Picker.Item label="Mother" value="Mother" />
            <Picker.Item label="Father" value="Father" />
            <Picker.Item label="Grandparent" value="Grandparent" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>

      {relationship === "Other" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Specify Other Relationship:</Text>
          <TextInput
            style={styles.input}
            value={otherRelationship}
            onChangeText={setOtherRelationship}
            placeholder="e.g., Aunt, Uncle"
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Number:</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="01XXXXXXXXX"
          keyboardType="numeric"
        />
      </View>

      {/* NEW BULLETPROOF CUSTOM BUTTON */}
      <Pressable
        style={styles.customButton}
        onPress={() => router.push("/sociodemographics")}
      >
        <Text style={styles.customButtonText}>Next: Sociodemographics</Text>
      </Pressable>

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
    marginBottom: 5,
    color: "#333",
    marginTop: 40,
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
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
  bottomPadding: {
    height: 50,
  },
  // NEW BUTTON STYLES
  customButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  customButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
