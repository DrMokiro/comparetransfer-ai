import { getApproximateExchangeRate } from "../data/exchangeRates";
import { CurrencyCode } from "../types";

const FRANKFURTER_API_URL = "https://api.frankfurter.dev";
const EXCHANGE_RATE_TIMEOUT_MS = 2500;

export type ExchangeRateResult = {
  date?: string;
  isFallback: boolean;
  rate: number;
  source: "Frankfurter" | "Taux local";
};

type FrankfurterLatestResponse = {
  base?: string;
  date?: string;
  quote?: string;
  rate?: number;
};

export function getFallbackExchangeRate(sendCurrency: CurrencyCode, receiveCurrency: CurrencyCode): ExchangeRateResult {
  return {
    isFallback: true,
    rate: getApproximateExchangeRate(sendCurrency, receiveCurrency),
    source: "Taux local"
  };
}

export async function getExchangeRate(
  sendCurrency: CurrencyCode,
  receiveCurrency: CurrencyCode
): Promise<ExchangeRateResult> {
  if (sendCurrency === receiveCurrency) {
    return {
      isFallback: false,
      rate: 1,
      source: "Frankfurter"
    };
  }

  try {
    const endpoint = `${FRANKFURTER_API_URL}/v2/rate/${encodeURIComponent(sendCurrency)}/${encodeURIComponent(receiveCurrency)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), EXCHANGE_RATE_TIMEOUT_MS);
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return getFallbackExchangeRate(sendCurrency, receiveCurrency);
    }

    const data = await response.json() as FrankfurterLatestResponse;
    const liveRate = data.rate;

    if (!Number.isFinite(liveRate) || !liveRate || liveRate <= 0) {
      return getFallbackExchangeRate(sendCurrency, receiveCurrency);
    }

    return {
      date: data.date,
      isFallback: false,
      rate: liveRate,
      source: "Frankfurter"
    };
  } catch {
    return getFallbackExchangeRate(sendCurrency, receiveCurrency);
  }
}
