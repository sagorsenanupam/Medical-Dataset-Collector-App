import { useFormContext } from "@/context/FormContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SummaryScreen() {
  const formContext = useFormContext();
  const [saveStatus, setSaveStatus] = useState("Ready to save");
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    const loadResponseCount = async () => {
      try {
        const responses = await formContext.getAllResponses();
        setResponseCount(responses.length);
      } catch (error) {
        console.error("Error loading response count:", error);
      }
    };
    loadResponseCount();
  }, []);

  const handleSaveResponse = async () => {
    setSaveStatus("Saving...");
    try {
      await formContext.saveResponse();
      setSaveStatus("✓ Response saved successfully!");
      setResponseCount((prev) => prev + 1);
      formContext.resetForm();
      setTimeout(() => {
        router.push("/(tabs)/");
      }, 2000);
    } catch (error) {
      setSaveStatus("✗ Error saving response");
      console.error("Error:", error);
    }
  };

  const {
    identification,
    sociodemographics,
    behavioural,
    clinical,
    nutritional,
  } = formContext;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Response Summary</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Review Your Data</Text>
        <Text style={styles.summaryText}>
          All information has been collected. Please review before saving.
        </Text>
        <Text style={styles.responseCount}>
          Total responses saved: {responseCount}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Section A: Identification</Text>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Study ID:</Text>
          <Text style={styles.value}>{identification.studyId || "-"}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Respondent Name:</Text>
          <Text style={styles.value}>
            {identification.respondentName || "-"}
          </Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Relationship:</Text>
          <Text style={styles.value}>{identification.relationship}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>
            {identification.contactNumber || "-"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Section B: Sociodemographics</Text>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Child's Age:</Text>
          <Text style={styles.value}>
            {sociodemographics.childAge || "-"} months
          </Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Sex:</Text>
          <Text style={styles.value}>{sociodemographics.childSex}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Residence:</Text>
          <Text style={styles.value}>{sociodemographics.residence}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Household Members:</Text>
          <Text style={styles.value}>
            {sociodemographics.householdMembers || "-"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          Section C: Behavioural & Sanitation
        </Text>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Water Source:</Text>
          <Text style={styles.value}>{behavioural.waterSource}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Toilet Type:</Text>
          <Text style={styles.value}>{behavioural.toiletType}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Feeding Pattern:</Text>
          <Text style={styles.value}>{behavioural.feedingPattern}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Section D: Clinical Profile</Text>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>
            {clinical.diarrheaDuration || "-"} days
          </Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Stool Type:</Text>
          <Text style={styles.value}>{clinical.stoolType}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Dehydration Status:</Text>
          <Text style={styles.value}>{clinical.dehydrationStatus}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Nutritional Status</Text>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Weight (kg):</Text>
          <Text style={styles.value}>{nutritional.weight || "-"}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Height (cm):</Text>
          <Text style={styles.value}>{nutritional.height || "-"}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Classification:</Text>
          <Text style={styles.value}>{nutritional.classification}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.label}>Interviewer:</Text>
          <Text style={styles.value}>{nutritional.interviewerName || "-"}</Text>
        </View>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{saveStatus}</Text>
      </View>

      <View style={styles.featureNote}>
        <Text style={styles.featureNoteTitle}>Data Management:</Text>
        <Text style={styles.featureNoteText}>
          ✓ All responses saved locally on device
        </Text>
        <Text style={styles.featureNoteText}>
          ✓ CSV export coming in next update
        </Text>
        <Text style={styles.featureNoteText}>
          ✓ View & manage responses in Explore tab
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => router.push("/nutritional")}
        >
          <Text style={styles.buttonText}>← Edit</Text>
        </Pressable>
        <Pressable style={styles.customButton} onPress={handleSaveResponse}>
          <Text style={styles.customButtonText}>Save Response</Text>
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
  summaryBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2196F3",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  responseCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
    marginTop: 5,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#999",
    flex: 1,
    textAlign: "right",
  },
  statusBox: {
    backgroundColor: "#c8e6c9",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
    textAlign: "center",
  },
  featureNote: {
    backgroundColor: "#fff3e0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  featureNoteTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e65100",
    marginBottom: 8,
  },
  featureNoteText: {
    fontSize: 13,
    color: "#bf360c",
    marginBottom: 5,
    lineHeight: 18,
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
