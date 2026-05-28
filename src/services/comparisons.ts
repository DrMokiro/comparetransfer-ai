import { ComparisonInput } from "../types";
import { supabase } from "./supabase";

export async function saveComparison(comparison: ComparisonInput) {
  if (!supabase) {
    return { saved: false, reason: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("comparisons")
    .insert({
      amount: comparison.amount,
      from_country: comparison.fromCountry,
      to_country: comparison.toCountry,
      send_currency: comparison.sendCurrency,
      receive_currency: comparison.receiveCurrency
    });

  if (error) {
    console.warn("Unable to save comparison", error.message);
    return { saved: false, reason: error.message };
  }

  return { saved: true };
}
