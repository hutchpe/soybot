const Discord = require('discord.js');
const client = new Discord.Client();

const soy = require('./soy')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  soy.runSoy(msg)
})

client.login('NDkzMTc0NjA4MTEyMTIzOTE0.DonMtA.F9YqILbVNyPc7McTf9-ntgZGpLc');