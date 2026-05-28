import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
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
  const bestOffer = offers[0];
  const nextOffer = offers[1];
  const bestOfferGain = bestOffer && nextOffer
    ? bestOffer.amountReceived - nextOffer.amountReceived
    : 0;

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

      <AppCard style={styles.trustCard}>
        <View style={styles.trustHeader}>
          <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.trustTitle}>Pourquoi ce classement ?</Text>
        </View>
        <Text style={styles.trustText}>
          Nous classons les offres selon le montant recu, les frais estimes, le taux applique et le delai.
          Les frais restent indicatifs : verifiez toujours le montant final chez le prestataire avant de valider un transfert.
        </Text>
      </AppCard>

      <View style={styles.list}>
        {offers.map((offer, index) => (
          <OfferCard
            key={offer.id}
            highlightLabel={index === 0 ? "Meilleur choix" : undefined}
            insight={
              index === 0
                ? bestOfferGain > 0
                  ? `Meilleure estimation : vous recevez ${formatMoney(bestOfferGain, comparison.receiveCurrency)} de plus que l'offre suivante.`
                  : "Meilleur équilibre entre montant reçu, frais et délai."
                : undefined
            }
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
  trustCard: {
    gap: spacing.sm
  },
  trustHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  trustTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  trustText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21
  },
  list: {
    gap: spacing.md
  }
});
