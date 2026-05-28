export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      maximumFractionDigits: ["BIF", "CLP", "DJF", "GNF", "ISK", "JPY", "KMF", "KRW", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF"].includes(currency) ? 0 : 2
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("fr-FR")} ${currency}`;
  }
}

function formatRateValue(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: value >= 100 ? 0 : value >= 1 ? 2 : 4,
    minimumFractionDigits: value >= 100 ? 0 : value >= 1 ? 2 : 4
  }).format(value);
}

export function formatExchangeRate(rate: number, sendCurrency: string, receiveCurrency: string) {
  if (!Number.isFinite(rate) || rate <= 0) {
    return `Taux indisponible`;
  }

  if (rate >= 0.01) {
    return `1 ${sendCurrency} = ${formatRateValue(rate)} ${receiveCurrency}`;
  }

  const referenceAmount = rate >= 0.001 ? 100 : rate >= 0.0001 ? 1000 : 10000;
  const convertedAmount = referenceAmount * rate;

  return `${referenceAmount.toLocaleString("fr-FR")} ${sendCurrency} = ${formatRateValue(convertedAmount)} ${receiveCurrency}`;
}
