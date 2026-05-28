import { getApproximateExchangeRate } from "../data/exchangeRates";
import { mockProviders } from "../data/mockProviders";
import { ComparisonInput, Offer, OfferWithProvider } from "../types";

type ProviderPricingRule = {
  providerId: string;
  fixedFee: number;
  variableFeeRate: number;
  exchangeMarginRate: number;
  estimatedDelay: string;
  deliverySpeedHours: number;
  reliabilityScore: number;
};

const providerPricingRules: ProviderPricingRule[] = [
  {
    providerId: "wise",
    fixedFee: 1.2,
    variableFeeRate: 0.0048,
    exchangeMarginRate: 0.002,
    estimatedDelay: "Quelques minutes",
    deliverySpeedHours: 1,
    reliabilityScore: 97
  },
  {
    providerId: "remitly",
    fixedFee: 2.99,
    variableFeeRate: 0.0035,
    exchangeMarginRate: 0.006,
    estimatedDelay: "Instantane",
    deliverySpeedHours: 0.25,
    reliabilityScore: 92
  },
  {
    providerId: "western-union",
    fixedFee: 5.9,
    variableFeeRate: 0.0075,
    exchangeMarginRate: 0.012,
    estimatedDelay: "10 minutes",
    deliverySpeedHours: 0.5,
    reliabilityScore: 88
  },
  {
    providerId: "worldremit",
    fixedFee: 3.49,
    variableFeeRate: 0.0045,
    exchangeMarginRate: 0.008,
    estimatedDelay: "Moins d'une heure",
    deliverySpeedHours: 1,
    reliabilityScore: 90
  }
];

function roundAmount(amount: number, currency: string) {
  const zeroDecimalCurrencies = ["BIF", "CLP", "DJF", "GNF", "ISK", "JPY", "KMF", "KRW", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF"];

  return zeroDecimalCurrencies.includes(currency) ? Math.round(amount) : Math.round(amount * 100) / 100;
}

function calculateGlobalScore(rule: ProviderPricingRule, fee: number, amount: number, receivedRatio: number) {
  const feeScore = Math.max(0, 100 - (fee / Math.max(amount, 1)) * 450);
  const speedScore = Math.max(70, 100 - rule.deliverySpeedHours * 8);
  const rateScore = Math.min(100, 82 + receivedRatio * 18);

  return Math.round(feeScore * 0.32 + speedScore * 0.24 + rateScore * 0.24 + rule.reliabilityScore * 0.2);
}

function buildOffer(comparison: ComparisonInput, rule: ProviderPricingRule, baseRate: number): Offer | null {
  if (!Number.isFinite(baseRate) || baseRate <= 0) {
    return null;
  }

  const fee = roundAmount(rule.fixedFee + comparison.amount * rule.variableFeeRate, comparison.sendCurrency);
  const amountAfterFee = Math.max(comparison.amount - fee, 0);
  const providerRate = baseRate * (1 - rule.exchangeMarginRate);
  const amountReceived = roundAmount(amountAfterFee * providerRate, comparison.receiveCurrency);
  const idealReceived = Math.max(comparison.amount * baseRate, 1);
  const receivedRatio = amountReceived / idealReceived;

  return {
    id: `offer-${rule.providerId}`,
    providerId: rule.providerId,
    amountReceived,
    fee,
    exchangeRate: providerRate,
    estimatedDelay: rule.estimatedDelay,
    deliverySpeedHours: rule.deliverySpeedHours,
    globalScore: calculateGlobalScore(rule, fee, comparison.amount, receivedRatio)
  };
}

export function getOffersForComparison(comparison: ComparisonInput, exchangeRate?: number): OfferWithProvider[] {
  const baseRate = exchangeRate ?? getApproximateExchangeRate(comparison.sendCurrency, comparison.receiveCurrency);

  return providerPricingRules
    .map((rule) => {
      const provider = mockProviders.find((item) => item.id === rule.providerId);
      const offer = buildOffer(comparison, rule, baseRate);

      if (!provider || !offer) {
        return null;
      }

      return { ...offer, provider };
    })
    .filter((offer): offer is OfferWithProvider => Boolean(offer))
    .sort((left, right) => right.globalScore - left.globalScore);
}

export function getProviderById(providerId: string) {
  return mockProviders.find((provider) => provider.id === providerId);
}

export function getBestValueOffer(offers: OfferWithProvider[]) {
  return [...offers].sort((left, right) => left.fee - right.fee)[0];
}

export function getFastestOffer(offers: OfferWithProvider[]) {
  return [...offers].sort((left, right) => left.deliverySpeedHours - right.deliverySpeedHours)[0];
}
