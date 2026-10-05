/*CMD
  command: *
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let state = User.getProperty('ADMIN_STATE');
if (!state || !message) { return; }

if (state == 'ADD_POINTS') {
    let inp = message.split(' ');
    let tgt = inp[0];
    let addP = parseInt(inp[1]);
    if(tgt && addP) {
        let currBal = Bot.getProperty('balance_' + tgt, 0);
        Bot.setProperty('balance_' + tgt, currBal + addP, 'integer');
        Bot.sendMessage('✅ Added ' + addP + ' points to ' + tgt);
        Api.sendMessage({chat_id: tgt, text: '🎉 Admin added ' + addP + ' points to your balance!'});
    } else { Bot.sendMessage('❌ Invalid format.'); }
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'RM_POINTS') {
    let inp = message.split(' ');
    let tgt = inp[0];
    let rmP = parseInt(inp[1]);
    if(tgt && rmP) {
        let currBal = Bot.getProperty('balance_' + tgt, 0);
        Bot.setProperty('balance_' + tgt, currBal - rmP, 'integer');
        Bot.sendMessage('✅ Removed ' + rmP + ' points from ' + tgt);
    } else { Bot.sendMessage('❌ Invalid format.'); }
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'BAN') {
    Bot.setProperty('banned_' + message, true, 'boolean');
    Bot.sendMessage('✅ User ' + message + ' has been banned.');
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'UNBAN') {
    Bot.setProperty('banned_' + message, false, 'boolean');
    Bot.sendMessage('✅ User ' + message + ' has been unbanned.');
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'CHECK_KEY') {
    let status = Bot.getProperty('key_' + message);
    if (!status) { Bot.sendMessage('❌ Invalid Key.'); }
    else if (status == 'USED') { Bot.sendMessage('🔑 Key: ' + message + ' \nStatus: USED'); }
    else { 
        Bot.sendMessage('🔑 Key: ' + message + ' \nStatus: UNUSED'); 
        Bot.setProperty('key_' + message, 'USED', 'string');
    }
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'BROADCAST') {
    Bot.sendMessageToAllPrivateChats(message);
    Bot.sendMessage('✅ Broadcast sent.');
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'ADD_CHANNEL') {
    if (message == '/remove_channel') {
        Bot.setProperty('forceChannels', [], 'json');
        Bot.sendMessage('✅ Force channels removed.');
    } else {
        let inp = message.split(' ');
        if (inp.length >= 2) {
            let ch = Bot.getProperty('forceChannels', []);
            ch.push({id: inp[0], url: inp[1], name: inp[0]});
            Bot.setProperty('forceChannels', ch, 'json');
            Bot.sendMessage('✅ Force channel added!');
        } else {
            Bot.sendMessage('❌ Invalid format.');
        }
    }
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}
