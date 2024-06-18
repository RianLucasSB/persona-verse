import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import * as SplashScreen from "expo-splash-screen"

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { CharacterContextProvider } from "@/contexts/character"

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if (fontsLoaded) {
    SplashScreen.hideAsync()
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#0D0D0D" style='light' />
        <CharacterContextProvider>
          {fontsLoaded && <Slot />}
        </CharacterContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}