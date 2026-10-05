/*CMD
  command: /admin_fc_add
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('📣 Send Channel ID/Username and URL to add (Format: @channel https://t.me/channel)');
User.setProperty('ADMIN_STATE', 'ADD_CHANNEL', 'string');
