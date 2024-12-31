const { SlashCommandBuilder } = require('discord.js')

const CallPing = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}