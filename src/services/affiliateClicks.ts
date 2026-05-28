import { ComparisonInput, Provider } from "../types";
import { supabase } from "./supabase";

type TrackAffiliateClickInput = {
  comparison?: ComparisonInput;
  provider: Provider;
  source?: "provider_detail";
};

export async function trackAffiliateClick({ comparison, provider, source = "provider_detail" }: TrackAffiliateClickInput) {
  if (!supabase) {
    return { tracked: false, reason: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("affiliate_clicks")
    .insert({
      affiliate_url: provider.affiliateUrl,
      amount: comparison?.amount,
      from_country: comparison?.fromCountry,
      provider_id: provider.id,
      provider_name: provider.name,
      receive_currency: comparison?.receiveCurrency,
      send_currency: comparison?.sendCurrency,
      to_country: comparison?.toCountry,
      source
    });

  if (error) {
    console.warn("Unable to track affiliate click", error.message);
    return { tracked: false, reason: error.message };
  }

  return { tracked: true };
}
