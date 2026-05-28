import { DatePickerFields } from "@/components/date-picker-fields";
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

export default function IdentificationScreen() {
  const { identification, updateIdentification } = useFormContext();

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
          value={identification.studyId}
          onChangeText={(value) => updateIdentification({ studyId: value })}
          placeholder="e.g., 1001"
        />
      </View>

      <DatePickerFields
        label="Date:"
        value={identification.date}
        onChange={(value) => updateIdentification({ date: value })}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name of Respondent:</Text>
        <TextInput
          style={styles.input}
          value={identification.respondentName}
          onChangeText={(value) =>
            updateIdentification({ respondentName: value })
          }
          placeholder="Enter name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Relationship to child:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={identification.relationship}
            onValueChange={(itemValue) =>
              updateIdentification({ relationship: itemValue })
            }
          >
            <Picker.Item label="Mother" value="Mother" />
            <Picker.Item label="Father" value="Father" />
            <Picker.Item label="Grandparent" value="Grandparent" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>

      {identification.relationship === "Other" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Specify Other Relationship:</Text>
          <TextInput
            style={styles.input}
            value={identification.otherRelationship}
            onChangeText={(value) =>
              updateIdentification({ otherRelationship: value })
            }
            placeholder="e.g., Aunt, Uncle"
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Number:</Text>
        <TextInput
          style={styles.input}
          value={identification.contactNumber}
          onChangeText={(value) =>
            updateIdentification({ contactNumber: value })
          }
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
