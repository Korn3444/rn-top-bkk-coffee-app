import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //---------- Load Fonts ----------
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  //--------------------------------

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Top Bangkok Coffees",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "Kanit_700Bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#4f1c02",
          },
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Top Bangkok Coffees",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "Kanit_700Bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#4f1c02",
          },
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียด",
          headerTitleAlign: "center",
          headerBackTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: "Kanit_700Bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#4f1c02",
          },
        }}
      />
    </Stack>
  );
}
