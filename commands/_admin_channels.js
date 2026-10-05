/*CMD
  command: /admin_channels
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('📣 Send Channel ID/Username and URL to add (Format: @channel https://t.me/channel) or use /remove_channel');
User.setProperty('ADMIN_STATE', 'ADD_CHANNEL', 'string');