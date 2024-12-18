const { MongoClient } = require('mongodb');

// URL de conexão do MongoDB (substitua pelo seu)
const uri = "mongodb+srv://adrieldsilvas2:lySxkwBDe8aJYvCk@cluster.mongodb.net/nomeDoBanco";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        if (!db) {
            await client.connect();
            db = client.db('nomeDoBanco'); // Substitua pelo nome do seu banco
            console.log('Conectado ao MongoDB com sucesso!');
        }
        return db;
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

module.exports = { connectToDatabase };
