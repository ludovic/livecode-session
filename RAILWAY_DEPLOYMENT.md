# 🚂 Déploiement sur Railway

Ce guide vous explique comment déployer LiveCode Session sur Railway.

## 📋 Prérequis

1. Un compte GitHub avec votre code poussé
2. Un compte Railway (gratuit) : https://railway.app

## 🚀 Déploiement

### Étape 1 : Créer le projet sur Railway

1. Allez sur https://railway.app
2. Cliquez sur **"Start a New Project"**
3. Sélectionnez **"Deploy from GitHub repo"**
4. Autorisez Railway à accéder à votre GitHub
5. Sélectionnez le repo **"livecode-session"**

### Étape 2 : Configurer le Backend

Railway détectera automatiquement le backend Python. Configurez les variables d'environnement :

**Variables d'environnement à ajouter :**
- `PORT` : (Automatiquement défini par Railway)
- `PYTHON_VERSION` : `3.9`

### Étape 3 : Déployer le Frontend

1. Dans votre projet Railway, cliquez sur **"+ New"**
2. Sélectionnez **"GitHub Repo"** (le même repo)
3. Configurez :
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Start Command** : `npm run preview`

**Variables d'environnement frontend :**
- `VITE_API_URL` : URL de votre backend (ex: `https://your-app-backend.up.railway.app`)
- `VITE_WS_URL` : URL WebSocket (ex: `wss://your-app-backend.up.railway.app`)

### Étape 4 : Obtenir les URLs

Railway vous donnera deux URLs :
- **Backend** : `https://your-app-backend.up.railway.app`
- **Frontend** : `https://your-app-frontend.up.railway.app`

### Étape 5 : Mettre à jour les variables

1. Copiez l'URL du backend
2. Retournez dans les settings du frontend
3. Mettez à jour :
   - `VITE_API_URL=https://your-app-backend.up.railway.app`
   - `VITE_WS_URL=wss://your-app-backend.up.railway.app`

## 🎯 Configuration automatique alternative

Railway peut aussi déployer avec un fichier de configuration :

```bash
# Pushez vos changements
git add .
git commit -m "Add Railway deployment config"
git push origin main
```

Railway redéploiera automatiquement à chaque push !

## 📊 Monitoring

- **Logs** : Disponibles dans Railway Dashboard
- **Metrics** : CPU, RAM, Network dans l'onglet "Metrics"
- **Rollback** : Possible depuis l'onglet "Deployments"

## 💡 Conseils

1. **Plan gratuit** : 
   - 500 heures/mois d'exécution
   - Parfait pour les démos et tests

2. **Custom Domain** : 
   - Vous pouvez ajouter votre propre domaine
   - Railway Settings → Domains

3. **Scaling** :
   - Démarrez avec 1 instance
   - Augmentez si nécessaire

## 🔧 Troubleshooting

**Le backend ne démarre pas ?**
- Vérifiez les logs dans Railway
- Assurez-vous que `requirements.txt` est à jour

**WebSocket ne fonctionne pas ?**
- Utilisez `wss://` (pas `ws://`) pour le backend en production
- Vérifiez que CORS est configuré pour accepter votre frontend

**Le frontend ne se connecte pas au backend ?**
- Vérifiez que `VITE_API_URL` et `VITE_WS_URL` pointent vers le bon backend
- Vérifiez les logs du navigateur (F12)

## 🎉 C'est tout !

Votre application est maintenant en ligne ! 🚀

**Frontend** : Accessible publiquement  
**Backend** : API + WebSocket fonctionnels  
**Auto-deploy** : Déploiement automatique à chaque push GitHub
