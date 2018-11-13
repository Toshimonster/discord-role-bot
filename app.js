const Discord = require('discord.js');
const roles = require('./conf');

const client = new Discord.Client({});

require('dotenv').config();

client.on('raw', ev => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(ev.t)) {
        const guild = roles.find(e => e.id === ev.d.guild_id);
        if (!guild) return;

        const role = guild.messages.find(e => e.message === ev.d.message_id);
        if (!role) return;

        if (ev.t === 'MESSAGE_REACTION_ADD') {
            client.guilds.get(guild.id)
                .members.get(ev.d.user_id)
                .addRole(role.role)
                .catch(ex => console.log(ex))
        }
        else if (ev.t === 'MESSAGE_REACTION_REMOVE') {
            client.guilds.get(guild.id)
                .members.get(ev.d.user_id)
                .removeRole(role.role)
                .catch(ex => console.log(ex))
        }
    }
});

client.on('ready', () => {
    console.log('scahbot is ready!')
});

client.login(process.env.DISCORD_TOKEN);