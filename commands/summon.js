const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('summon')
  }

  async run(msg) {
    if (!msg.member.voice.channel) return
    await msg.member.voice.channel.join()
  }
}
