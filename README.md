# CompareTransfer AI

Application Expo / React Native pour comparer des services d'envoi d'argent international.

Le projet est un MVP avance : il fonctionne en local sur web/mobile, calcule des offres estimees, recupere des taux de change via Frankfurter quand c'est disponible, et enregistre les comparaisons dans Supabase.

## Ce qui fonctionne deja

- Formulaire de comparaison : montant, pays de depart, pays de destination, devise envoyee et devise recue.
- Resultats classes par prestataire avec montant recu, frais, taux, delai et score.
- Detail prestataire avec avantages, inconvenients, pays disponibles et lien affilie.
- Assistant local pour aider l'utilisateur a comprendre les offres.
- Selecteur de langue global : francais, anglais, espagnol, arabe, chinois, japonais, vietnamien, coreen.
- Taux de change Frankfurter avec fallback local si l'API ne repond pas.
- Enregistrement des comparaisons dans Supabase.
- Schema SQL Supabase avec RLS de base.

## Limites importantes du MVP

- Les frais prestataires sont estimes a partir de regles locales, pas encore recuperes depuis les API officielles Wise, Remitly, Western Union, etc.
- Les liens affilies sont des placeholders ou liens generiques selon les prestataires.
- L'assistant est local et regle, pas encore connecte a une IA distante.
- Il n'y a pas encore de compte utilisateur, historique personnel, paiement, ni verification d'identite.
- Les textes principaux sont traduits, mais certains contenus metiers restent a internationaliser.

## Architecture

```text
src/
  components/      Composants UI reutilisables
  data/            Catalogues pays/devises et donnees locales
  i18n/            Langues et traductions
  navigation/      Navigation entre les ecrans
  screens/         Ecrans principaux
  services/        Supabase, taux de change, offres, assistant
  theme/           Couleurs, espacements, typographie
  types/           Types TypeScript partages
  utils/           Formatage montants/taux

supabase/
  schema.sql       Tables users, providers, comparisons, offers + politiques RLS
```

## Installation locale

```bash
npm install
```

Sur Windows PowerShell, utilisez plutot `npm.cmd` si `npm` est bloque par la politique d'execution :

```powershell
npm.cmd install
```

## Variables d'environnement

Creer un fichier `.env` a la racine du projet :

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Ne jamais commit le fichier `.env`. Le fichier `.env.example` sert uniquement de modele.

## Lancement en local

```powershell
npm.cmd run web
```

Expo affiche ensuite une URL locale, par exemple :

```text
http://localhost:8082
```

Pour mobile, lancer :

```powershell
npm.cmd run start
```

Puis scanner le QR code avec Expo Go.

## Verification rapide

```powershell
npm.cmd run typecheck
npm.cmd run export:web
```

Checklist manuelle :

- Ouvrir la page d'accueil.
- Saisir un montant.
- Choisir un pays de depart et un pays de destination.
- Cliquer sur Comparer.
- Verifier que les resultats affichent les taux, frais et montants recus.
- Verifier que la mention de taux/frais est visible.
- Ouvrir un detail prestataire.
- Changer de langue depuis le bouton en haut.
- Verifier dans Supabase que la table `comparisons` recoit une nouvelle ligne.

## Supabase

1. Creer un projet Supabase.
2. Recuperer l'URL du projet et la cle `anon public`.
3. Les mettre dans `.env`.
4. Executer le contenu de `supabase/schema.sql` dans le SQL Editor Supabase.
5. Verifier que les tables `users`, `providers`, `comparisons` et `offers` existent.

## Priorites suivantes

- Clarifier encore plus dans l'interface que les frais prestataires sont estimes.
- Ajouter un vrai feedback utilisateur quand une comparaison est bien enregistree ou echoue.
- Ajouter des tests de base et une checklist QA stable.
- Finaliser l'internationalisation des ecrans detail et assistant.
- Preparer une strategie de deploiement web et mobile.
- Remplacer les donnees de simulation par des integrations partenaires ou APIs officielles quand elles seront disponibles.
