const Robot = require('tuling123-client')
const robot = new Robot('0a4114ff7687944016c9d50a07eb0f50')
robot.ask('你好', {userid: 'wwx'}).then((data) => console.log(data))