const { MessageEmbed, Permissions: { FLAGS } } = require('discord.js')
const { Command } = require('bot-framework')
const temp = require('../temp')

module.exports = class extends Command {
  constructor() {
    super('verify')
  }

  async run(msg) {
    if (msg.channel.id === '739872714126524427') {
      let channel = msg.guild.channels.cache.filter(r => r.name === `verify-${msg.author.id}`)
      if (channel.size === 0) {
        channel = await msg.guild.channels.create(`verify-${msg.author.id}`, {
          type: 'text',
          parent: '739872634245742652',
          reason: `${msg.author.tag}によるAPI申請(自動)`,
        })
        channel.overwritePermissions(
          [
            { id: msg.guild.roles.cache.find(r => r.name.endsWith('everyone')), deny: FLAGS.VIEW_CHANNEL + FLAGS.READ_MESSAGE_HISTORY },
            { id: msg.member, allow: FLAGS.VIEW_CHANNEL + FLAGS.READ_MESSAGE_HISTORY, deny: FLAGS.SEND_MESSAGES },
          ],
        )
      } else {
        channel = msg.guild.channels.cache.find(r => r.name === `verify-${msg.author.id}`)
      }
      const invite = await msg.client.channels.cache.get('750627703128064053').createInvite({ maxUses: 1, unique: true })
      const embed = new MessageEmbed()
        .setTitle('APIの申請プロセス')
        .setDescription(`電話番号認証が必要です。\n${invite.url} で\`!verify\`と打ってください。`)
        .setColor([255, 0, 0])
      const message = await channel.send(embed)
      channel.send(`<@${msg.author.id}>`).then(m => m.delete())
      temp.verifyChannels[msg.author.id] = message.id
    } else if (msg.channel.id === '750627703128064053') {
      msg.member.kick('電話番号認証完了')
      const embed = new MessageEmbed()
        .setTitle('APIの申請プロセス')
        .setDescription('電話番号認証が完了しました。\nhttps://banmaster.dev/api_message_generator.html から生成したメッセージをここに貼り付けてください。')
        .setColor([0, 255, 0])
      const channel =  msg.client.guilds.cache.get('739870152140783667').channels.cache.find(r => r.name === `verify-${msg.author.id}`)
      channel.overwritePermissions([{ id: msg.author.id, allow: 2048 + 1024 }])
      if (temp.verifyChannels[msg.author.id]) {
        const message = await channel.messages.fetch(temp.verifyChannels[msg.author.id])
        message.edit(embed)
      } else {
        channel.send(embed)
      }
      delete temp.verifyChannels[msg.author.id]
    }
  }
}
