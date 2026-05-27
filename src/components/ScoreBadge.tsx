import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type ScoreBadgeProps = {
  score: number;
};

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const color = score >= 90 ? colors.success : score >= 85 ? colors.warning : colors.danger;

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.score, { color }]}>{score}</Text>
      <Text style={styles.label}>/100</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    flexDirection: "row",
    alignItems: "baseline"
  },
  score: {
    fontWeight: "800",
    fontSize: 16
  },
  label: {
    color: colors.muted,
    fontSize: 12
  }
});
