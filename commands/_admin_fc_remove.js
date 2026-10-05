/*CMD
  command: /admin_fc_remove
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('➖ Send the Channel ID or Username to remove (Format: @channel)');
User.setProperty('ADMIN_STATE', 'REMOVE_CHANNEL', 'string');
