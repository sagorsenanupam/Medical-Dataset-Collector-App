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

export default function SociodemographicsScreen() {
  const { sociodemographics, updateSociodemographics } = useFormContext();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        Section B: Sociodemographic Characteristics
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Child's Age (months):</Text>
        <TextInput
          style={styles.input}
          value={sociodemographics.childAge}
          onChangeText={(value) => updateSociodemographics({ childAge: value })}
          placeholder="Enter age in months"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sex of Child:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sociodemographics.childSex}
            onValueChange={(itemValue) =>
              updateSociodemographics({ childSex: itemValue })
            }
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Monthly Family Income (BDT):</Text>
        <TextInput
          style={styles.input}
          value={sociodemographics.monthlyIncome}
          onChangeText={(value) =>
            updateSociodemographics({ monthlyIncome: value })
          }
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Monthly Family Expenditure (BDT):</Text>
        <TextInput
          style={styles.input}
          value={sociodemographics.monthlyExpenditure}
          onChangeText={(value) =>
            updateSociodemographics({ monthlyExpenditure: value })
          }
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Maternal Education:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sociodemographics.maternalEducation}
            onValueChange={(itemValue) =>
              updateSociodemographics({ maternalEducation: itemValue })
            }
          >
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Primary" value="Primary" />
            <Picker.Item label="Secondary" value="Secondary" />
            <Picker.Item label="Higher" value="Higher" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mother's Occupation:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sociodemographics.motherOccupation}
            onValueChange={(itemValue) =>
              updateSociodemographics({ motherOccupation: itemValue })
            }
          >
            <Picker.Item label="Housewife" value="Housewife" />
            <Picker.Item label="Service" value="Service" />
            <Picker.Item label="Business" value="Business" />
            <Picker.Item label="Labor" value="Labor" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Place of Residence:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sociodemographics.residence}
            onValueChange={(itemValue) =>
              updateSociodemographics({ residence: itemValue })
            }
          >
            <Picker.Item label="Urban" value="Urban" />
            <Picker.Item label="Rural" value="Rural" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Number of Household Members:</Text>
        <TextInput
          style={styles.input}
          value={sociodemographics.householdMembers}
          onChangeText={(value) =>
            updateSociodemographics({ householdMembers: value })
          }
          placeholder="Enter number"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Number of Living Rooms:</Text>
        <TextInput
          style={styles.input}
          value={sociodemographics.livingRooms}
          onChangeText={(value) =>
            updateSociodemographics({ livingRooms: value })
          }
          placeholder="Enter number"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Crowding Index:</Text>
        <TextInput
          style={styles.input}
          value={sociodemographics.crowdingIndex}
          onChangeText={(value) =>
            updateSociodemographics({ crowdingIndex: value })
          }
          placeholder="Enter index"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Number of Living Children of Mother:</Text>
        <TextInput
          style={styles.input}
          value={sociodemographics.livingChildren}
          onChangeText={(value) =>
            updateSociodemographics({ livingChildren: value })
          }
          placeholder="Enter number"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Birth Order:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sociodemographics.birthOrder}
            onValueChange={(itemValue) =>
              updateSociodemographics({ birthOrder: itemValue })
            }
          >
            <Picker.Item label="1st" value="1st" />
            <Picker.Item label="2nd" value="2nd" />
            <Picker.Item label="3rd" value="3rd" />
            <Picker.Item label="4th and above" value="4th and above" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonBack} onPress={() => router.back()}>
          <Text style={styles.buttonText}>← Back</Text>
        </Pressable>
        <Pressable
          style={styles.customButton}
          onPress={() => router.push("/behavioural")}
        >
          <Text style={styles.customButtonText}>Next: Behavioural</Text>
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
    marginBottom: 5,
    color: "#333",
    marginTop: 10,
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
