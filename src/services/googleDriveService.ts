import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const initializeGoogleSignIn = () => {
  if (isWeb) {
    console.log("Google Sign-In is disabled on web in this build.");
    return;
  }

  GoogleSignin.configure({
    webClientId:
      "1084761733202-sdlr3mu9l38t4bc783bsl7vi3sg2u34f.apps.googleusercontent.com",
    offlineAccess: true,
    scopes: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
};

export const signInToGoogle = async () => {
  try {
    if (isWeb) {
      console.log("Google Sign-In is not available on web.");
      return null;
    }

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
    if (isWeb) {
      console.log("Google access token is not available on web.");
      return "";
    }

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
    if (isWeb) {
      console.log("Skipping Google Drive upload on web.");
      return null;
    }

    const accessToken = await getAccessToken();

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
    if (isWeb) {
      console.log("Skipping Google Drive update on web.");
      return null;
    }

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

export const appendToGoogleSheet = async (
  spreadsheetId: string,
  values: string[][],
  range: string = "Sheet1!A:Z",
) => {
  try {
    if (isWeb) {
      console.log("Skipping Google Sheets append on web.");
      return null;
    }

    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      },
    );

    if (!response.ok) {
      throw new Error(`Append failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Data appended to Google Sheet:", result);
    return result;
  } catch (error) {
    console.error("Failed to append to Google Sheet:", error);
    throw error;
  }
};

export const createGoogleSheet = async (title: string) => {
  try {
    if (isWeb) {
      console.log("Skipping Google Sheets creation on web.");
      return null;
    }

    const accessToken = await getAccessToken();

    const response = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            title: title,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Sheet creation failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Google Sheet created:", result.spreadsheetId);
    return result;
  } catch (error) {
    console.error("Failed to create Google Sheet:", error);
    throw error;
  }
};

export const signOutFromGoogle = async () => {
  try {
    if (isWeb) {
      console.log("Google Sign-Out is not available on web.");
      return;
    }

    await GoogleSignin.signOut();
    console.log("Signed out from Google");
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};
