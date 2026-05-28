import { Provider } from "../types";

export const mockProviders: Provider[] = [
  {
    id: "wise",
    name: "Wise",
    logo: "W",
    countriesAvailable: ["FR", "US", "GB", "IN", "CA", "MA"],
    pros: ["Taux de change proche du marché", "Frais transparents", "Expérience mobile fluide"],
    cons: ["Retrait cash limité", "Vérification requise sur certains corridors"],
    affiliateUrl: "https://wise.com"
  },
  {
    id: "remitly",
    name: "Remitly",
    logo: "R",
    countriesAvailable: ["FR", "US", "GB", "SN", "MA", "IN"],
    pros: ["Options express", "Bon réseau de retrait", "Promotions fréquentes"],
    cons: ["Frais variables", "Taux moins compétitif en livraison rapide"],
    affiliateUrl: "https://www.remitly.com"
  },
  {
    id: "western-union",
    name: "Western Union",
    logo: "WU",
    countriesAvailable: ["FR", "US", "GB", "SN", "MA", "IN", "CA"],
    pros: ["Très large couverture pays", "Retrait cash disponible", "Marque reconnue"],
    cons: ["Frais parfois élevés", "Taux de change moins lisible"],
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
