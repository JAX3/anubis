
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./command');
const config = require ("./config.json");

client.commands = new Discord.Collection();
client.login(config.token);




//on ready stuff.
client.on("ready",() => {
	console.log("my Prefix:",config.prefix,"my id: ",config.id);
	client.user.setPresence({ game: { name:"YaLLa Esports || !help", type: 0 } });
});


// welcome new user.
client.on('guildMemberAdd', (member) => {
	
	const  channel =  client.channels.get(config.channel);
const mod = client.channels.get(config.mod);
  channel.send(`Yalla ${member}!, Welcome to YaLLa eSports ! What games do you play?! Please Read our <#267986741137244161>.<:yalla:247970940472918017>`);
  console.log(`${member.user.username} has joined`);
  mod.send(`Has Joined ${member}!`)
}); 





//ping command very usefull
  client.on('message', (message)=>{
  if(message.content.startsWith(config.prefix+"ping")) {
  
		message.channel.send(`Pong! Latency is ${Math.round(client.ping)}ms.`);

}});


//info stuff
client.on('message', (message)=>{
  if(message.content.startsWith(config.prefix+"info")) {

    const embed = new Discord.RichEmbed()
		.setTitle("Anubis")
		.setAuthor("Description")
		.setColor(0xAF0F67)
		.setDescription("Yalla Esport was born out of a passion for gaming shared by three friends, better known as Klaus, Anas and Tom, who between them are on a mission to build a community of gamers with an organized structure in the MENA region, championing the gaming culture and building the perfect environment for professional gamers to flourish.")
		.setFooter("Made by JAX for Yalla esports")
		.setTimestamp()
		.addField("Commands","Do !help for the list of commands.")
		.addField("JAX", "The creator of this wonderful bot. PLz no steal.", true)
		.addField("Social","below are the important social media links.")
		.addField(`Discord`,`Here's our discord invite link <:yalla:247970940472918017> .\n http://discord.yallaesports.com/`,true)
		.addField(`Website`,`Here's our Website link link <:yalla:247970940472918017> .\n https://www.yallaesports.com/`,true)
		message.channel.send({embed});

}});

//joined embed
client.on("message", (message) => {
    if(message.content.startsWith(config.prefix+`joined`)){

    const embed = new Discord.RichEmbed()
		.setTitle(`${message.author.username}` + "#"+ `${message.author.discriminator}`)
		.setThumbnail(`${message.author.avatarURL}`)
		.setColor(0xAF0F67)
		.addField("Joined Date",`${message.member.joinedAt.toUTCString()}`)
		.setFooter("Made by JAX for Yalla esports")
		.setTimestamp()
    message.channel.send({embed});
}});	









































/// do not touch it allows for commands to work
for (const file of commandFiles) {
	const command = require(`./command/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/\s+/);
  const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args,client);
	}
	catch (error) {
		console.error(error);
		message.reply(config.error);
	}
});










