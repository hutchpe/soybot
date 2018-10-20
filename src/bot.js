const Discord = require('discord.js');
const client = new Discord.Client();

const auth = require('../AUTH')

const soy = require('./soy')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  try {
    soy.runSoy(msg)
  } catch (e) {
    console.error(e)
  }
})

client.login(auth.key);
