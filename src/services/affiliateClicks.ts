import { ComparisonInput, Provider } from "../types";
import { supabase } from "./supabase";

const TRACKING_TIMEOUT_MS = 1200;

type TrackAffiliateClickInput = {
  comparison?: ComparisonInput;
  provider: Provider;
  source?: "provider_detail";
};

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | { tracked: false; reason: string }> {
  return Promise.race([
    promise,
    new Promise<{ tracked: false; reason: string }>((resolve) => {
      setTimeout(() => resolve({ tracked: false, reason: "Tracking timeout" }), timeoutMs);
    })
  ]);
}

export async function trackAffiliateClick({ comparison, provider, source = "provider_detail" }: TrackAffiliateClickInput) {
  if (!supabase) {
    return { tracked: false, reason: "Supabase is not configured" };
  }

  const client = supabase;

  const insertClick = async () => {
    const { error } = await client
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

    return error;
  };

  const error = await withTimeout(insertClick(), TRACKING_TIMEOUT_MS);

  if (error && "message" in error) {
    console.warn("Unable to track affiliate click", error.message);
    return { tracked: false, reason: error.message };
  }

  if (error && "reason" in error) {
    console.warn("Unable to track affiliate click", error.reason);
    return error;
  }

  return { tracked: true };
}
