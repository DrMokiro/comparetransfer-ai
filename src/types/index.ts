export type CurrencyCode = string;

export type CountryCode = string;

export type Provider = {
  id: string;
  name: string;
  logo: string;
  countriesAvailable: CountryCode[];
  pros: string[];
  cons: string[];
  affiliateUrl: string;
};

export type Offer = {
  id: string;
  providerId: string;
  amountReceived: number;
  fee: number;
  exchangeRate: number;
  estimatedDelay: string;
  deliverySpeedHours: number;
  globalScore: number;
};

export type ComparisonInput = {
  amount: number;
  fromCountry: CountryCode;
  toCountry: CountryCode;
  sendCurrency: CurrencyCode;
  receiveCurrency: CurrencyCode;
};

export type OfferWithProvider = Offer & {
  provider: Provider;
};

export type RootStackParamList = {
  Home: undefined;
  Results: {
    comparison: ComparisonInput;
  };
  ProviderDetail: {
    providerId: string;
    comparison?: ComparisonInput;
  };
  Assistant: {
    comparison?: ComparisonInput;
  };
};
