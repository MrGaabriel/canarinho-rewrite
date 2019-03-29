const Command = require("../structures/Command")

const { inspect } = require("util")
const { RichEmbed } = require("discord.js")

class EvalCommand extends Command {

  constructor () {
    super("eval", ["evaluate"], true)
  }

  async run(message, args) {
    const code = args.join(" ")

    try {
      const evaluated = await eval(code)

      message.channel.send(inspect(evaluated, { depth: 0 }), { code: 'xl' })
    } catch (err) {
      const embed = new RichEmbed()
        .setTitle("Um erro inesperado ocorreu enquanto o comando estava sendo executado!")
        .setDescription("```" + err.stack + "```")
        .setColor("#FF0000")
        .setTimestamp(new Date())

      message.reply({ embed })
    }
  }

}

module.exports = EvalCommand