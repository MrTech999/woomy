exports.run = async (client, message, args) => {

  const settings = message.settings;

  if (!client.settings.has(message.guild.id)) {
    client.settings.set(message.guild.id, {});
  }

  var adminRole = message.guild.roles.get(settings.adminRole)

  if (!args[0]) {
    if(!adminRole) {
      return message.channel.send(
        `<:error:466995152976871434> There is no admin role set for this server. Please set one using \`${message.settings.prefix}adminrole <role>\``
        );
    } else {
    message.channel.send(`The current admin role is: \`${adminRole.name}\``)
    }

  } else {
    const joinedValue = args.join(" ");
    if (joinedValue.length < 1) {
      return message.channel.send(
        `<:error:466995152976871434> You didn't specify a role. Usage: \`${client.commands.get(`adminrole`).help.usage}\``
        );
    };
    
    if (settings.adminRole != "None set" && joinedValue === adminRole.name) {
      return message.channel.send(
        "<:error:466995152976871434> The admin role is already set to that!"
        );
    };

    let roleExists = message.guild.roles.find(r => r.name === args.join(" "));
    if (!roleExists) {
        return message.channel.send(
        "<:error:466995152976871434> The specified role does not exist."
        );
		}

    client.settings.set(message.guild.id, roleExists.id, "adminRole");
    
    message.channel.send(
      `<:success:466995111885144095> The admin role has been set to \`${joinedValue}\`
      `);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Server Owner",
  requiredPerms: []
};

exports.help = {
  name: "adminrole",
  category: "Configure",
  description: "Sets the admin role for this server.",
  usage: "adminrole [role]"
};
