const Command = require("../structures/Command")

const axios = require("axios")
const cheerio = require("cheerio")

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

		const quantity = parseFloat(args[2]) || 1

		const converted = await this.convert(quantity, from, to)

		message.reply(`**\`${quantity} ${from}\`** -> **\`${to}\` »** \`${converted} ${to}\` 💸`)
	}
	
	async convert(quantity, from, to) {
		const request = await axios.get(`https://www.investing.com/currencies/${from.toLowerCase()}-${to.toLowerCase()}`)
		const body = request.data

		const $ = cheerio.load(body)

		const text = $('#last_last').text()
		const rate = parseFloat(text)

		const converted = rate * quantity

		return converted
	}
}

module.exports = CurrencyCommand