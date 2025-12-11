# 💻 Hybrid-Analyzer Web UI : Interface d'Analyse d'Articles

## 🎯 Objectif du Projet

Fournir l'interface utilisateur web (IHM) pour interagir avec l'API sécurisée d'analyse. Elle gère l'authentification JWT, l'envoi de texte, et l'affichage des résultats d'analyse structurés.

## 🛠️ Stack Technique

- **Framework** : Next.js / React
- **Routage** : App Router (src/app/)
- **Sécurité Client** : Gestion du token JWT (LocalStorage)

## 📂 Structure du Dépôt

La structure utilise le routage Next.js :

- `src/app/analyse` : Interface principale protégée
- `src/app/auth/login` : Formulaire de connexion
- `src/app/auth/register` : Formulaire d'inscription
- `src/hooks` : Logique réutilisable pour la gestion de l'état et l'interception des appels API (ajout du JWT)

## 🖼️ Schéma d'Architecture Frontend

L'interface se concentre sur l'expérience utilisateur et la sécurité des données sensibles.

## 🔄 Workflow de l'Utilisateur (User Flow)

1. **Connexion** : L'utilisateur soumet ses identifiants à `/auth/login`. Le Frontend reçoit le JWT et le stocke.
2. **Accès Protégé** : L'utilisateur navigue vers `/analyse`. Le token est chargé.
3. **Analyse** : Le texte est saisi et envoyé à l'API Backend `/analyze` avec le token JWT dans l'en-tête `Authorization`.
4. **Affichage** : Le JSON structuré est reçu et décomposé en composants visuels clairs (tableau pour la classification, bloc pour le résumé, étiquette pour le ton).

## 🚨 Gestion des Erreurs

Le Frontend doit traduire les codes d'erreur HTTP de l'API en messages utilisateurs compréhensibles :

| Code Retour API | Type d'Erreur | Message Affiché à l'Utilisateur |
|-----------------|---------------|----------------------------------|
| 401 Unauthorized | Échec JWT | "Session expirée. Veuillez vous reconnecter." |
| 400 Bad Request | Validation de saisie | "Le champ de texte ne peut pas être vide." |
| 503 Service Unavail. | Dépendance IA Down (HF/Gemini) | "Le service d'analyse est temporairement indisponible. Veuillez réessayer plus tard." |

## ⚠️ Limites et Dépendance

L'application web est entièrement dépendante de la disponibilité et de la performance de l'API Backend (hybrid-analyzer-api). Si le Backend subit des ralentissements dus à la latence des services IA, cela se traduira par une attente accrue sur l'interface utilisateur.

**Solution Frontend** : Utilisation d'indicateurs visuels de chargement clairs et de timeouts optimistes pour éviter que l'application ne semble figée.

## ⚙️ Instructions de Lancement (Environnement & Docker)

**Pré-requis** : Node.js v18+ OU Docker.

### 1. Configuration (pour le développement)

Créez le fichier `.env.local` et pointez vers l'API Backend :
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Démarrage de Développement (Node.js)
```bash
git clone [URL_DU_DEPOT_FRONTEND]
cd hybrid-analyzer-web
npm install
npm run dev
```

### 3. Conteneurisation (Docker)

Pour un déploiement ou une production simple :
```bash
docker build -t hybrid-analyzer-web .
docker run -p 3000:3000 -d --name web_ui hybrid-analyzer-web
```