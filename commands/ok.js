const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('ok')
  }

  async run(msg) {
    if (!msg.guild.me.voice.connection) return
    msg.guild.me.voice.connection.play(process.env.ok, { volume: 0.5 })
  }
}
