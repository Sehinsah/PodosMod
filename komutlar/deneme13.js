const Discord = require("discord.js");
exports.run = (client, message, args) => {
  if (!message.member.roles.cache.has("809285603741007917"))
    if (!message.member.roles.cache.has("809285603741007917"))
      return message.reply("Bunun için gerekli iznin yok");
  var role = message.guild.roles.cache.find(role => role.id === "809285603693690906");
  var role2 = message.guild.roles.cache.find(role => role.id === "809285603652010013");
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user)
    return message
      .catch(console.error);
  user.roles.add(role);
  user.roles.add(role2);
  const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    message.react('<a:greenload:809341726593384458>')   
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["oyetki5"],
  permLevel: 0
};

exports.help = {
  name: "oyetki5",
  description: "İstediğiniz kişiyi vip rolü verir.",
  usage: "vip-ver [kullanıcı]"
};