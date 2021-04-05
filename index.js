const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
 console.log("Ready to play the sax!");
 client.user.setPresence({activity: {name: "s!play"}})
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.Prefix)) return;

  const args = message.content.slice(process.env.Prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command == "help") {
    const embed = new Discord.MessageEmbed()
      .setTitle("Help - Sax.mp3")
      .setDescription("My current commands are:")
      .setColor("FFD500")
      .addField("s!help", "Shows the currect list of commands")
      .addField("s!play", "Plays sax in your current voice channel")
      .addField("s!leave", "Leaves your currect voice channel")
      .addField("s!invite", "Sends the invite link of Sax.mp3")

    message.channel.send(embed);
  }

  if(command == "play") {
    let voiceCH = message.member.voice.channel;

    if(!voiceCH || voiceCH.type !== "voice") {
      message.reply("**ERROR:** You need to join a voice channel first!");
    } else if(message.guild.voiceConnection) {
      message.reply("**ERROR:* I am connected to another voice channel on this guild!");
    } else {
      voiceCH.join().then(connection => {
        const dispatcher = connection.play("https://drama.gg/sax/sax.mp3");

        const embed = new Discord.MessageEmbed()
          .setTitle("Play - Sax.mp3")
          .setDescription("Now playing: **1+ hour of sax music by drama.gg**")
          .setColor("FFD500")

        message.channel.send(embed);

        dispatcher.on("finish", () => {
          voiceCH.leave();
        });
      });
    }
  }

  if(command == "leave") {
    let voiceCH = message.member.voice.channel;

    if(!voiceCH) {
      message.reply("**ERROR:** You need to join a voice channel first!")
    } else {
      message.channel.send("Leaving voice channel").then(() => {
        voiceCH.leave();
      }).catch(error => console.log(error));
    }
  }

  if(command == "invite") {
    const embed = new Discord.MessageEmbed()
      .setTitle("Invite - Sax.mp3")
      .setDescription("Invite me [here](https://pog.rs/sax-bot)")
      .setColor("FFD500")

    message.channel.send(embed);
  }
});

client.login(process.env.Token);
