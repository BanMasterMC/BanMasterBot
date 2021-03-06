const { MessageEmbed, Permissions: { FLAGS } } = require('discord.js')
const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('approve', { permission: 8 })
  }

  async run(msg) {
    if (!msg.channel.name.startsWith('verify-')) return
    msg.channel.setParent('751831892331986996')
    msg.channel.overwritePermissions(
      [
        { id: msg.guild.roles.cache.find(r => r.name.endsWith('everyone')), deny: FLAGS.VIEW_CHANNEL + FLAGS.READ_MESSAGE_HISTORY },
        { id: msg.member, allow: FLAGS.VIEW_CHANNEL + FLAGS.READ_MESSAGE_HISTORY, deny: FLAGS.SEND_MESSAGES },
      ],
    )
    const embed = new MessageEmbed()
      .setTitle('API申請は**承認**されました。')
      .setColor([0, 255, 0])
    msg.channel.send(embed)
  }
}
