const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('sad')
  }

  async run(msg) {
    if (!msg.guild.me.voice.connection) return
    msg.guild.me.voice.connection.play(process.env.sad, { volume: 0.5 })
  }
}
