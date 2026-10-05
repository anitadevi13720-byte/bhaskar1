/*CMD
  command: /admin_rmpoints
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('➖ Send User ID and Points to remove (Format: UserID Points)');
User.setProperty('ADMIN_STATE', 'RM_POINTS', 'string');