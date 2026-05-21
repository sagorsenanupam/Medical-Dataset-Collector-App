import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { FormProvider } from "@/context/FormContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <FormProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="sociodemographics"
            options={{
              title: "Sociodemographics",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="behavioural"
            options={{
              title: "Behavioural & Sanitation",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="clinical"
            options={{
              title: "Clinical Profile",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="nutritional"
            options={{
              title: "Nutritional Status",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="summary"
            options={{
              title: "Review & Save",
              headerBackTitle: "Back",
            }}
          />
        </Stack>
      </ThemeProvider>
    </FormProvider>
  );
}
