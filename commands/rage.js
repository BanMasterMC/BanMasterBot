const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('rage')
  }

  async run(msg) {
    if (!msg.guild.me.voice.connection) return
    msg.guild.me.voice.connection.play(process.env.rage, { volume: 0.5 })
  }
}
