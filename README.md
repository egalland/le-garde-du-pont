# Le garde du pont · version 1

Mini-jeu français de négociation, créé en TypeScript. Une partie dure environ 2 à 5 minutes. L'histoire et ses personnages sont fictifs. Aucun compte, IA de conversation, achat réel ni service externe.

## Jouer

Ouvrir `dist/index.html` dans un navigateur récent. L'image, le style et le jeu sont intégrés dans un seul fichier : aucune connexion requise pour jouer.

Pour publier le jeu sur un hébergement statique, déposer `dist/index.html` comme page d'accueil. Le dépôt contient le jeu compilé, prêt pour un hébergement statique. Aucun hébergement n’est activé automatiquement.

## Règles

Vous arrivez avec 12 pièces et 1 fromage. Bröm demande 12 pièces pour traverser. Les choix peuvent modifier confiance (0 à 5), colère (0 à 3), ressources et branche narrative. La patience affichée est 3 moins la colère. À trois points de colère, le pont se ferme. Les excuses rendent un point de patience. Les objets donnés et pièces payées sont consommés.

Cinq issues : payer, devenir ami, résoudre l'énigme, partir, se faire refuser le passage. Aucun résultat aléatoire. Les fins découvertes restent conservées après une nouvelle partie. L'historique conserve les 100 derniers choix afin de limiter la taille de la sauvegarde.

## Sauvegarde

IndexedDB conserve automatiquement la négociation et les fins découvertes, dans le même navigateur et sur le même appareil. L'indication « Progression enregistrée » n'apparaît qu'après la fin réussie de la transaction. Si le stockage est bloqué, une erreur apparaît et le jeu reste jouable sans enregistrement. Le bouton Réessayer relance l'enregistrement. Exporter produit un fichier JSON et Importer valide sa structure avant de remplacer la partie.

Le stockage d'un fichier ouvert directement peut être bloqué ou géré différemment selon le navigateur. Un hébergement HTTP(S) fournit une origine stable. Changer l'adresse du jeu, effacer les données du navigateur ou utiliser la navigation privée peut faire perdre la sauvegarde. Exporter avant tout transfert. Pas de synchronisation en ligne. Un service de stockage avec identité utilisateur serait à connecter pour une future synchronisation entre appareils.

## Accessibilité

Boutons natifs avec activation Entrée/Espace, focus visible et lien d'évitement. Dialogues natifs avec fermeture par Échap et retour du focus. Les choix indisponibles sont désactivés et expliqués. Les informations d'humeur et de sauvegarde sont lisibles sans interpréter une couleur. Interface adaptative et animations supprimées avec `prefers-reduced-motion`.

## Illustration et états

Illustration produite avec l'outil Imagegen intégré. Asset : `assets/ogre-bridge-keeper.png`.

Prompt : « Landscape 3:2 painterly fantasy artwork of a friendly grumpy moss-green ogre leaning on an old stone bridge’s wooden railing, face center-right, foggy forest river valley at dusk, navy and teal tones, warm amber lantern, textured storybook illustration, no text or UI. »

Une seule illustration. Méfiant au départ ou colère 1 ; intrigué avec confiance positive ; apaisé à confiance 3+ sans colère ; furieux à colère 2+. Le libellé et le dialogue changent, ainsi que la luminosité ; l'image n'a pas de sprites faciaux ni d'animation complexe.

## Développement

Node.js 20+ :

```sh
npm install
npm run check
npm test
npm run build
```

Le build compile le TypeScript et intègre CSS et illustration dans `dist/index.html`. Les sources n'ont aucune dépendance d'exécution externe.

## Vérifications réalisées

- Vérification TypeScript stricte réussie.
- Cas d’erreur de stockage et d’import invalide exécutés sur les vrais gestionnaires du jeu dans un environnement simulé : message visible, aucun faux succès et partie conservée.
- Tests des cinq fins, des consommations de ressources, des excuses, de la conservation des fins à la reprise, des choix invalides et des données incompatibles réussis.
- Parcours navigateur : commencer, écouter Bröm, actualiser et retrouver la même branche, aider, partager le fromage, atteindre l'amitié, actualiser et retrouver la fin et le fromage consommé.
- Interface mobile vérifiée dans une largeur de 390 pixels ; activation des règles avec Entrée, fermeture avec Échap et retour du focus vérifiés.
- L'export interactif par le navigateur automatisé n'a pas produit de téléchargement observable (délai dépassé). Cette vérification de téléchargement reste à compléter dans un navigateur utilisateur.
- L'import interactif par le sélecteur de fichiers du navigateur automatisé n'a pas abouti (outil bloqué). Sa validation est testée séparément ; ce test interactif reste à compléter.
- WebMCP : enregistrement conditionnel prévu ; aucune API disponible dans le navigateur de test, donc support non validé.

## Périmètre

Un chapitre, cinq fins, dialogues écrits à l'avance, sans audio, multijoueur, inventaire étendu ni génération de dialogues. La version est livrée comme fichier autonome, avec sauvegarde locale et export JSON.
