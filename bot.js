const Discord = require('discord.js');
const client = new Discord.Client();

const config = {
  message: {
    lower: 10,
    upper: 50
  },
  count: {
    lower: 2,
    upper: 5
  },
  coolDownSeconds: 20
}

const soyTriggers = [
  `fag`, `fags`, `faggots`, `faggot`,
  `nigger`, `niggers`, `nog`,
  `abo`,
  `tranny`,
  `white`,
  `patriarchy`,
  `male`, `man`, `men`,
  `privilege`,
  `jew`, `jews`,
  `chad`,
  `wage`, `gap`,
  `free`, `freedom`,
  `thot`, `slut`, `whore`
]

const soyQuips = [
  `YAAAASS QUEEN SLAY`,
  `i literally can't even`,
  `it's almost as if`,
  `oof`,
  `YOU ARE NOT WELCOME HERE`,
  `toxic`,
  `oh sweet summer child...`,
  `yikes`,
  `oh hey`,
  `bigotry`,
  `folks`,
  `losing all faith in humanity`,
  `i'm literally shaking right now`,
  `ding, ding, ding`,
  `oh boy`,
  `let's unpack this`,
  'friendo',
  `it's called being a decent human being`,
  `y'all`,
  `you do realise`,
  `wholesome`,
  `wow... just wow`,
  `this! so much this!`,
  `problematic`,
  `just shut up and listen`,
  `my wifes boyfriend`,
  `my wifes children`
]

const wrangledNibbas = [
  // `154528976088465408`
]

let triggeringNibbas = {}

const isSoyTriggered = message => {
  let words = message.split(' ')
  return words.some(word =>
    soyTriggers.some(trigger => trigger === word.toLowerCase())
  )
}

const randomInt = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

const generateSoy = () => {
  let soyRes = []
  for (let i = 0; i < randomInt(config.message.lower, config.message.upper); i++) {
    soyRes.push(soyQuips[randomInt(0, soyQuips.length)])
  }
  return soyRes.join(' ')
}

const getTimeStamp = () => {
  return Math.round((new Date()).getTime() / 1000)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!isSoyTriggered(msg.content)) { // check if message is triggering
    return
  }

  if (wrangledNibbas.some(nibba => nibba === msg.author.id)) { // fuck off jack
    console.log(`wrangled`)
    return
  }

  let nibba = triggeringNibbas[msg.author.id]
  if (!nibba) { // if we dont have this user, insert them
    triggeringNibbas[msg.author.id] = {}
    triggeringNibbas[msg.author.id].bigotry = 1
    triggeringNibbas[msg.author.id].cutoff = 0
  } else {
    triggeringNibbas[msg.author.id].bigotry += 1
  }

  if (triggeringNibbas[msg.author.id].cutoff > getTimeStamp()) {
    console.log(`spamming!`)
    return
  }

  triggeringNibbas[msg.author.id].cutoff = getTimeStamp() + config.coolDownSeconds

  console.log(triggeringNibbas)
  
  for (let i = 0; i < randomInt(config.count.lower, config.count.upper); i++) { // i am soy incarnate
    msg.reply(generateSoy()); 
  }
})

client.login('NDkzMTc0NjA4MTEyMTIzOTE0.DonMtA.F9YqILbVNyPc7McTf9-ntgZGpLc');