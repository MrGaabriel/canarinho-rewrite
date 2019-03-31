class EventListener {

  constructor (eventName) {
    this.eventName = eventName
  }

  run(...args) {}

  register(client) {
    this.client = client

    client.on(this.eventName, (...args) => this.run(...args))
  }
}

module.exports = EventListener

