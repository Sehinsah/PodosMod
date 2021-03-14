const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags')
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token)



client.on("message", message => {
    if(message.content.toLowerCase() == "sa") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "SA") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selam aleyküm") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "sA") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "Sa") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "Selamın Aleyküm") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selamın aleyküm") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "SelamınAleyküm") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selamınaleyküm") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "Selam Aleyk") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selam aleyk") 
    return message.channel.send(`**<a:tac:809341671279951892> ${message.author}, Aleyküm Selam.**`)
});

//------------------------------------------------------------------------------------------------------------\\


client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});


//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async(member) => {
let rol = member.guild.roles.cache.find(r => r.name === "⛔️ Karantina");
let cezalımı = db.fetch(`cezali_${member.guild.id + member.id}`)
let sürejail = db.fetch(`süreJail_${member.id + member.guild.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali") {
member.roles.add(ayarlar.JailCezalıRol)
 
member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`cezali_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Cezan açıldı.`)
    member.roles.remove('809285603485024314');
  }, ms(sürejail));
}
})

//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.find(r => r.name === "Muted");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.roles.add(ayarlar.MuteliRol)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.roles.remove('809285603485024314');
  }, ms(süre));
}
})

//--------------------------------------------------------------------------------------\\


client.on('guildMemberAdd', async member => {
const data = require('quick.db')
const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let data2 = await data.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.cache.get(data2)
if(!rol) return;
let kişi = member.guild.members.cache.get(member.id)
kişi.roles.add(rol.id);
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)
data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    data.set(`${member.guild.id}.jail.${kişi.id}`)
  const wasted = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
  .setColor(`#0x800d0d`)
  .setDescription(`Dostum hadi ama !!! Jaildan Kaçamazsın ikimizde birbirimizi kandırmayalım...!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
})

//--------------------------------------------------------------------------------------\\

client.on("message", async msg => {
  
  
 const i = await db.fetch(`kufur_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${oldMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                  oldMessage.delete();
                          
                      return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu sunucuda küfür filtresi etkin.`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});


//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\

client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda reklam filtresi etkin.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });

//--------------------------------------------------------------------------------------\\

client.on('messageDelete', message => {
  const data = require("quick.db")
  data.set(`snipe.mesaj.${message.guild.id}`, message.content)
  data.set(`snipe.id.${message.guild.id}`, message.author.id)

})

client.on("ready", async function() {
const voiceChannel = "809285605988630547"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})

//Taglı Alım- Tag Alınca Mesaj Sistemi

client.on("userUpdate", async (oldUser, newUser) => { 
    let sunucu = `809285603367190588`;
    let kanal = `809285610707091461`;
    let taglı = `809285603631300629`;
  
    let tag = `Ψ`;
    let untag = `•`;
    let channel = client.guilds.cache.get(sunucu).channels.cache.get(kanal);
  
    if (oldUser.username !== newUser.username) {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(taglı)
      ) {
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(taglı);
  
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .setNickname(
            client.guilds.cache
              .get(sunucu)
              .members.cache.get(newUser.id)
              .displayName.replace(untag, tag)
          );
  
        channel.send(`**${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adına ekleyerek ailemize katıldı.**`);
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(taglı)
      ) {
        if (db.fetch(`taglıAlım.${sunucu}`)) {
          await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(taglı);
          await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.set(["809285603485024314"] || []);
        }
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(taglı);
  
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .setNickname(
            client.guilds.cache
              .get(sunucu)
              .members.cache.get(newUser.id)
              .displayName.replace(tag, untag)
          );
        channel.send(`**${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.**`);
      }
    }
  });

//------------------------ŞÜPHELİ-HESAP-----------------------\\

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "809285603485024314") 
     var rol = member.guild.roles.cache.get("809285603610722348") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('**Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.**')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------ŞÜPHELİ-HESAP-----------------------\\

client.on("guildMemberAdd", member => {
member.setNickname(`Ψ İsim | Yaş`) 
}) ;


client.on("guildMemberAdd", member => {

if(member.user.username.includes("Râte")){
member.roles.add("809285603610722348")
member.roles.add("809285603610722347")
member.roles.remove("809285603485024314")
member.send("**__Sunucumuzun Yasaklı Tagında Bulunuyorsunuz, Şüpheli Kısmına Atıldınız.__**")
}
})

//-------------------------------İLTİFAT-SİSTEMİ-----------------------------------------\\

const knaveqwe = [
'**Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.**',
'**Mavi gözlerin, gökyüzü oldu dünyamın.**',
'**Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.**',
'**Huzur kokuyor geçtiğin her yer.**',
'**Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.**',
'**Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.**',
'**Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.**',
'**Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.**',
'**Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.**',
'**Etkili gülüş kavramını ben senden öğrendim.**',
'**Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.**',
'**Gözlerinle baharı getirdin garip gönlüme.**',
'**Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.**',
'**Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.**',
'**Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.**',
'**Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.**',
'**Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.**',
'**Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.**',
'**Aynı zaman diliminde yaşamak benim için büyük ödüldür.**',
'**Biraz Çevrendeki İnsanları Takarmısın ?**',
'**İğrenç İnsansın!**',
'**Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.**',
'**Onu Bunu Boşver de bize gel 2 bira içelim.**',
'**Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.**',
'*Knave seni çok sevdi...**',
'**Mucizelerden bahsediyordum.**',
];

client.on("message", async message => {
  if(message.channel.id !== "809285605988630539") return;
  let Knavedev = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(Knavedev >= 200) {  
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((knaveqwe ).length - 1) + 1);
    message.reply(`${(knaveqwe )[random]}`);
  };
});