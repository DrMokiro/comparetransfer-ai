import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type ProviderLogoProps = {
  label: string;
};

export function ProviderLogo({ label }: ProviderLogoProps) {
  return (
    <View style={styles.logo}>
      <Text style={styles.logoText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted
  },
  logoText: {
    color: colors.primaryDark,
    fontWeight: "800"
  }
});
