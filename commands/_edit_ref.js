/*CMD
  command: /edit_ref
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
Bot.sendMessage('🎁 **Send the new Referral Bonus (Points)**:\n(For example, send 5)');
User.setProperty('ADMIN_STATE', 'EDIT_REF', 'string');
