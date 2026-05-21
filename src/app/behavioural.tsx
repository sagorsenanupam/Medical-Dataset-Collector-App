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

export default function BehaviouralScreen() {
  const { behavioural, updateBehavioural } = useFormContext();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Section C: Behavioural & Sanitation</Text>

      <Text style={styles.sectionTitle}>Handwashing Practices:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Handwashing before feeding child:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.handwashBeforeFeeding}
            onValueChange={(itemValue) =>
              updateBehavioural({ handwashBeforeFeeding: itemValue })
            }
          >
            <Picker.Item label="Always" value="Always" />
            <Picker.Item label="Sometimes" value="Sometimes" />
            <Picker.Item label="Never" value="Never" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Handwashing after toilet use:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.handwashAfterToilet}
            onValueChange={(itemValue) =>
              updateBehavioural({ handwashAfterToilet: itemValue })
            }
          >
            <Picker.Item label="Always" value="Always" />
            <Picker.Item label="Sometimes" value="Sometimes" />
            <Picker.Item label="Never" value="Never" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Child's handwashing before eating:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.childHandwashBefore}
            onValueChange={(itemValue) =>
              updateBehavioural({ childHandwashBefore: itemValue })
            }
          >
            <Picker.Item label="Always" value="Always" />
            <Picker.Item label="Sometimes" value="Sometimes" />
            <Picker.Item label="Never" value="Never" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Soap availability near handwashing station:
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.soapAvailable}
            onValueChange={(itemValue) =>
              updateBehavioural({ soapAvailable: itemValue })
            }
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Water & Sanitation:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Primary drinking water source:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.waterSource}
            onValueChange={(itemValue) =>
              updateBehavioural({ waterSource: itemValue })
            }
          >
            <Picker.Item label="Tube-well" value="Tube-well" />
            <Picker.Item label="Piped water" value="Piped water" />
            <Picker.Item
              label="Surface water (pond/river)"
              value="Surface water"
            />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Distance of water source from home:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.waterDistance}
            onValueChange={(itemValue) =>
              updateBehavioural({ waterDistance: itemValue })
            }
          >
            <Picker.Item label="<50m" value="<50m" />
            <Picker.Item label=">50m" value=">50m" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Child given outside/street food:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.streetFood}
            onValueChange={(itemValue) =>
              updateBehavioural({ streetFood: itemValue })
            }
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Water storage container:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.waterContainer}
            onValueChange={(itemValue) =>
              updateBehavioural({ waterContainer: itemValue })
            }
          >
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="Covered" value="Covered" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Method of drinking water treatment:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.waterTreatment}
            onValueChange={(itemValue) =>
              updateBehavioural({ waterTreatment: itemValue })
            }
          >
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Boiling" value="Boiling" />
            <Picker.Item label="Filtration" value="Filtration" />
            <Picker.Item label="Chlorination" value="Chlorination" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Feeding Practices:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Exclusive breastfeeding for first 6 months:
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.exclusiveBreastfeeding}
            onValueChange={(itemValue) =>
              updateBehavioural({ exclusiveBreastfeeding: itemValue })
            }
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age of Formula milk start (months):</Text>
        <TextInput
          style={styles.input}
          value={behavioural.formulaMilkAge}
          onChangeText={(value) => updateBehavioural({ formulaMilkAge: value })}
          placeholder="Enter age"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Current feeding pattern:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.feedingPattern}
            onValueChange={(itemValue) =>
              updateBehavioural({ feedingPattern: itemValue })
            }
          >
            <Picker.Item
              label="Breastfeeding only"
              value="Breastfeeding only"
            />
            <Picker.Item
              label="Breastfeeding + complementary"
              value="Breastfeeding + complementary"
            />
            <Picker.Item
              label="Only complementary"
              value="Only complementary"
            />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bottle feeding:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.bottleFeeding}
            onValueChange={(itemValue) =>
              updateBehavioural({ bottleFeeding: itemValue })
            }
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      {behavioural.bottleFeeding === "Yes" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bottle cleaning with:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={behavioural.bottleCleaningMethod}
              onValueChange={(itemValue) =>
                updateBehavioural({ bottleCleaningMethod: itemValue })
              }
            >
              <Picker.Item label="Water only" value="Water only" />
              <Picker.Item label="Soap & water" value="Soap & water" />
              <Picker.Item label="Boiling" value="Boiling" />
            </Picker>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>Toilet & Stool Disposal:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type of toilet facility (shared?):</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.toiletShared}
            onValueChange={(itemValue) =>
              updateBehavioural({ toiletShared: itemValue })
            }
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Toilet type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.toiletType}
            onValueChange={(itemValue) =>
              updateBehavioural({ toiletType: itemValue })
            }
          >
            <Picker.Item label="Sanitary latrine" value="Sanitary latrine" />
            <Picker.Item label="Unimproved/pit" value="Unimproved/pit" />
            <Picker.Item label="Open defecation" value="Open defecation" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Disposal of child stool:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={behavioural.stoolDisposal}
            onValueChange={(itemValue) =>
              updateBehavioural({ stoolDisposal: itemValue })
            }
          >
            <Picker.Item label="Toilet" value="Toilet" />
            <Picker.Item label="Open field" value="Open field" />
            <Picker.Item label="Dustbin" value="Dustbin" />
            <Picker.Item label="Drain" value="Drain" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonBack} onPress={() => router.back()}>
          <Text style={styles.buttonText}>← Back</Text>
        </Pressable>
        <Pressable
          style={styles.customButton}
          onPress={() => router.push("/clinical")}
        >
          <Text style={styles.customButtonText}>Next: Clinical</Text>
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
