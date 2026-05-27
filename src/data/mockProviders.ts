import { Provider } from "../types";

export const mockProviders: Provider[] = [
  {
    id: "wise",
    name: "Wise",
    logo: "W",
    countriesAvailable: ["FR", "US", "GB", "IN", "CA", "MA"],
    pros: ["Taux de change proche du marche", "Frais transparents", "Experience mobile fluide"],
    cons: ["Retrait cash limite", "Verification requise sur certains corridors"],
    affiliateUrl: "https://wise.com"
  },
  {
    id: "remitly",
    name: "Remitly",
    logo: "R",
    countriesAvailable: ["FR", "US", "GB", "SN", "MA", "IN"],
    pros: ["Options express", "Bon reseau de retrait", "Promotions frequentes"],
    cons: ["Frais variables", "Taux moins competitif en livraison rapide"],
    affiliateUrl: "https://www.remitly.com"
  },
  {
    id: "western-union",
    name: "Western Union",
    logo: "WU",
    countriesAvailable: ["FR", "US", "GB", "SN", "MA", "IN", "CA"],
    pros: ["Tres large couverture pays", "Retrait cash disponible", "Marque reconnue"],
    cons: ["Frais parfois eleves", "Taux de change moins lisible"],
    affiliateUrl: "https://www.westernunion.com"
  },
  {
    id: "worldremit",
    name: "WorldRemit",
    logo: "WR",
    countriesAvailable: ["FR", "US", "GB", "SN", "MA", "IN", "CA"],
    pros: ["Mobile money disponible", "Livraison rapide", "Bonne couverture Afrique"],
    cons: ["Plafonds selon le pays", "Support parfois variable"],
    affiliateUrl: "https://www.worldremit.com"
  }
];
