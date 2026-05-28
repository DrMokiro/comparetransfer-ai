import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { CountrySelect } from "../components/CountrySelect";
import { CurrencyPreview } from "../components/CurrencyPreview";
import { FormField } from "../components/FormField";
import { defaultComparison } from "../data/mockComparisons";
import { useLanguage } from "../i18n/LanguageContext";
import { saveComparison } from "../services/comparisons";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { CountryCode, CurrencyCode, RootStackParamList } from "../types";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(String(defaultComparison.amount));
  const [fromCountry, setFromCountry] = useState<CountryCode>(defaultComparison.fromCountry);
  const [toCountry, setToCountry] = useState<CountryCode>(defaultComparison.toCountry);
  const [sendCurrency, setSendCurrency] = useState<CurrencyCode>(defaultComparison.sendCurrency);
  const [receiveCurrency, setReceiveCurrency] = useState<CurrencyCode>(defaultComparison.receiveCurrency);

  function compareOffers() {
    const comparison = {
      amount: Number(amount) || defaultComparison.amount,
      fromCountry,
      toCountry,
      sendCurrency,
      receiveCurrency
    };

    saveComparison(comparison);

    navigation.navigate("Results", {
      comparison
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.kicker}>{t("home.kicker")}</Text>
          <Text style={styles.title}>{t("home.title")}</Text>
          <Text style={styles.subtitle}>{t("home.subtitle")}</Text>
        </View>

        <AppCard style={styles.formCard}>
          <FormField
            label={t("home.amount")}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="1000"
          />

          <CountrySelect
            label={t("home.fromCountry")}
            value={fromCountry}
            onChange={(country) => {
              setFromCountry(country.value);
              setSendCurrency(country.currency);
            }}
          />

          <CountrySelect
            label={t("home.toCountry")}
            value={toCountry}
            onChange={(country) => {
              setToCountry(country.value);
              setReceiveCurrency(country.currency);
            }}
          />

          <View style={styles.currencyGrid}>
            <CurrencyPreview label={t("home.sendCurrency")} value={sendCurrency} />
            <CurrencyPreview label={t("home.receiveCurrency")} value={receiveCurrency} />
          </View>

          <AppButton
            label={t("home.compare")}
            icon={<Ionicons name="analytics-outline" size={20} color={colors.surface} />}
            onPress={compareOffers}
          />
        </AppCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.lg
  },
  hero: {
    paddingTop: spacing.sm,
    gap: spacing.sm
  },
  kicker: {
    color: colors.primary,
    fontWeight: "800",
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 0
  },
  title: {
    color: colors.ink,
    fontSize: typography.title,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 23
  },
  formCard: {
    gap: spacing.lg
  },
  currencyGrid: {
    gap: spacing.md
  }
});
