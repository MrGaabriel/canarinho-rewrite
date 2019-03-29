class Command {

  constructor (label, aliases = [], onlyOwner = false) {
    this.label = label
    this.aliases = aliases

    this.onlyOwner = onlyOwner
  }

  run(context) {}
}

module.exports = Command