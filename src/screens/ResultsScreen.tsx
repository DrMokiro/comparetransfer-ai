import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { OfferCard } from "../components/OfferCard";
import { getCountryByCode } from "../data/catalog";
import { getOffersForComparison } from "../services/offers";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { RootStackParamList } from "../types";
import { formatMoney } from "../utils/format";

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, "Results">;

export function ResultsScreen({ navigation, route }: ResultsScreenProps) {
  const { comparison } = route.params;
  const offers = getOffersForComparison(comparison);
  const destinationCountry = getCountryByCode(comparison.toCountry);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <View>
          <Text style={styles.label}>Simulation</Text>
          <Text style={styles.title}>
            {formatMoney(comparison.amount, comparison.sendCurrency)} vers {destinationCountry.label}
          </Text>
        </View>
        <AppButton
          label="Assistant"
          variant="secondary"
          icon={<Ionicons name="sparkles-outline" size={18} color={colors.ink} />}
          onPress={() => navigation.navigate("Assistant", { comparison })}
          style={styles.assistantButton}
        />
      </View>

      <View style={styles.list}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            sendCurrency={comparison.sendCurrency}
            receiveCurrency={comparison.receiveCurrency}
            onPress={() => navigation.navigate("ProviderDetail", { providerId: offer.providerId })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.lg
  },
  summary: {
    gap: spacing.md
  },
  label: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 13
  },
  title: {
    color: colors.ink,
    fontSize: typography.heading,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  assistantButton: {
    alignSelf: "flex-start"
  },
  list: {
    gap: spacing.md
  }
});
