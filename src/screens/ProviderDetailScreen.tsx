import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { BrandText } from "../components/BrandText";
import { ProviderLogo } from "../components/ProviderLogo";
import { getProviderById } from "../services/offers";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { RootStackParamList } from "../types";

type ProviderDetailScreenProps = NativeStackScreenProps<RootStackParamList, "ProviderDetail">;

export function ProviderDetailScreen({ route }: ProviderDetailScreenProps) {
  const provider = getProviderById(route.params.providerId);

  if (!provider) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.title}>Prestataire introuvable</Text>
      </View>
    );
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

      <AppButton label="Ouvrir le lien affilié" onPress={() => Linking.openURL(provider.affiliateUrl)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
  }
});
