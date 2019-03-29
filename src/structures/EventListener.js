class EventListener {

  constructor (eventName) {
    this.eventName = eventName
  }

  run(...args) {}

  register(canarinho) {
    this.canarinho = canarinho

    canarinho.on(this.eventName, (...args) => this.run(...args))
  }
}

module.exports = EventListener

