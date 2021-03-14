const Discord = require('discord.js')
const db = require('quick.db')
////////////////////////////////////

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("** Bunu yapmak için `Yönetici` yetkisine ihtiyacın var **")
let kanaletiket = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(!kanaletiket) return message.reply("UyariLog kanalini etiketlemelisin! (Podos Uyari Sistemi)")
db.set(`uyarilog_${message.guild.id}`, kanaletiket)
message.channel.send(`Uyari Log kanali ${kanaletiket} olarak ayarlandi (Podos Uyari Sistemi)`)
}



exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['uyari-log','uyarilog',"uyarı-log"],
permLevel: 0,
}

exports.help = {
name: 'uyarılog'
}