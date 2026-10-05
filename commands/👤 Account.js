let balance = User.getProperty('balance', 0);
let accTxt = '👤 **USER CONSOLE**\n\nNAME: ' + user.first_name + '\nUSER ID: `' + user.telegramid + '`\nBALANCE: ' + balance + ' Points';
Bot.sendMessage(accTxt);
