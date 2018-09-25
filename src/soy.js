const config = require('../config/production')

let triggeringNibbas = {}

const isSoyTriggered = message => {
  let words = message.split(' ')
  return words.some(word =>
    config.triggers.some(trigger => trigger === word.toLowerCase())
  )
}

const randomInt = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower)) + lower
}

const generateSoy = () => {
  let soyRes = []
  let quip = config.messageLength.quips
  for (let i = 0; i < randomInt(quip.lower, quip.upper); i++) {
    soyRes.push(config.quips[randomInt(0, config.quips.length)])
  }
  return soyRes.join(' ')
}

const getTimeStamp = () => {
  return Math.round((new Date()).getTime() / 1000)
}

const runSoy = msg => {
  if (msg.content === '?triggered') {
    msg.reply(JSON.stringify(triggeringNibbas)); 
    return
  }

  if (!isSoyTriggered(msg.content)) { // check if message is triggering
    return
  }

  if (config.wrangledNibbas.some(nibba => nibba === msg.author.id)) { // fuck off jack
    console.log(`wrangled`)
    return
  }

  let nibba = triggeringNibbas[msg.author.id]
  if (!nibba) { // if we dont have this user, insert them
    triggeringNibbas[msg.author.id] = { bigotry: 1, cutoff: 0 }
  } else {
    triggeringNibbas[msg.author.id].bigotry += 1
  }

  if (triggeringNibbas[msg.author.id].cutoff > getTimeStamp()) {
    console.log(`spamming!`)
    return
  }

  triggeringNibbas[msg.author.id].cutoff = getTimeStamp() + config.coolDownSeconds

  // console.log(triggeringNibbas)
  
  let count = config.messageLength.count
  for (let i = 0; i < randomInt(count.lower, count.upper); i++) { // i am soy incarnate
    msg.reply(generateSoy()); 
  }
}

module.exports = {
  runSoy
}