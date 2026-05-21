import { GoogleSignin } from "@react-native-google-signin/google-signin";
import RNFetchBlob from "rn-fetch-blob";

export const initializeGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    offlineAccess: true,
    scopes: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
};

export const signInToGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    console.error("Google Sign-In failed:", error);
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const tokens = await GoogleSignin.getTokens();
    return tokens.accessToken;
  } catch (error) {
    console.error("Failed to get access token:", error);
    throw error;
  }
};

export const uploadCSVToGoogleDrive = async (
  csvContent: string,
  filename: string,
) => {
  try {
    const accessToken = await getAccessToken();

    // First, save CSV locally to Documents folder
    const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${filename}`;
    await RNFetchBlob.fs.writeFile(path, csvContent, "utf8");
    console.log("CSV saved locally:", path);

    // Upload to Google Drive
    const metadata = {
      name: filename,
      mimeType: "text/csv",
      parents: ["root"], // Save to root of Drive, or specify folder ID
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" }),
    );
    form.append("file", new Blob([csvContent], { type: "text/csv" }), filename);

    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      },
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Uploaded to Google Drive:", result.id);
    return result;
  } catch (error) {
    console.error("Failed to upload CSV to Google Drive:", error);
    throw error;
  }
};

export const updateExistingCSVOnDrive = async (
  fileId: string,
  csvContent: string,
) => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/csv",
        },
        body: csvContent,
      },
    );

    if (!response.ok) {
      throw new Error(`Update failed: ${response.statusText}`);
    }

    console.log("Updated CSV on Google Drive:", fileId);
    return await response.json();
  } catch (error) {
    console.error("Failed to update CSV on Google Drive:", error);
    throw error;
  }
};

export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    console.log("Signed out from Google");
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};
