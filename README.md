# p7

## Initialisation du projet
```
npm install
```

### Activation du backend
```
Ouvrir terminal à la racine du projet
cd backend
nodemon serve
(les informations du fichier .env sont volontairement laissé visible pour faciliter la démo de la version beta)
```

### Activation du frontend
```
Ouvrir terminal à la racine du projet
cd frontend
npm run serve
http://localhost:8080/

```

### Creation base de donnée
```
Creez votre base de donnée en copiant les table presentes dans backend/db.sql
Remplassez les informations dans le fichier backend/db.js par celles de votre base de donnée:
"  host     : '127.0.0.1',
  user     : 'ici',
  password : 'ici',
  database : 'ici',
  port     : ici"

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
