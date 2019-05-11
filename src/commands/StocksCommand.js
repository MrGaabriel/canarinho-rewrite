const Command = require("../structures/Command")

const { RichEmbed } = require("discord.js")

const moment = require("moment")
const axios = require("axios")

class StocksCommand extends Command {

	constructor () {
		super("stocks")

		this.aliases = ["quotes", "bolsa", "bolsadevalores"]
		this.usage = "<symbol>"
	}

	async run(message, args) {
		if (args.length === 0) {
			return this.explain(message)
		}

		const symbol = args[0]

		try {
			const info = await this.fetchStocksInfo(symbol)
			const embed = new RichEmbed()

			embed.setTitle("📊 Bolsa de Valores - Informações de \"" + info.symbol + "\"")
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL)

			embed.addField("💸 Valor", info.price, true)
			embed.addField("📈 Alta", info.high, true)
			embed.addField("📉 Baixa", info.low, true)
			embed.addField("🕖 Abertura", info.open, true)
			embed.addField("⛔ Fechamento anterior", info.previousClose, true)
			embed.addField("🔀 Mudança", info.change, true)
			embed.addField("🔀 Mudança %", info.changePercent, true)

			const date = moment(info.latestTradingDay)
			embed.addField("📆 Último dia de trading", date.format("DD/MM/YYYY"), true)

			embed.setTimestamp(new Date())
			embed.setColor("#7289DA")

			message.channel.send({ embed })
		} catch (err) {
			if (err.toString().includes("is not a valid symbol!")) {
				message.reply(`\`${symbol}\` não é válido! Exemplo: \`^BVSP\``)
			}
		}
	}

	async fetchStocksInfo(symbol) {
		const key = process.env.ALPHAVANTAGE_KEY

		const request = await axios.get(
			"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + key,
			{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"}
		)

		const data = request.data
		const globalQuote = data["Global Quote"]

		if (globalQuote.isEmpty())
			throw Error(`${symbol} is not a valid symbol!`)

		return {
			symbol: globalQuote["01. symbol"],
			open: globalQuote["02. open"],
			high: globalQuote["03. high"],
			low: globalQuote["04. low"],
			price: globalQuote["05. price"],
			volume: globalQuote["06. volume"],
			latestTradingDay: globalQuote["07. latest trading day"],
			previousClose: globalQuote["08. previous close"],
			change: globalQuote["09. change"],
			changePercent: globalQuote["10. change percent"]
		}
	}

}

module.exports = StocksCommand