import { useFormContext } from "@/context/FormContext";
import {
    initializeGoogleSignIn,
    signInToGoogle,
    signOutFromGoogle,
} from "@/services/googleDriveService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function SettingsScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { isAutoSyncEnabled, toggleAutoSync, syncCSVToGoogleDrive } =
    useFormContext();

  useEffect(() => {
    initializeGoogleSignIn();
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      setIsSignedIn(isSignedIn);
      if (isSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser();
        setUserEmail(userInfo?.user.email || null);
      }
    } catch (error) {
      console.error("Error checking sign-in status:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userInfo = await signInToGoogle();
      setIsSignedIn(true);
      setUserEmail(userInfo?.user.email || null);
      Alert.alert(
        "Success",
        "Signed in successfully! Your CSV will now sync to Google Drive.",
      );
    } catch (error) {
      Alert.alert("Error", "Failed to sign in. Please try again.");
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutFromGoogle();
      setIsSignedIn(false);
      setUserEmail(null);
      Alert.alert("Signed Out", "Auto-sync to Google Drive is now disabled.");
    } catch (error) {
      Alert.alert("Error", "Failed to sign out.");
      console.error("Sign-out error:", error);
    }
  };

  const handleManualSync = async () => {
    try {
      Alert.alert("Syncing", "Uploading CSV to Google Drive...");
      await syncCSVToGoogleDrive();
      Alert.alert(
        "Success",
        "CSV synced successfully! Check your Google Drive.",
      );
    } catch (error) {
      Alert.alert("Error", "Failed to sync CSV. Make sure you're signed in.");
      console.error("Sync error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings & Sync</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Google Drive Sync</Text>

        {isSignedIn ? (
          <>
            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>✓ Signed In</Text>
              <Text style={styles.emailText}>{userEmail}</Text>
              <Text style={styles.infoText}>
                Your questionnaire data will automatically sync to Google Drive
                when you save responses.
              </Text>
            </View>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Auto-Sync Enabled</Text>
              <Pressable
                style={[
                  styles.toggleButton,
                  isAutoSyncEnabled && styles.toggleButtonActive,
                ]}
                onPress={() => toggleAutoSync(!isAutoSyncEnabled)}
              >
                <Text style={styles.toggleText}>
                  {isAutoSyncEnabled ? "ON" : "OFF"}
                </Text>
              </Pressable>
            </View>

            <Pressable style={styles.primaryButton} onPress={handleManualSync}>
              <Text style={styles.primaryButtonText}>Sync Now (Manual)</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={handleSignOut}>
              <Text style={styles.secondaryButtonText}>Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Not Signed In</Text>
              <Text style={styles.infoText}>
                Sign in with your Google account to automatically sync your
                questionnaire responses to Google Drive as a CSV file.
              </Text>
            </View>

            <Pressable style={styles.primaryButton} onPress={handleSignIn}>
              <Text style={styles.primaryButtonText}>Sign In with Google</Text>
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About CSV Export</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            • CSV file:{" "}
            <Text style={styles.bold}>diarrhea_questionnaire_data.csv</Text>
          </Text>
          <Text style={styles.infoText}>
            • Location: <Text style={styles.bold}>Device Documents folder</Text>
          </Text>
          <Text style={styles.infoText}>
            • Syncs to: <Text style={styles.bold}>Your Google Drive</Text>
          </Text>
          <Text style={styles.infoText}>
            • Updates: <Text style={styles.bold}>Real-time with each save</Text>
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            1. Fill out the questionnaire form
          </Text>
          <Text style={styles.infoText}>
            2. Click "Save" on the summary screen
          </Text>
          <Text style={styles.infoText}>
            3. Data is saved locally AND synced to Google Drive
          </Text>
          <Text style={styles.infoText}>
            4. Open Google Drive to view/download your dataset
          </Text>
        </View>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2196F3",
  },
  statusBox: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: "#2e7d32",
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976d2",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#1565c0",
    marginBottom: 6,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  toggleButtonActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  primaryButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomPadding: {
    height: 50,
  },
});
