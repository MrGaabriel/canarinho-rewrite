const Command = require("../structures/Command")

class ReloadCommand extends Command {

    constructor () {
        super("reload")

        this.onlyOwner = true
    }

    async run(message, args) {
        switch (args[0]) {
            case "commands": {
                const oldCmds = this.client.commands
                this.client.registerCommands()

                const cmds = this.client.commands
                
                message.reply(`Comandos recarregados! ${cmds.length} comandos e ${cmds.length - oldCmds.length} novos comandos`)
            }
        }
    }

}

module.exports = ReloadCommand