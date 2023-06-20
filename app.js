const express = require('express')
const app = express()
const port = 3000
const conf = require('./configs/settings.json');
const bodyParser = require('body-parser')
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const INTENTS = Object.values(GatewayIntentBits);

const client = new Client({ intents: INTENTS });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  
  
  const user = req.user;
  res.render('index', {
    botName: client.user.username,
    description: conf.description,
    user: req.user
    
  })
})
app.get('/hakkimizda', (req, res) => {
  const user = req.user;

  res.render('hakkimizda', {
    botName: client.user.username,
    user: req.user
  })
})
app.get('/komutlar', (req, res) => {
  const user = req.user;

  res.render('komutlar', {
    botName: client.user.username,
    user: req.user

  })
})
app.get('/stats', (req, res) => {
  const user = req.user;
  res.render('stats', {
    botName: client.user.username,
    user: req.user,
    bot: client
  })
})
app.get('/oneri', (req, res) => {
  const user = req.user;
  res.render('oneri', {
    botName: client.user.username,
    user: req.user,
  });
});
app.post('/oneri', (req, res) => {
  const guild = client.guilds.cache.get(conf.guildId);
  const channel = guild.channels.cache.get(conf.oneriLog);
  const user = req.user;
  const oneri = req.body.oneri;

  if (oneri && oneri.trim() !== '') {
    const embed = new EmbedBuilder()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setTitle('Bir Öneri Paylaşıldı !')
      .setDescription(`• **Öneri** : ${oneri}`);

      channel.send({ embeds: [embed] })
      .then(() => {
        res.redirect('/oneri');
      })
      .catch((error) => {
        console.error('Öneri gönderilirken bir hata oluştu:', error);
        res.redirect('/oneri');
      });
  } else {
    console.error('Boş bir öneri gönderilmeye çalışıldı.');
    res.redirect('/oneri');
  }
});



app.get('/discord', (req, res) => {
  res.redirect(conf.discordInvite);
})

app.get('/invite', (req, res) => {
  res.redirect(conf.botInvıte);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
client.on('ready', () => {
  console.log('Bot hazır.');
});

client.login(conf.botToken);
