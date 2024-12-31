const { ApplicationCommandOptionType, Client, Interaction } = require('discord.js')

module.exports = {
    /**
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     * */ 
    callback: (client, interaction) => {
    },

    name: 'autorole-configure',
    description: 'configure your auto-role for this server.',
    options: [
        {
            name: 'role',
            description: 'The Role you want users to get on join',
            type: ApplicationCommandOptionType.Role,
            require: true,

        }
    ]
}