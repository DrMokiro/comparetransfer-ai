import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { CountryOption, countries, getCurrencyLabel } from "../data/catalog";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { CountryCode } from "../types";

type CountrySelectProps = {
  label: string;
  value: CountryCode;
  onChange: (country: CountryOption) => void;
};

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function CountrySelect({ label, value, onChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selectedCountry = countries.find((country) => country.value === value) ?? countries[0];

  const filteredCountries = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim());

    if (!normalizedQuery) {
      return countries;
    }

    return countries.filter((country) => {
      const searchableText = normalizeSearch(
        `${country.label} ${country.value} ${country.currency} ${country.region}`
      );

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  function selectCountry(country: CountryOption) {
    onChange(country);
    setQuery("");
    setIsOpen(false);
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.trigger} onPress={() => setIsOpen(true)}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{selectedCountry.flag}</Text>
        </View>
        <View style={styles.triggerTextBlock}>
          <Text style={styles.countryName}>{selectedCountry.label}</Text>
          <Text style={styles.currencyText}>{getCurrencyLabel(selectedCountry.currency)}</Text>
        </View>
        <Ionicons name="chevron-down" size={20} color={colors.muted} />
      </Pressable>

      <Modal visible={isOpen} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>{label}</Text>
              <Text style={styles.modalSubtitle}>{filteredCountries.length} pays disponibles</Text>
            </View>
            <Pressable style={styles.closeButton} onPress={() => setIsOpen(false)}>
              <Ionicons name="close" size={24} color={colors.ink} />
            </Pressable>
          </View>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={colors.muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              autoFocus
              placeholder="Rechercher un pays, une devise..."
              placeholderTextColor={colors.muted}
              style={styles.searchInput}
            />
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.value}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const selected = item.value === selectedCountry.value;

              return (
                <Pressable
                  style={[styles.countryRow, selected && styles.selectedRow]}
                  onPress={() => selectCountry(item)}
                >
                  <View style={styles.codeBadge}>
                    <Text style={styles.codeText}>{item.flag}</Text>
                  </View>
                  <View style={styles.countryInfo}>
                    <Text style={styles.rowCountryName}>{item.label}</Text>
                    <Text style={styles.rowMeta}>{item.region} - {getCurrencyLabel(item.currency)}</Text>
                  </View>
                  {selected && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Aucun pays trouve</Text>
                <Text style={styles.emptyText}>Essayez avec le nom du pays, son code ou sa devise.</Text>
              </View>
            }
          />
        </View>
      </Modal>
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
  trigger: {
    minHeight: 62,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  codeBadge: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center"
  },
  codeText: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 13
  },
  triggerTextBlock: {
    flex: 1
  },
  countryName: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16
  },
  currencyText: {
    color: colors.muted,
    marginTop: 3
  },
  modal: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.lg
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md
  },
  modalTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  modalSubtitle: {
    color: colors.muted,
    marginTop: 3
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  searchBox: {
    marginHorizontal: spacing.md,
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  searchInput: {
    flex: 1,
    color: colors.ink,
    fontSize: 16
  },
  list: {
    padding: spacing.md,
    gap: spacing.sm
  },
  countryRow: {
    minHeight: 72,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  selectedRow: {
    borderColor: colors.primary,
    backgroundColor: "#F0FAF7"
  },
  countryInfo: {
    flex: 1
  },
  rowCountryName: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16
  },
  rowMeta: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 19
  },
  emptyState: {
    alignItems: "center",
    padding: spacing.xl,
    gap: spacing.sm
  },
  emptyTitle: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 18
  },
  emptyText: {
    color: colors.muted,
    textAlign: "center"
  }
});
