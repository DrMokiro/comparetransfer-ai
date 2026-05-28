import { Provider } from "../types";
import { supabase } from "./supabase";

type TrackAffiliateClickInput = {
  provider: Provider;
  source?: "provider_detail";
};

export async function trackAffiliateClick({ provider, source = "provider_detail" }: TrackAffiliateClickInput) {
  if (!supabase) {
    return { tracked: false, reason: "Supabase is not configured" };
  }

  const { error } = await supabase
    .from("affiliate_clicks")
    .insert({
      affiliate_url: provider.affiliateUrl,
      provider_id: provider.id,
      provider_name: provider.name,
      source
    });

  if (error) {
    console.warn("Unable to track affiliate click", error.message);
    return { tracked: false, reason: error.message };
  }

  return { tracked: true };
}
