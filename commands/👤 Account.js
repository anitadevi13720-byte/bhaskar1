let balance = Bot.getProperty('balance_' + user.telegramid);
if (balance === undefined) { balance = User.getProperty('balance', 0); Bot.setProperty('balance_' + user.telegramid, balance, 'integer'); }
let accTxt = '👤 **USER CONSOLE**\n\nNAME: ' + user.first_name + '\nUSER ID: `' + user.telegramid + '`\nBALANCE: ' + balance + ' Points';
Bot.sendMessage(accTxt);
