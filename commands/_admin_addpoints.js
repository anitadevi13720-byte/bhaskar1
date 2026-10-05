/*CMD
  command: /admin_addpoints
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('➕ Send User ID and Points to add (Format: UserID Points)');
User.setProperty('ADMIN_STATE', 'ADD_POINTS', 'string');