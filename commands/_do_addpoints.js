let inp = message.split(' ');
let tgt = inp[0];
let addP = parseInt(inp[1]);
let currBal = Bot.getProperty('balance_' + tgt, 0);
Bot.setProperty('balance_' + tgt, currBal + addP, 'integer');
Bot.sendMessage('✅ Added ' + addP + ' points to ' + tgt);
Api.sendMessage({chat_id: tgt, text: '🎉 Admin added ' + addP + ' points to your balance!'});
