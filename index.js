const Discord = require(`discord.js`)
const client = new Discord.Client()
const https = require(`https`)

const activitiesList = [
  `on my Christian Minecraft Server`,
  `with your feelings`,
  'games you can`t afford',
  `hide and seek with FBI`,
  `far away from EU`,
  `far away from Putin`,
  `far away from Trump`,
  `with fire`,
  `sudo rm -rf /*`,
  `Half-Life 3 Closed Beta`,
  `with Playing with Playing with Playing with`,
  `nothing`,
  `nothing because of EU and Axel Voss`,
  `with comrades`,
  `alone :(`,
  `a prank on you`,
  `with nuclear missiles`,
  `with knives`,
  `dead`,
  `with the dark arts`,
  `while dreaming`,
  `at Stolle`,
  `on my PC, duh`,
  `without vaccines`,
  `without friends`,
  `Discord`,
  `with Wumpus`,
  `at https://lanit.savimaki.cc`,
  `without light theme`,
  `with Ricardo`,
  ``
]

function getStatus (site, msg) {
  const ownerTag = client.users.get(`304105273428279308`).tag
  https.get(`https://isitdown.site/api/v3/${site}`, function onDone (response) {
    let data = ``

    response.on(`data`, chunk => {
      data += chunk
    })
    response.on(`end`, () => {
      try {
        const parsedJSON = JSON.parse(data)
        const embed = new Discord.RichEmbed()

        if (parsedJSON['error'] === 'Too many requests to the same site.') {
          embed
            .setColor(16711680)
            .setThumbnail('https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png')
            .addField('**ERROR**', 'You are being rate limited!')
            .addField('**Too Many Requests**!', 'This bot has sent too many requests to the same domain in a short period of time! Try again in 10 seconds!')
            .addField('**Liian monta pyyntöä!**', 'Bot on lähettänyt liian monta pyyntöä samaan domainiin lyhyen aikavälin sisässä! Yritä uudelleen 10 sekunnin kuluttua!')
            .setFooter(`${client.user.tag} | TMR-ERROR`, client.user.displayAvatarURL)

          return msg.channel.send(embed)
        }

        embed
          .setDescription(`Testasin onko ${parsedJSON[`host`]} alhaalla`)
          .setFooter(`${client.user.tag} | Is it down?`, client.user.displayAvatarURL)

        if (parsedJSON[`isitdown`] === false || parsedJSON[`isitdown`] === undefined) {
          embed
            .setColor(65322)
            .setThumbnail(`https://discordemoji.com/assets/emoji/CheckMark.png`)
            .addField("No, the site isn't down and works as intended!", "The bot's API's connection to the website is working. If you're having issues connecting, the problem is on your connection.")
            .addField(`Ei, sivu ei ole alhaalla ja se toimii kuten pitäisi!`, `Botin API:n yhteys nettisivulle toimii. Jos sinulla on ongelmia yhdistää kyseisellä verkkosivulle, on ongelma sinun yhteydessäsi.`)
        } else {
          embed
            .setColor(16711680)
            .setThumbnail(`https://discordemoji.com/assets/emoji/WrongMark.png`)
            .addField("Yes, the site is indeed down and doesn't work as intended!", "The bot's API's connection to the website is not working. If you are having problems connecting, its not your connection's fault.")
            .addField(`Kyllä, sivu on alhaalla ja se ei toimi kuten pitäisi!`, `Botin API:n yhteys nettisivulle ei toimi. Jos sinulla on ongelmia yhdistää kyseisellä verkkosivulle, ongelma ei ole sinun yhteydessäsi.`)
        }

        return msg.channel.send(embed)
      } catch (e) {
        const embed = new Discord.RichEmbed()
          .setColor(16711680)
          .setTitle(`**ERROR**`)
          .setThumbnail(`https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png`)
          .addField(`Your request could not be processed, please try again`, `**If you added http:// or https:// in front of the domain, please remove them and try again! **`)
          .addField(`Pyyntöäsi ei voitu käsitellä, ole hyvä ja yritä uudelleen.`, `**Jos lisäsit http:// tai https:// domainin eteen, ole hyvä ja poista ne, ennen kuin kokeilet uudelleen!**`)
          .addField(`If the problem persists...`, `Please contact **${ownerTag}**`)
          .addField(`Jos ongelma jatkuu...`, `Lähetä viestiä henkilölle **${ownerTag}**`)
          .addField(`Error:`, e.message)
          .setFooter(`${client.user.tag} | HTTP-ERROR`, client.user.displayAvatarURL)
        return msg.channel.send(embed)
      }
    })
    response.on(`error`, err => {
      return msg.channel.send(`Error!\n` + err.message)
    })
  })
}

client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setStatus(`available`)
  client.user.setPresence({
    game: {
      name: `Starting up...`
    }
  })
  setInterval(() => {
    const index = Math.floor(Math.random() * (activitiesList.length - 1) + 1)
    client.user.setActivity(activitiesList[index])
  }, 15000)
})

