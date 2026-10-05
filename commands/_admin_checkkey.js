/*CMD
  command: /admin_checkkey
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('🔍 Send the key you want to verify...\nExample: KEY-A3F-...');
User.setProperty('ADMIN_STATE', 'CHECK_KEY', 'string');