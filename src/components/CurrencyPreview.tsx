import { StyleSheet, Text, View } from "react-native";
import { getCurrencyLabel } from "../data/catalog";
import { useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { CurrencyCode } from "../types";

type CurrencyPreviewProps = {
  label: string;
  value: CurrencyCode;
};

export function CurrencyPreview({ label, value }: CurrencyPreviewProps) {
  const { t } = useLanguage();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{value}</Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.value}>{getCurrencyLabel(value)}</Text>
          <Text style={styles.helper}>{t("currency.autoDetected")}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm
  },
  label: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 14
  },
  field: {
    minHeight: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  badge: {
    minWidth: 54,
    height: 34,
    borderRadius: 999,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: "900"
  },
  textBlock: {
    flex: 1
  },
  value: {
    color: colors.ink,
    fontWeight: "800"
  },
  helper: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2
  }
});
