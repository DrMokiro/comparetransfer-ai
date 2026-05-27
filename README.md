# CompareTransfer AI

Application mobile MVP en React Native avec Expo pour comparer les services d'envoi d'argent a l'international.

## Fonctionnalites incluses

- Formulaire de comparaison: montant, pays de depart, pays de destination, devise envoyee et devise recue.
- Liste de resultats avec prestataires, frais, taux de change, delai, montant recu et score global.
- Page detail prestataire avec avantages, inconvenients, pays disponibles et lien affilie.
- Assistant IA local capable de repondre aux questions MVP sur l'offre la moins chere et la plus rapide.
- Donnees fictives locales pour fonctionner sans API.
- Schema SQL Supabase pret a adapter dans `supabase/schema.sql`.

## Architecture

```text
src/
  components/      Composants UI reutilisables
  data/            Catalogues et donnees mockees
  navigation/      Navigation native stack
  screens/         Ecrans principaux du MVP
  services/        Logique metier locale
  theme/           Couleurs, espacements, typographie
  types/           Types TypeScript partages
  utils/           Helpers de formatage
supabase/
  schema.sql       Tables users, comparisons, providers, offers
```

## Lancement

```bash
npm install
npm run start
```

Puis ouvrez l'application avec Expo Go, un simulateur iOS/Android ou la cible web d'Expo.

## Prochaines etapes conseillees

- Ajouter `@supabase/supabase-js` et une couche `src/services/supabase.ts`.
- Remplacer les logos texte par des assets image.
- Persister les comparaisons utilisateur.
- Connecter l'assistant a un vrai modele IA avec un endpoint backend securise.
