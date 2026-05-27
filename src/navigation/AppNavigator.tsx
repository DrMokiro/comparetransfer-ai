import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AssistantScreen } from "../screens/AssistantScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProviderDetailScreen } from "../screens/ProviderDetailScreen";
import { ResultsScreen } from "../screens/ResultsScreen";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
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
      <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Resultats" }} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} options={{ title: "Detail prestataire" }} />
      <Stack.Screen name="Assistant" component={AssistantScreen} options={{ title: "Assistant IA" }} />
    </Stack.Navigator>
  );
}
