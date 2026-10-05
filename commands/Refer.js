let pt = Bot.getProperty('referPoint', 2);
let refLink = 'https://t.me/' + bot.name + '?start=' + user.telegramid;
let refTxt = '🎁 **REFERRAL SYSTEM**\n\nShare your link to earn points!\nYou earn ' + pt + ' point(s) per friend.\n\n🔗 Your link: ' + refLink;
Bot.sendMessage(refTxt);
