'use strict';

var _require = require('wechaty');

const Wechaty = _require.Wechaty; // import { Wechaty } from 'wechaty'

Wechaty.instance() // Singleton
.on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`)).on('login', user => console.log(`User ${user} logined`)).on('message', message => console.log(`Message: ${message}`)).init();