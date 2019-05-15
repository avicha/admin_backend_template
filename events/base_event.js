const EventEmitter = require('events')
module.exports = class BaseEvent extends EventEmitter {
  get name() {
    return this.constructor.name
  }
  get listeners() {
    return []
  }
  constructor() {
    super()
    for (let listener of this.listeners) {
      this.on('event', () => {
        if (listener.handle) {
          listener.handle(this)
        }
      })
    }
  }
}