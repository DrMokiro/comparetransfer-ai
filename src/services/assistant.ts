import { getBestValueOffer, getFastestOffer } from "./offers";
import { OfferWithProvider } from "../types";

export function answerAssistantQuestion(question: string, offers: OfferWithProvider[]) {
  const normalizedQuestion = question.toLowerCase();

  if (normalizedQuestion.includes("moins cher") || normalizedQuestion.includes("chere")) {
    const bestOffer = getBestValueOffer(offers);
    return `${bestOffer.provider.name} est l'option la moins chere avec ${bestOffer.fee.toFixed(2)} EUR de frais.`;
  }

  if (normalizedQuestion.includes("rapide")) {
    const fastestOffer = getFastestOffer(offers);
    return `${fastestOffer.provider.name} est l'option la plus rapide avec un delai estime: ${fastestOffer.estimatedDelay}.`;
  }

  const topOffer = offers[0];
  return `Pour ce transfert, ${topOffer.provider.name} a le meilleur score global (${topOffer.globalScore}/100).`;
}
