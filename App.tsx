import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LanguageProvider } from "./src/i18n/LanguageContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { colors } from "./src/theme/colors";

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor={colors.background} />
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
