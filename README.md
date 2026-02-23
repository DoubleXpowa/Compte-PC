# 💳 Mon Compte — Application Windows

Application de suivi bancaire personnel pour Windows.  
Construite avec Electron — s'installe comme une vraie application, se met à jour automatiquement.

---

## 📥 Télécharger et installer

1. Allez dans l'onglet **Releases** (à droite sur la page GitHub)
2. Téléchargez le fichier `Mon-Compte-Setup-x.x.x.exe`
3. Double-cliquez pour installer
4. L'application apparaît dans le menu Démarrer et sur le Bureau

> Si Windows affiche un avertissement "application inconnue", cliquez sur **Informations complémentaires → Exécuter quand même**. C'est normal pour une app non signée.

---

## 🔄 Mettre à jour l'application

### Mise à jour automatique
L'application vérifie les mises à jour au démarrage.  
Une bannière apparaît en haut à droite quand une mise à jour est disponible — cliquez dessus pour redémarrer.

### Publier une nouvelle version (vous en tant que développeur)

**Étape 1 — Modifiez vos fichiers** (ex: `src/index.html`)

**Étape 2 — Mettez à jour la version** dans `package.json` :
```json
"version": "1.0.1"
```

**Étape 3 — Créez un tag Git** (ça déclenche la compilation automatique) :
```bash
git add .
git commit -m "Version 1.0.1 — description des changements"
git tag v1.0.1
git push && git push --tags
```

**Étape 4 — GitHub Actions construit le .exe automatiquement** (≈ 5 minutes)  
Vous pouvez suivre la progression dans l'onglet **Actions** de votre dépôt.

**Étape 5 — L'application installée se met à jour automatiquement** 🎉

---

## 🛠️ Développement local

### Prérequis
- [Node.js](https://nodejs.org) version 18 ou supérieure
- Git

### Lancer l'app en mode développement
```bash
git clone https://github.com/VOTRE_NOM/mon-compte.git
cd mon-compte
npm install
npm start
```

### Construire l'installateur manuellement
```bash
npm run build:win
```
L'installateur se trouve dans le dossier `dist/`.

---

## 📁 Structure du projet

```
mon-compte/
├── .github/
│   └── workflows/
│       └── build.yml       ← Compilation automatique sur GitHub
├── icons/
│   ├── icon.ico            ← Icône Windows
│   └── icon-*.png          ← Icônes diverses tailles
├── src/
│   └── index.html          ← L'application complète (UI + logique)
├── main.js                 ← Electron : gestion fenêtre + mises à jour
├── preload.js              ← Pont sécurisé Electron ↔ app
├── package.json            ← Config Node.js + build
└── README.md               ← Ce fichier
```

---

## 💾 Données & confidentialité

- Toutes les données sont stockées **localement** dans le profil Windows (`%APPDATA%/mon-compte`)
- **Aucune donnée envoyée sur internet**
- Exportez régulièrement depuis Réglages → Exporter pour sauvegarder

---

## ❓ FAQ

**Comment changer le nom de l'app ?**  
Dans `package.json`, modifiez `"productName"` et `"name"`, puis publiez une nouvelle version.

**L'avertissement Windows Defender est normal ?**  
Oui. Pour une app sans certificat payant ($300+/an), Windows affiche cet avertissement. Cliquez sur "Informations complémentaires → Exécuter quand même".

**Les données sont perdues après mise à jour ?**  
Non. Les données sont dans `%APPDATA%`, pas dans le dossier d'installation. Elles sont conservées entre les mises à jour.
