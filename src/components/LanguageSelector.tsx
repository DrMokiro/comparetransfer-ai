import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { languages, useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const selectedLanguage = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [styles.trigger, pressed && styles.pressed]}
        onPress={() => setIsOpen(true)}
      >
        <Ionicons name="globe-outline" size={19} color={colors.ink} />
        <Text style={styles.triggerText}>{selectedLanguage.code.toUpperCase()}</Text>
      </Pressable>

      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.title}>{t("language.title")}</Text>
            <ScrollView contentContainerStyle={styles.languageList}>
              {languages.map((item) => {
                const selected = item.code === language;

                return (
                  <Pressable
                    key={item.code}
                    style={[styles.languageRow, selected && styles.selectedRow]}
                    onPress={() => {
                      setLanguage(item.code);
                      setIsOpen(false);
                    }}
                  >
                    <View>
                      <Text style={styles.languageName}>{item.nativeLabel}</Text>
                      <Text style={styles.languageMeta}>{item.label}</Text>
                    </View>
                    {selected && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    flexDirection: "row",
    gap: 6
  },
  triggerText: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 13
  },
  pressed: {
    opacity: 0.82
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(19, 41, 47, 0.26)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: spacing.md,
    paddingTop: 72
  },
  sheet: {
    width: 280,
    maxHeight: "82%",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm
  },
  languageList: {
    gap: spacing.sm
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: spacing.xs
  },
  languageRow: {
    minHeight: 62,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  selectedRow: {
    borderColor: colors.primary,
    backgroundColor: "#F0FAF7"
  },
  languageName: {
    color: colors.ink,
    fontWeight: "800"
  },
  languageMeta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2
  }
});
