/*CMD
  command: /admin_ban
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('🚫 Send User ID to ban:');
User.setProperty('ADMIN_STATE', 'BAN', 'string');