client.on(`raw`, event => {
  let reactionChannel
  //  console.log(event)
  const eventName = event.t
  if (eventName === `MESSAGE_REACTION_ADD`) {
    if (event.d.message_id === `561582602452992001`) {
      reactionChannel = client.channels.get(event.d.channel_id)
      if (reactionChannel.messages.has(event.d.message_id)) {} else {
        reactionChannel.fetchMessage(event.d.message_id)
          .then(msg => {
            var msgReaction = msg.reactions.get(event.d.emoji.name + `:` + event.d.emoji.id)
            var user = client.users.get(event.d.user_id)
            client.emit(`messageReactionAdd`, msgReaction, user)
          })
          .catch(err => console.log(err))
      }
    }
  } else if (eventName === `MESSAGE_REACTION_REMOVE`) {
    if (event.d.message_id === `561582602452992001`) {
      reactionChannel = client.channels.get(event.d.channel_id)
      if (reactionChannel.messages.has(event.d.message_id)) {} else {
        reactionChannel.fetchMessage(event.d.message_id)
          .then(msg => {
            var msgReaction = msg.reactions.get(event.d.emoji.name + `:` + event.d.emoji.id)
            var user = client.users.get(event.d.user_id)
            client.emit(`messageReactionRemove`, msgReaction, user)
          })
          .catch(err => console.log(err))
      }
    }
  }
})

client.on(`messageReactionAdd`, (messageReaction, user) => {
  var roleName = `Client`
  var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() ===
    roleName.toLowerCase())

  if (role) {
    var member = messageReaction.message.guild.members.find(member => member.id === user.id)
    if (member) {
      member.addRole(role.id)
      console.log(`Success. Added role.`)
    }
  }
})

client.on(`messageReactionRemove`, (messageReaction, user) => {
  var roleName = `Client`
  var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() ===
    roleName.toLowerCase())
  if (role) {
    var member = messageReaction.message.guild.members.find(member => member.id === user.id)
    if (member) {
      member.removeRole(role.id)
      console.log(`Success. Removed role.`)
    }
  }
})

client.on(`guildMemberAdd`, member => {
  const channel = member.guild.channels.find(ch => ch.name === `welcome`)
  if (!channel) return
  channel.send(`Tervetuloa servulle, ${member}!`)
})

client.on(`guildMemberRemove`, member => {
  const channel = member.guild.channels.find(ch => ch.name === `welcome`)
  if (!channel) return
  channel.send(`Heipä hei, ${member}! Nähdään ensi laneissa!`)
})

client.on(`message`, async (msg) => {
  const msgLower = msg.content.toLowerCase()
  if (msg.author.bot === true) return
  if (msgLower === `ping`) {
    var resMsg = await msg.channel.send(`Lasketaan pingiä... :bar_chart:`)
    return resMsg.edit(`Ping on ` + Math.round((resMsg.createdTimestamp - msg.createdTimestamp) - client.ping) + `ms :zap:\n` + `API viive on ${Math.round(client.ping)} ms :zap:`)
  } else if (msgLower.startsWith(`isitdown`)) {
    const args = msgLower.split(` `)

    try {
      if (!args[1].includes('.')) {
        const embed = new Discord.RichEmbed()
        embed
          .setFooter(`${client.user.tag} | TLD-ERROR`, client.user.displayAvatarURL)
          .setColor(16711680)
          .setThumbnail(`https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png`)
          .addField('**ERROR**', `Something went wrong :/`)
          .addField('**You did not provide a valid domain name!**', `A valid domain name includes the domain itself(**example**.com) and a TLD(example**.com**)! Please try again!`)
          .addField('**ERROR**', `Jotain meni pieleen :/`)
          .addField('**Et syöttänyt pätevää domainia!**', `Pätevään domainiin kuuluu domain itse (**example**.com) sekä TLD (example**.com**)! Ole hyvä ja yritä uudelleen!`)
        return msg.channel.send(embed)
      } else {
        getStatus(args[1], msg)
      }
    } catch (e) {
      const embed = new Discord.RichEmbed()
      embed
        .setFooter(`${client.user.tag} | DOMAIN-ERROR`, client.user.displayAvatarURL)
        .setColor(16711680)
        .setThumbnail(`https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png`)
        .addField('**ERROR**', `Something went wrong :/`)
        .addField('**You did not provide a valid domain name!**', `A valid domain name includes the domain itself(**example**.com) and a TLD(example**.com**)! Please try again!`)
        .addField('**ERROR**', `Jotain meni pieleen :/`)
        .addField('**Et syöttänyt pätevää domainia!**', `Pätevään domainiin kuuluu domain itse (**example**.com) sekä TLD (example**.com**)! Ole hyvä ja yritä uudelleen!`)
      return msg.channel.send(embed)
    }
  } else if (msgLower === `help`) {
    msg.channel.send(`Lähetetty YV!`)
      .then(msg.author.send(`**PLACEHOLDER**`))
  }
})

client.on(`error`, error => {
  console.log(`Oof. Error: ${error.name}`)
})
const token = require('./token.json').token
client.login(token)
