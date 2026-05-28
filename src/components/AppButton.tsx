import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type AppButtonProps = {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
  onPress: () => void;
};

export function AppButton({ label, icon, disabled = false, variant = "primary", style, onPress }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
    >
      {icon}
      <Text style={[styles.label, variant !== "primary" && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border
  },
  ghost: {
    backgroundColor: "transparent"
  },
  pressed: {
    opacity: 0.82
  },
  disabled: {
    opacity: 0.55
  },
  label: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryLabel: {
    color: colors.ink
  }
});
