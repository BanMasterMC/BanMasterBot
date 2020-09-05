const env = require('dotenv-safe').config().parsed
const { Client } = require('discord.js')
const client = new Client()
const dispatcher = require('bot-framework/dispatcher')
const lang = require('./lang/ja.json')
const prefix = env.PREFIX
const { LoggerFactory } = require('logger.js')
const logger = LoggerFactory.getLogger('client', 'purple')

client.on('ready', () => {
  client.user.setStatus('invisible')
  logger.info(`Client is now ready! (User: ${client.user.tag})`)
})

client.on('message', async msg => {
  if (msg.author.bot || msg.system || msg.author.system) return
  if (msg.content.startsWith(prefix)) {
    dispatcher(msg, lang, prefix, env.ADMINS.split(','), prefix).catch(e => {
      logger.error(e.stack || e)
    })
  }
})

process.on('SIGINT', async () => {
  client.destroy()
  logger.info('Successfully disconnected from Discord.')
  process.exit()
})

logger.info('Logging into Discord')
client.login(env.TOKEN)

module.exports = client
