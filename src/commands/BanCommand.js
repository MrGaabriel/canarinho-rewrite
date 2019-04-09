const Command = require("../structures/Command")

class BanCommand extends Command {

	constructor () {
		super("ban", ["banir"])

		this.usage = "<usuário> [motivo]"

		this.memberPermissions = ["BAN_MEMBERS"]
		this.botPermissions = ["BAN_MEMBERS"]
	}

	async run (message, args) {
		if (args.length === 0) {
			this.explain(message)
			return
		}

		const user = message.mentions.users.first() || await this.client.fetchUser(args[0])

		if (!user) {
			message.reply("Usuário não encontrado!")
			return
		}

		const member = message.guild.member(user)

		if (member) {
			if (!member.bannable) {
				message.reply("Eu não consigo banir este usuário! Talvez os meus cargos estejam abaixo dos dele. :sob:")
				return
			}

			if (message.member.highestRole.comparePositionTo(member.highestRole) < 0) {
				message.reply("Você não pode banir este usuário!")
				return
			}
		}

		args.shift()
		const reason = args.length !== 0 ? args.join(" ") : "Sem motivo definido"

		await message.guild.ban(user, { reason: `Punido por ${message.author.tag} - Motivo: ${reason}` })

		message.reply("Usuário banido com sucesso!")
	}

}

module.exports = BanCommand