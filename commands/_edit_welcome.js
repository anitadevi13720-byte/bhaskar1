/*CMD
  command: /edit_welcome
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('📝 **Send the new Welcome Text**:');
User.setProperty('ADMIN_STATE', 'EDIT_WELCOME', 'string');
