/*CMD
  command: *
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let state = User.getProperty('ADMIN_STATE');
if (!state || !message) { return; }

if (state == 'EDIT_WELCOME') {
    Bot.setProperty('welcomeText', message, 'string');
    Bot.sendMessage('✅ Welcome text updated!');
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'EDIT_RDP') {
    Bot.setProperty('rdpText', message, 'string');
    Bot.sendMessage('✅ RDP text updated!');
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'EDIT_REF') {
    let pts = parseInt(message);
    if(pts >= 0) {
        Bot.setProperty('referPoint', pts, 'integer');
        Bot.sendMessage('✅ Referral bonus updated to ' + pts + ' points!');
    } else {
        Bot.sendMessage('❌ Invalid number.');
    }
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

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
    let inp = message.split(' ');
    if (inp.length >= 2) {
        let ch = Bot.getProperty('forceChannels', []);
        ch.push({id: inp[0], url: inp[1], name: inp[0], type: "Channel", enabled: true});
        Bot.setProperty('forceChannels', ch, 'json');
        Bot.sendMessage('✅ Force channel added!');
    } else {
        Bot.sendMessage('❌ Invalid format.');
    }
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}

if (state == 'REMOVE_CHANNEL') {
    let ch = Bot.getProperty('forceChannels', []);
    let newCh = [];
    let found = false;
    for (let i = 0; i < ch.length; i++) {
        if (ch[i].id != message && ch[i].name != message) {
            newCh.push(ch[i]);
        } else {
            found = true;
        }
    }
    if (found) {
        Bot.setProperty('forceChannels', newCh, 'json');
        Bot.sendMessage('✅ Force channel removed!');
    } else {
        Bot.sendMessage('❌ Channel not found.');
    }
    User.setProperty('ADMIN_STATE', '', 'string');
    return;
}
