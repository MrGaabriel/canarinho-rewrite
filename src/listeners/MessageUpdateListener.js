const EventListener = require("../structures/EventListener")

class MessageUpdateListener extends EventListener {

  constructor () {
    super("messageUpdate")
  }

  run(oldMessage, newMessage) {
    if (newMessage.author.bot)
      return

    this.client.commands.forEach((command) => {
      if (command.handle(newMessage))
        return
    })
  }

}

module.exports = MessageUpdateListener