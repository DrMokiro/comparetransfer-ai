import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { OfferCard } from "../components/OfferCard";
import { getCountryByCode } from "../data/catalog";
import { useLanguage } from "../i18n/LanguageContext";
import { ExchangeRateResult, getExchangeRate, getFallbackExchangeRate } from "../services/exchangeRates";
import { getOffersForComparison } from "../services/offers";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { RootStackParamList } from "../types";
import { formatMoney } from "../utils/format";

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, "Results">;

export function ResultsScreen({ navigation, route }: ResultsScreenProps) {
  const { t } = useLanguage();
  const { comparison } = route.params;
  const [rateInfo, setRateInfo] = useState<ExchangeRateResult>(() =>
    getFallbackExchangeRate(comparison.sendCurrency, comparison.receiveCurrency)
  );
  const [isRefreshingRate, setIsRefreshingRate] = useState(false);
  const offers = getOffersForComparison(comparison, rateInfo.rate);
  const destinationCountry = getCountryByCode(comparison.toCountry);

  useEffect(() => {
    let isMounted = true;

    setRateInfo(getFallbackExchangeRate(comparison.sendCurrency, comparison.receiveCurrency));
    setIsRefreshingRate(true);
    getExchangeRate(comparison.sendCurrency, comparison.receiveCurrency)
      .then((nextRateInfo) => {
        if (isMounted) {
          setRateInfo(nextRateInfo);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsRefreshingRate(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [comparison.receiveCurrency, comparison.sendCurrency]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <View>
          <Text style={styles.label}>{t("results.simulation")}</Text>
          <Text style={styles.title}>
            {formatMoney(comparison.amount, comparison.sendCurrency)} vers {destinationCountry.label}
          </Text>
          <Text style={styles.rateStatus}>
            {rateInfo.isFallback
              ? isRefreshingRate
                ? t("results.estimatedRefreshing")
                : t("results.localRate")
              : t("results.updatedRate", {
                source: rateInfo.source,
                date: rateInfo.date ? `${t("results.datePrefix")}${rateInfo.date}` : ""
              })}
          </Text>
          <Text style={styles.disclaimer}>{t("results.disclaimer")}</Text>
        </View>
        <AppButton
          label={t("results.assistant")}
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
  rateStatus: {
    color: colors.muted,
    lineHeight: 20,
    marginTop: spacing.xs
  },
  disclaimer: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs
  },
  assistantButton: {
    alignSelf: "flex-start"
  },
  list: {
    gap: spacing.md
  }
});
