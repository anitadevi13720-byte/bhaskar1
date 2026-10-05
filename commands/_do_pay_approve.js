let tUser = User.getProperty('targetApprove');
let ptAdd = parseInt(message);
let b = Bot.getProperty('balance_' + tUser, 0);
Bot.setProperty('balance_' + tUser, b + ptAdd, 'integer');
Api.sendMessage({chat_id: tUser, text: '✅ **Payment Approved!**\nAdmin added ' + ptAdd + ' points to your balance.'});
Bot.sendMessage('✅ Approved ' + ptAdd + ' points for ' + tUser);
