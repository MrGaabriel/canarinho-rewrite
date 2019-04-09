const { RichEmbed } = require("discord.js")

class Command {

  constructor (label, aliases = []) {
    this.label = label
    this.aliases = aliases

    this.usage = ""

    this.onlyOwner = false
    this.memberPermissions = []
    this.botPermissions = []
  }

  run(message, args) {}

  register(client) {
    this.client = client

    client.commands.push(this)
  }

  async handle(message) {
    const rawArgs = message.content.split(" ")
    const usedLabel = rawArgs[0]

    const prefix = process.env.PREFIX

    if (prefix + this.label === usedLabel) {
      try {
        const start = Date.now()
        this.client.info("[COMMAND EXECUTED]".yellow, `(${message.guild.name} -> #${message.channel.name}) ${message.author.tag}: ${message.content}`)

        message.channel.startTyping()

        const args = rawArgs
        args.shift()

        const missingMemberPermissions = this.memberPermissions.filter((permission) => !message.member.hasPermission(permission))

        if (missingMemberPermissions.length !== 0) { // ;w;
          message.reply("Você não tem permissão para executar este comando!")
          return true
        }

        const missingBotPermissions = this.botPermissions.filter((permission) => !message.guild.me.hasPermission(permission))

        if (missingBotPermissions.length !== 0) {
          message.reply(`Eu não consigo executar este comando pois eu preciso das permissões \`${missingBotPermissions.join(", ")}\`!`)
          return true
        }

        if (this.onlyOwner && message.author.id !== process.env.OWNER_ID) {
          message.reply("Você não tem permissão para executar este comando!")
          return true
        }

        await this.run(message, args)

        this.client.info("[COMMAND EXECUTED]".green, `(${message.guild.name} -> #${message.channel.name}) ${message.author.tag}: ${message.content} - OK! Finished in ${Date.now() - start}ms`)
      } catch (err) {
        message.reply("Um erro inesperado ocorreu enquanto eu tentava executar este comando! Desculpe-me.")

        this.client.error("[COMMAND EXECUTED]".green, `(${message.guild.name} -> #${message.channel.name}) ${message.author.tag}: ${message.content} - ERROR!\n${err.stack}`)
      }

      message.channel.stopTyping()

      return true
    }

    return false
  }

  async explain(message) {
    const label = process.env.PREFIX + this.label
    const embed = new RichEmbed()

    embed.setAuthor(message.author.tag, message.author.displayAvatarURL)

    embed.setTitle(":thinking: `" + label + "`")

    embed.addField(":interrobang: Como usar?", `${label} ${this.usage}`, false)

    embed.setColor("#2C2F33")

    embed.setFooter("Executado")
    embed.setTimestamp(new Date())

    message.reply({ embed })
  }
}

module.exports = Command