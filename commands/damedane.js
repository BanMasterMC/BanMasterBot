const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('damedane')
  }

  async run(msg) {
    if (!msg.guild.me.voice.connection) return
    msg.guild.me.voice.connection.play(process.env.damedane, { volume: 0.5 })
  }
}
