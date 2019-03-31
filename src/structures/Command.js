class Command {

  constructor (label, aliases = [], onlyOwner = false) {
    this.label = label
    this.aliases = aliases

    this.onlyOwner = onlyOwner
  }

  run(message, args) {}

  register(client) {
    this.client = client

    client.commands.push(this)
  }

  handle(message) {
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

        if (this.onlyOwner && message.author.id !== process.env.OWNER_ID) {
          message.reply("Você não tem permissão para executar este comando!")
          return
        }

        this.run(message, args)

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
}

module.exports = Command