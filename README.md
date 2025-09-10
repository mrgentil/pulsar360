# Pulsar360 - Marketing Digital Studio

Une plateforme SaaS moderne de marketing digital pour optimiser vos campagnes sur les réseaux sociaux.

## 🚀 Fonctionnalités

- **Dashboard** - Vue d'ensemble avec KPIs et métriques de performance
- **Planner** - Planification de contenu avec calendrier et drag & drop
- **Composer** - Éditeur de contenu avec prévisualisation multi-canaux
- **Assets** - Gestion des médias et brand kit
- **Inbox** - Gestion des messages et commentaires
- **Analytics** - Analyses détaillées avec graphiques interactifs
- **Settings** - Configuration complète du compte et des équipes

## 🛠️ Stack Technique

- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Backend**: NestJS, Prisma (dans le dossier `/api`)

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd pulsar360
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   ```bash
   cp env.example .env.local
   ```
   
   Modifier `.env.local` avec vos variables d'environnement :
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir l'application**
   Naviguer vers [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du Projet

```
pulsar360/
├── app/                    # Next.js App Router
│   ├── (pulsar)/          # Groupe de routes pour l'app principale
│   │   ├── dashboard/     # Page tableau de bord
│   │   ├── planner/       # Page planificateur
│   │   ├── composer/      # Page éditeur de contenu
│   │   ├── assets/        # Page gestion des médias
│   │   ├── inbox/         # Page messagerie
│   │   ├── analytics/     # Page analytics
│   │   └── settings/      # Page paramètres
│   ├── login/             # Page de connexion
│   ├── register/          # Page d'inscription
│   ├── layout.tsx         # Layout racine
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/               # Composants UI de base
│   └── layout/           # Composants de layout
├── lib/                  # Utilitaires et helpers
├── api/                  # Backend NestJS/Prisma
└── public/               # Assets statiques
```

## 🎨 Design System

### Couleurs Principales
- **Primary**: `#111827` (Bleu foncé)
- **Accent**: `#7C3AED` (Violet Pulsar360)
- **Success**: `#10B981` (Vert)
- **Warning**: `#F59E0B` (Orange)
- **Danger**: `#EF4444` (Rouge)

### Couleurs Réseaux Sociaux
- Facebook: `#1877F2`
- Instagram: `#E4405F`
- Twitter: `#1DA1F2`
- LinkedIn: `#0A66C2`
- YouTube: `#FF0000`
- TikTok: `#000000`

### Typographie
- **Font**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de développement

# Production
npm run build        # Construire l'application
npm run start        # Lancer l'application en production

# Qualité du code
npm run lint         # Linter ESLint
npm run type-check   # Vérification TypeScript
```

## 📱 Pages Disponibles

### Authentification
- `/login` - Connexion utilisateur
- `/register` - Inscription utilisateur

### Application Principale
- `/dashboard` - Tableau de bord avec KPIs
- `/planner` - Planificateur de contenu
- `/composer` - Éditeur de contenu multi-canaux
- `/assets` - Gestion des médias et brand kit
- `/inbox` - Messagerie et commentaires
- `/analytics` - Analyses et métriques
- `/settings` - Paramètres et configuration

## 🔐 Authentification

L'authentification est configurée mais nécessite l'intégration avec le backend API :
- JWT tokens pour l'authentification
- Routes protégées avec middleware
- Gestion des sessions utilisateur

## 🎯 Prochaines Étapes

1. **Intégration API** - Connecter avec le backend NestJS
2. **Authentification** - Implémenter la logique d'auth complète
3. **Command Palette** - Ajouter la palette de commandes (⌘K)
4. **Collaboration Live** - Avatars de présence en temps réel
5. **Tests** - Ajouter les tests unitaires et e2e
6. **Animations** - Améliorer les micro-interactions

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe Pulsar360

---

**Pulsar360** - Propulsez votre marketing digital vers de nouveaux horizons 🚀
