'use strict';

var _wechaty = require('wechaty');

const qrcodeTerminal = require('qrcode-terminal');
const Tuling123 = require('tuling123-client');

/**
 * Change `import { ... } from '../'`
 * to     `import { ... } from 'wechaty'`
 * when you are runing with Docker or NPM instead of Git Source.
 */


// const config = wechaty.config
// const log = wechaty.log
// const Wechaty = wechaty.wechaty
// log.level = 'verbose'
// log.level = 'silly'

/**
 *
 * Apply Your Own Tuling123 Developer API_KEY at:
 * http://www.tuling123.com
 *
 */
const TULING123_API_KEY = 'e5bf4a83cbcd4f90b931e9bc56c616f5';
const tuling = new Tuling123(TULING123_API_KEY);

const bot = _wechaty.Wechaty.instance({ profile: _wechaty.config.DEFAULT_PROFILE });

console.log(`
Welcome to Tuling Wechaty Bot.
Tuling API: http://www.tuling123.com/html/doc/api.html
Notice: This bot will only active in the room which name contains 'wechaty'.
/* if (/Wechaty/i.test(room.get('name'))) { */
Loading...
`);

bot.on('login', user => _wechaty.log.info('Bot', `bot login: ${user}`)).on('logout', e => _wechaty.log.info('Bot', 'bot logout.')).on('scan', (url, code) => {
  if (!/201|200/.test(String(code))) {
    const loginUrl = url.replace(/\/qrcode\//, '/l/');
    qrcodeTerminal.generate(loginUrl);
  }
  console.log(`${url}\n[${code}] Scan QR Code in above url to login: `);
}).on('message', async msg => {
  // Skip message from self, or inside a room
  //if (msg.self() || msg.room()) return

  _wechaty.log.info('Bot', 'talk: %s', msg);

  try {
    const reply = tuling.ask(msg.content(), { userid: msg.from() });
    _wechaty.log.info('Tuling123', 'Talker reply:"%s" for "%s" ', reply, msg.content());
    msg.say(reply);
  } catch (e) {
    _wechaty.log.error('Bot', 'on message tuling.ask() exception: %s', e && e.message || e);
  }
});

bot.init().catch(e => {
  _wechaty.log.error('Bot', 'init() fail:' + e);
  bot.quit();
  process.exit(-1);
});