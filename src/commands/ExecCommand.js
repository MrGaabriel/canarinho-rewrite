const Command = require("../structures/Command")

const { exec } = require("child_process")

class ExecCommand extends Command {
    
    constructor () {
        super("exec")

        this.aliases = ["bash", "cmd"]
        this.onlyOwner = true
    }

    async run (message, args) {
        const cmd = args.join(" ")
        const process = exec(cmd)
        
        const msg = await message.reply("Executando `" + cmd + "`... (se não houver resposta, provavelmente o processo é inválido)")
        await msg.react("cancel:580206323313016832")

        const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id && reaction.emoji.id === "580206323313016832")
        collector.on("collect", async (reaction, user) => {
            await process.kill()

            reaction.remove()
            msg.edit(output + "\n\nKilled```")
        })

        let output = "```"
        process.stdout.on("data", (data) => {
            output += data

            msg.edit(output + "```")
        })

        process.stderr.on("data", (data) => {
            output += data

            msg.edit(output + "```")
        })

        process.on("exit", (code) => {
            if (code === null) 
                return

            msg.edit(output + "Exited with code " + code + "```")
        })
    }

}

module.exports = ExecCommand