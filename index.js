const express = require('express');
const app = express();
const chokidar = require('chokidar');
const fs = require('fs');

const folderPath = '/home/yloukou/workspace/files1'; // Remplacez par le chemin vers votre répertoire
const csvFolderPath = '/home/yloukou/workspace/files1'; // Remplacez par le chemin vers le dossier de fichiers CSV


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000, () => {
  console.log('Serveur en cours d\'écoute sur le port 3000');
// Créer un watcher pour surveiller les modifications dans le répertoire
const watcher = chokidar.watch(folderPath, {
  ignored: /^\./, // Ignorer les fichiers cachés
  persistent: true
});

console.log(`Surveillance du répertoire : ${folderPath}`);

// Événement déclenché lorsqu'un fichier est ajouté
watcher.on('add', (filePath) => {
    
  // Vérifier si le fichier est un fichier CSV
  if (filePath.endsWith('.csv')) {
    console.log(`Nouveau fichier CSV détecté : ${filePath}`);
    
    // Lire le contenu du fichier CSV
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Erreur lors de la lecture du fichier : ${err}`);
        return;
      }

      // TODO : Télécharger le contenu sur votre interface Vue.js
      console.log('Contenu du fichier CSV :');
      console.log(data);
    });
  }
});
});
