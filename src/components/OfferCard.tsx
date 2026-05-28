import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppCard } from "./AppCard";
import { BrandText } from "./BrandText";
import { ProviderLogo } from "./ProviderLogo";
import { ScoreBadge } from "./ScoreBadge";
import { useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { OfferWithProvider } from "../types";
import { formatExchangeRate, formatMoney } from "../utils/format";

type OfferCardProps = {
  highlightLabel?: string;
  insight?: string;
  offer: OfferWithProvider;
  receiveCurrency: string;
  sendCurrency: string;
  onPress: () => void;
};

export function OfferCard({ highlightLabel, insight, offer, receiveCurrency, sendCurrency, onPress }: OfferCardProps) {
  const { t } = useLanguage();

  return (
    <AppCard style={styles.card}>
      {highlightLabel ? (
        <View style={styles.highlightBadge}>
          <Ionicons name="trophy-outline" size={15} color={colors.primaryDark} />
          <Text style={styles.highlightText}>{highlightLabel}</Text>
        </View>
      ) : null}

      <View style={styles.header}>
        <ProviderLogo label={offer.provider.logo} />
        <View style={styles.titleBlock}>
          <BrandText style={styles.providerName}>{offer.provider.name}</BrandText>
          <Text style={styles.delay}>{offer.estimatedDelay}</Text>
        </View>
        <ScoreBadge score={offer.globalScore} />
      </View>

      <View style={styles.metrics}>
        <View>
          <Text style={styles.metricLabel}>{t("offer.received")}</Text>
          <Text style={styles.amount}>{formatMoney(offer.amountReceived, receiveCurrency)}</Text>
        </View>
        <View style={styles.metricRight}>
          <Text style={styles.metricLabel}>{t("offer.fees")}</Text>
          <Text style={styles.metricValue}>{formatMoney(offer.fee, sendCurrency)}</Text>
        </View>
      </View>

      {insight ? <Text style={styles.insight}>{insight}</Text> : null}

      <View style={styles.rateRow}>
        <Ionicons name="swap-horizontal" size={18} color={colors.accent} />
        <Text style={styles.rateText}>{formatExchangeRate(offer.exchangeRate, sendCurrency, receiveCurrency)}</Text>
      </View>

      <AppButton label={t("offer.viewOffer")} onPress={onPress} />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md
  },
  highlightBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: "#E6F4EF",
    borderColor: "#B9DED1",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6
  },
  highlightText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "800"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  titleBlock: {
    flex: 1
  },
  providerName: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 18
  },
  delay: {
    color: colors.muted,
    marginTop: 2
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  metricRight: {
    alignItems: "flex-end"
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: spacing.xs
  },
  amount: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "800"
  },
  metricValue: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "700"
  },
  insight: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20
  },
  rateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 12,
    padding: spacing.sm
  },
  rateText: {
    color: colors.text,
    fontWeight: "600"
  }
});
