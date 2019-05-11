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

		Object.prototype.isEmpty = function() {
			for(const key in this) {
				if(this.hasOwnProperty(key))
					return false
			}
			return true
		}
	}

}

module.exports = Extensions