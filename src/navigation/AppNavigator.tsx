import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";
import { AssistantScreen } from "../screens/AssistantScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProviderDetailScreen } from "../screens/ProviderDetailScreen";
import { ResultsScreen } from "../screens/ResultsScreen";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { t } = useLanguage();

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <LanguageSelector />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background
        },
        headerTintColor: colors.ink,
        headerTitleStyle: {
          fontWeight: "700"
        },
        contentStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "CompareTransfer AI" }} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{ title: t("app.results") }} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} options={{ title: t("app.providerDetail") }} />
      <Stack.Screen name="Assistant" component={AssistantScreen} options={{ title: t("app.assistant") }} />
    </Stack.Navigator>
  );
}
