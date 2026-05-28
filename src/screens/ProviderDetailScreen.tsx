import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { BrandText } from "../components/BrandText";
import { ProviderLogo } from "../components/ProviderLogo";
import { trackAffiliateClick } from "../services/affiliateClicks";
import { getProviderById } from "../services/offers";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { RootStackParamList } from "../types";

type ProviderDetailScreenProps = NativeStackScreenProps<RootStackParamList, "ProviderDetail">;

export function ProviderDetailScreen({ route }: ProviderDetailScreenProps) {
  const provider = getProviderById(route.params.providerId);
  const comparison = route.params.comparison;
  const [isLeaving, setIsLeaving] = useState(false);

  if (!provider) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.title}>Prestataire introuvable</Text>
      </View>
    );
  }

  async function continueToProvider() {
    if (!provider || isLeaving) {
      return;
    }

    setIsLeaving(true);

    try {
      await trackAffiliateClick({ comparison, provider });
      await Linking.openURL(provider.affiliateUrl);
    } finally {
      setIsLeaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <ProviderLogo label={provider.logo} />
        <View style={styles.headerText}>
          <BrandText style={styles.title}>{provider.name}</BrandText>
          <Text style={styles.subtitle}>Analyse détaillée du prestataire</Text>
        </View>
      </View>

      <AppCard style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          <Text style={styles.noticeTitle}>Données indicatives</Text>
        </View>
        <Text style={styles.body}>
          Cette fiche vous aide à comparer les points forts et les limites du prestataire.
          Le montant final, les frais exacts et les conditions seront confirmés sur le site de {provider.name}.
        </Text>
      </AppCard>

      <AppCard style={styles.section}>
        <Text style={styles.sectionTitle}>Avantages</Text>
        {provider.pros.map((item) => (
          <Text key={item} style={styles.positiveItem}>+ {item}</Text>
        ))}
      </AppCard>

      <AppCard style={styles.section}>
        <Text style={styles.sectionTitle}>Inconvénients</Text>
        {provider.cons.map((item) => (
          <Text key={item} style={styles.negativeItem}>- {item}</Text>
        ))}
      </AppCard>

      <AppCard style={styles.section}>
        <Text style={styles.sectionTitle}>Pays disponibles</Text>
        <Text style={styles.body}>{provider.countriesAvailable.join(", ")}</Text>
      </AppCard>

      <Text style={styles.footerNote}>
        En continuant, vous quittez CompareTransfer AI. Vérifiez toujours les frais, le taux et le délai avant de valider.
      </Text>

      <AppButton
        label={isLeaving ? "Ouverture..." : `Continuer vers ${provider.name}`}
        onPress={continueToProvider}
        disabled={isLeaving}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    gap: spacing.md,
    maxWidth: 960,
    padding: spacing.md,
    paddingBottom: spacing.xl,
    width: "100%"
  },
  emptyState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: spacing.md
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md
  },
  headerText: {
    flex: 1
  },
  title: {
    color: colors.ink,
    fontSize: typography.heading,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    marginTop: spacing.xs
  },
  noticeCard: {
    gap: spacing.sm
  },
  noticeHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  noticeTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  section: {
    gap: spacing.sm
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800"
  },
  positiveItem: {
    color: colors.success,
    lineHeight: 22
  },
  negativeItem: {
    color: colors.warning,
    lineHeight: 22
  },
  body: {
    color: colors.text,
    lineHeight: 22
  },
  footerNote: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  }
});
