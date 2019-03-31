const { Message } = require("discord.js")

class Extensions {

  constructor (client) {
    this.client = client
  }

  loadExtensions() {
    Message.prototype.reply = function (options = {}) {
      return this.channel.send(this.author, options)
    }

    Message.prototype.reply = function (msg) {
      return this.channel.send(`${this.author} ${msg}`)
    }

    Message.prototype.reply = function (msg, options = {}) {
      return this.channel.send(`${this.author} ${msg}`, options)
    }
  }

}

module.exports = Extensions