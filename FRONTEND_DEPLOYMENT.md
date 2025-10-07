# Déploiement Frontend sur Railway

## Étapes de déploiement

### 1. Créer le service Frontend sur Railway

1. Allez sur [Railway](https://railway.app)
2. Ouvrez votre projet
3. Cliquez sur **"+ New Service"**
4. Sélectionnez **"GitHub Repo"** (même repo que le backend)
5. Nommez le service : `livecode-frontend`

### 2. Configurer le service

Dans **Settings** du service Frontend :

#### Root Directory
```
frontend
```

#### Variables d'environnement
Ajoutez ces variables (remplacez par votre URL backend) :

```
VITE_API_URL=https://votre-backend.railway.app
VITE_WS_URL=wss://votre-backend.railway.app
```

**Note** : Utilisez `https://` pour l'API et `wss://` pour WebSocket !

### 3. Déployer

Railway détectera automatiquement :
- `package.json` pour installer les dépendances
- `railway.toml` pour la commande de démarrage

### 4. Générer le domaine public

1. **Settings** → **Networking**
2. Cliquez sur **"Generate Domain"**
3. Votre frontend sera accessible à : `https://votre-frontend.railway.app`

### 5. Tester

1. Ouvrez l'URL du frontend
2. Créez une nouvelle session
3. Partagez le lien avec un spectateur (ouvrez dans un autre onglet)
4. Tapez du code → Vérifiez qu'il apparaît en temps réel chez le spectateur

## Troubleshooting

### Le frontend ne se connecte pas au backend
- Vérifiez que `VITE_API_URL` et `VITE_WS_URL` sont bien configurées
- Vérifiez que vous utilisez `https://` et `wss://` (pas `http://` ou `ws://`)

### Erreur CORS
- Le backend est configuré avec `allow_origins=["*"]`, donc ça devrait fonctionner
- Si problème, vérifiez les logs du backend

### WebSocket ne fonctionne pas
- Assurez-vous d'utiliser `wss://` (WebSocket Secure) et non `ws://`
- Railway nécessite WSS en production
