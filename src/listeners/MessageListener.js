const EventListener = require("../structures/EventListener")

class MessageListener extends EventListener {

  constructor () {
    super("message")
  }

  run(message) {
    if (message.author.bot)
      return

    this.client.commands.forEach((command) => {
      if (command.handle(message))
        return
    })
  }
}

module.exports = MessageListener