const Command = require("../structures/Command")

const axios = require("axios")

class CurrencyCommand extends Command {

	constructor () {
		super("currency")

		this.usage = "<from> <to> <quantity>"
		this.aliases = ["exchange", "money"]
	}

	async run(message, args) {
		if (args.length === 0) {
			return this.explain(message)
		}

		const from = args[0]
		const to = args[1]

		const quantity = parseInt(args[2]) || 1

		const request = await axios.get("https://api.exchangeratesapi.io/latest?base=" + from, { "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.27 Safari/537.36" })
		const converted = request.data.rates[to] * quantity

		message.reply(`**\`${from}\`** -> **\`${to}\` »** \`${converted} ${to}\` 💸`)
	}
}

module.exports = CurrencyCommand