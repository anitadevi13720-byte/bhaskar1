/*CMD
  command: /admin_broadcast
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('📢 Send the message you want to broadcast to all users:');
User.setProperty('ADMIN_STATE', 'BROADCAST', 'string');