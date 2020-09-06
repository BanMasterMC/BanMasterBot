const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    const opts = {
      args: ['<time in minutes> [thing]'],
    }
    super('remindme', opts)
  }

  async run(msg, lang, args, sendDeletable) {
    if (!args[1]) return sendDeletable(lang.invalid_args)
    const number = Number.parseInt(args[1])
    if (isNaN(number)) return sendDeletable('時間を指定してください。(分)')
    setTimeout(() => {
      msg.channel.send(`${msg.author} ${args.slice(2)}`)
    }, number*60*1000)
    msg.channel.send(`${number}分後にメンションで通知されます。`)
  }
}
