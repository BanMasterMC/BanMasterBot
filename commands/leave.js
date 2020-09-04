const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('leave')
  }

  async run(msg) {
    if (!msg.guild.me.voice.connection) return
    await msg.guild.me.voice.connection.leave()
  }
}
