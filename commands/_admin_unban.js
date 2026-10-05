/*CMD
  command: /admin_unban
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('✅ Send User ID to unban:');
User.setProperty('ADMIN_STATE', 'UNBAN', 'string');