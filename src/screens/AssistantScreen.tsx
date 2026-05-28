import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { defaultComparison } from "../data/mockComparisons";
import { answerAssistantQuestion } from "../services/assistant";
import { getExchangeRate } from "../services/exchangeRates";
import { getOffersForComparison } from "../services/offers";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { RootStackParamList } from "../types";

type AssistantScreenProps = NativeStackScreenProps<RootStackParamList, "Assistant">;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const quickQuestions = [
  "Quelle est l'option la moins chere ?",
  "Quelle est l'option la plus rapide ?"
];

export function AssistantScreen({ route }: AssistantScreenProps) {
  const comparison = route.params?.comparison ?? defaultComparison;
  const [exchangeRate, setExchangeRate] = useState<number | undefined>();
  const offers = useMemo(() => getOffersForComparison(comparison, exchangeRate), [comparison, exchangeRate]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Bonjour, je peux comparer les offres selon les frais, la vitesse ou le score global."
    }
  ]);

  useEffect(() => {
    let isMounted = true;

    getExchangeRate(comparison.sendCurrency, comparison.receiveCurrency).then((rateInfo) => {
      if (isMounted) {
        setExchangeRate(rateInfo.rate);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [comparison.receiveCurrency, comparison.sendCurrency]);

  function sendMessage(text = input) {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const answer = answerAssistantQuestion(trimmedText, offers);

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, role: "user", text: trimmedText },
      { id: `assistant-${Date.now()}`, role: "assistant", text: answer }
    ]);
    setInput("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <AppCard style={styles.contextCard}>
          <Text style={styles.contextTitle}>Assistant CompareTransfer</Text>
          <Text style={styles.contextText}>
            Les réponses utilisent les données fictives du MVP pour cette simulation.
          </Text>
        </AppCard>

        <View style={styles.quickActions}>
          {quickQuestions.map((question) => (
            <AppButton
              key={question}
              label={question}
              variant="secondary"
              onPress={() => sendMessage(question)}
            />
          ))}
        </View>

        <View style={styles.messages}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.role === "user" ? styles.userBubble : styles.assistantBubble
              ]}
            >
              <Text style={[
                styles.messageText,
                message.role === "user" && styles.userMessageText
              ]}>
                {message.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.composer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Posez une question..."
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <AppButton
          label="Envoyer"
          icon={<Ionicons name="send" size={18} color={colors.surface} />}
          onPress={() => sendMessage()}
          style={styles.sendButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md
  },
  contextCard: {
    gap: spacing.sm
  },
  contextTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  contextText: {
    color: colors.text,
    lineHeight: 22
  },
  quickActions: {
    gap: spacing.sm
  },
  messages: {
    gap: spacing.sm
  },
  messageBubble: {
    maxWidth: "88%",
    borderRadius: 18,
    padding: spacing.md
  },
  assistantBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: "flex-start"
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end"
  },
  messageText: {
    color: colors.text,
    lineHeight: 22
  },
  userMessageText: {
    color: colors.surface,
    fontWeight: "600"
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background
  },
  input: {
    flex: 1,
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    color: colors.ink
  },
  sendButton: {
    minWidth: 116
  }
});
