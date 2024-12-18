const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Lê todos os comandos na pasta "commands"
for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`);
    commands.push(command.data.toJSON());
}

// Configura o REST client
const rest = new REST({ version: '10' }).setToken(token);

// Registra os comandos para um servidor específico
(async () => {
    try {
        console.log('Registrando comandos no Discord...');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Comandos registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
})();
