let inp2 = message.split(' ');
let tgt2 = inp2[0];
let rmP = parseInt(inp2[1]);
let currBal2 = Bot.getProperty('balance_' + tgt2, 0);
Bot.setProperty('balance_' + tgt2, currBal2 - rmP, 'integer');
Bot.sendMessage('✅ Removed ' + rmP + ' points from ' + tgt2);
