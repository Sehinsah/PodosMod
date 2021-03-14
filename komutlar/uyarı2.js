const Discord = require('discord.js')
const data = require('quick.db')
////////////////////////////////////

exports.run = async (client, message, args) => {

  
if(!message.member.hasPermission('809285603652010007')) return message.reply("**Komutu kullanmak için yetkin bulunmamakta.**")

let kullanıcı = message.mentions.users.first()
if(!args[0]) return message.reply(" Lütfen bir üye etiketle.")
if(!kullanıcı) return message.reply(` Kullanıcı Bulunamadı (` + args[0] + `)`)

const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(!syı2) return message.channel.send(new Discord.MessageEmbed()
                                      .setColor("#f9ff00")
                                      .setTitle(`${kullanıcı.tag}, uyarı sayısı`)
                                      .setDescription("**Kullanıcının Hiç Uyarısı Bulunmuyor**"))
await message.channel.send(new Discord.MessageEmbed()
                           .setColor("#f9ff00")
                           .setTitle(`${kullanıcı.tag}, uyarı sayısı`)
                           .setDescription(`Toplam **${syı2}** uyarısı var`))




}



exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['uyarilar',"warnings","warns","infractions"],
permLevel: 0,
}

exports.help = {
name: 'uyarılar'
}