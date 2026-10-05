/*CMD
  command: /admin_fc_list
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let ch = Bot.getProperty('forceChannels', []);
if (ch.length == 0) {
    Bot.sendMessage('📋 No force channels added.');
} else {
    let msg = '📋 **Force Channels:**\n\n';
    for (let i = 0; i < ch.length; i++) {
        msg += (i+1) + '. ' + ch[i].name + '\n';
    }
    Bot.sendMessage(msg);
}
