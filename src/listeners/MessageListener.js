const EventListener = require("../structures/EventListener")

class MessageListener extends EventListener {

  constructor () {
    super("message")
  }

  run(message) {
    if (message.author.bot)
      return

    const rawArgs = message.content.split(" ")
    const label = rawArgs[0]

    const prefix = process.env.PREFIX

    this.canarinho.commands.forEach((command) => {
      if (label === prefix + command.label || command.aliases.map((label) => prefix + label).includes(label)) {
        try {
          const start = Date.now()

          this.canarinho.info("[COMMAND EXECUTED]".yellow, `(${message.guild.name} -> #${message.channel.name}) ${message.author.tag}: ${message.content}`)

          message.channel.startTyping()

          const args = rawArgs
          args.shift()

          if (command.onlyOwner && message.author.id !== process.env.OWNER_ID) {
            message.reply("Você não tem permissão para usar isto!")
            return
          }

          command.run(message, args)

          this.canarinho.info("[COMMAND EXECUTED]".green, `(${message.guild.name} -> #${message.channel.name}) ${message.author.tag}: ${message.content} - OK! Finished in ${Date.now() - start}ms`)
        } catch (err) {
          message.reply("Um erro inesperado ocorreu enquanto eu tentava executar este comando! Desculpe-me.")

          this.canarinho.error("[COMMAND EXECUTED]".green, `(${message.guild.name} -> #${message.channel.name}) ${message.author.tag}: ${message.content} - ERROR!\n${err.stack}`)
        }

        message.channel.stopTyping()
      }
    })
  }
}

module.exports = MessageListener