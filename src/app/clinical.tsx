import SimpleDateInput from "@/components/simple-date-input";
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

export default function ClinicalScreen() {
  const { clinical, updateClinical } = useFormContext();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        Section D: Clinical Profile & Examination
      </Text>

      <Text style={styles.sectionTitle}>History:</Text>

      <SimpleDateInput
        label="Date of symptom onset:"
        value={clinical.symptomOnset}
        onChange={(value) => updateClinical({ symptomOnset: value })}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duration of diarrhoea (days):</Text>
        <TextInput
          style={styles.input}
          value={clinical.diarrheaDuration}
          onChangeText={(value) => updateClinical({ diarrheaDuration: value })}
          placeholder="Enter number of days"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Frequency of loose stools/24 hrs:</Text>
        <TextInput
          style={styles.input}
          value={clinical.stoolFrequency}
          onChangeText={(value) => updateClinical({ stoolFrequency: value })}
          placeholder="Enter frequency"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Stool type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.stoolType}
            onValueChange={(itemValue) =>
              updateClinical({ stoolType: itemValue })
            }
          >
            <Picker.Item label="Watery" value="Watery" />
            <Picker.Item label="Watery with mucus" value="Watery with mucus" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vomiting:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.vomiting}
            onValueChange={(itemValue) =>
              updateClinical({ vomiting: itemValue })
            }
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      {clinical.vomiting === "Yes" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vomiting times/24 hrs:</Text>
          <TextInput
            style={styles.input}
            value={clinical.vomitingTimes}
            onChangeText={(value) => updateClinical({ vomitingTimes: value })}
            placeholder="Enter number of times"
            keyboardType="numeric"
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fever:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.fever}
            onValueChange={(itemValue) => updateClinical({ fever: itemValue })}
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Clinical Examination:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>General condition:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.generalCondition}
            onValueChange={(itemValue) =>
              updateClinical({ generalCondition: itemValue })
            }
          >
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Lethargic" value="Lethargic" />
            <Picker.Item label="Irritable" value="Irritable" />
            <Picker.Item label="Comatose" value="Comatose" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sunken eye:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.sunkenEye}
            onValueChange={(itemValue) =>
              updateClinical({ sunkenEye: itemValue })
            }
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Skin pinch goes back:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.skinPinch}
            onValueChange={(itemValue) =>
              updateClinical({ skinPinch: itemValue })
            }
          >
            <Picker.Item label="Very slowly" value="very slowly" />
            <Picker.Item label="Slowly" value="slowly" />
            <Picker.Item label="Immediately/normally" value="immediately" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mucous membrane:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.mucousMembrane}
            onValueChange={(itemValue) =>
              updateClinical({ mucousMembrane: itemValue })
            }
          >
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Dry" value="Dry" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Capillary refill time:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.capillaryRefill}
            onValueChange={(itemValue) =>
              updateClinical({ capillaryRefill: itemValue })
            }
          >
            <Picker.Item label="≤2 sec" value="≤2sec" />
            <Picker.Item label=">2 sec" value=">2sec" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Drinks:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.drinks}
            onValueChange={(itemValue) => updateClinical({ drinks: itemValue })}
          >
            <Picker.Item label="Not able to drink" value="not able" />
            <Picker.Item label="Thirsty/eagerly" value="thirsty/eagerly" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Dehydration status:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={clinical.dehydrationStatus}
            onValueChange={(itemValue) =>
              updateClinical({ dehydrationStatus: itemValue })
            }
          >
            <Picker.Item label="No dehydration" value="No dehydration" />
            <Picker.Item label="Some dehydration" value="Some dehydration" />
            <Picker.Item
              label="Severe dehydration"
              value="Severe dehydration"
            />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => router.push("/behavioural")}
        >
          <Text style={styles.buttonText}>← Back</Text>
        </Pressable>
        <Pressable
          style={styles.customButton}
          onPress={() => router.push("/nutritional")}
        >
          <Text style={styles.customButtonText}>Next: Nutritional</Text>
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
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  customButton: {
    flex: 1,
    backgroundColor: "#2196F3",
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
