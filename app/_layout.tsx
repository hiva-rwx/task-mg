import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createDatabase, getData, insertData } from "@/db";
import { openDatabase } from "react-native-sqlite-storage";
import { Text } from "react-native";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default async function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // useEffect(() => {
  //   createDatabase();
  //   console.log(insertData("title test 1","description test 1"))
  // }, []);
  var db = await openDatabase({
    name: "Task",
    location: "default",
  });
  useEffect(() => {
    createTable();
  }, []);

  const createTable = async () => {
    const query_create = `    CREATE TABLE IF NOT EXISTS Task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_done BOOLEAN DEFAULT 0
    );`;
    try {
      await db.executeSql(query_create);
    } catch (err) {
      console.log({ err });
    }
  };
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#dcdce1",
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
