require("colors")

const { Client } = require("discord.js")
const { readSync } = require("readdir")

const Extensions = require("./utils/Extensions")

const moment = require("moment")

class Canarinho extends Client {

	constructor (options = {}) {
		super(options)
	}

	async start(token) {
		try {
			this.commands = []

			await this.login(token)

			this.registerListeners()
			this.registerCommands()

			new Extensions(this).loadExtensions()

			this.info("Canarinho inicializado com sucesso!")
			this.info(`${this.user.tag} - ${this.user.id}`)
		} catch (err) {
			this.error(`Erro!\n${err.stack}`)
		}
	}

	registerListeners() {
		const folder = readSync("./src/listeners")

		folder.forEach((file) => {
			const EventListener = require(`./listeners/${file}`)
			const listener = new EventListener()

			listener.register(this)
		})
	}

	registerCommands() {
		this.commands = []

		const folder = readSync("./src/commands")

		folder.forEach((file) => {
			const Command = require(`./commands/${file}`)
			const command = new Command()

			command.register(this)
		})
	}

	info(msg, ...args) {
		console.log(`[${moment().format("HH:mm:ss.SSS")}]`.yellow, `[${"INFO".blue}]`, msg, ...args)
	}
	
	debug(msg, ...args) {  
		console.log(`[${moment().format("HH:mm:ss.SSS")}]`.yellow, `[${"DEBUG".magenta}]`, msg, ...args)
	}

	warn(msg, ...args) {
		console.log(`[${moment().format("HH:mm:ss.SSS")}]`.yellow, `[${"WARN".yellow}]`, msg, ...args)
	}

	error(msg, ...args) {
		console.log(`[${moment().format("HH:mm:ss.SSS")}]`.yellow, `[${"ERROR".red}]`, msg, ...args)
	}

}

module.exports = Canarinho