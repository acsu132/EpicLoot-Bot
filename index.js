const fs = require('fs');
const path = require('path');

// Executa o main.js
require('./main');

// Caminho para a pasta de eventos
const eventsPath = path.join(__dirname, 'events');

// Carrega e executa todos os arquivos na pasta events
fs.readdir(eventsPath, (err, files) => {
  if (err) {
    console.error('Erro ao ler a pasta events:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.js')) {
      try {
        console.log(`Executando o evento: ${file}`);
        require(path.join(eventsPath, file));
      } catch (error) {
        console.error(`Erro ao executar o arquivo ${file}:`, error);
      }
    }
  });
});
