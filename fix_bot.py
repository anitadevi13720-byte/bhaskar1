import os

commands_dir = r'c:\Users\pawan\Downloads\promo\commands'

def write_file(name, content):
    with open(os.path.join(commands_dir, name), 'w', encoding='utf-8') as f:
        f.write(content)

admin_cmds = {
    '_admin_addpoints.js': "Bot.sendMessage('➕ Send User ID and Points to add (Format: UserID Points)');\nUser.setProperty('ADMIN_STATE', 'ADD_POINTS', 'string');",
    '_admin_rmpoints.js': "Bot.sendMessage('➖ Send User ID and Points to remove (Format: UserID Points)');\nUser.setProperty('ADMIN_STATE', 'RM_POINTS', 'string');",
    '_admin_ban.js': "Bot.sendMessage('🚫 Send User ID to ban:');\nUser.setProperty('ADMIN_STATE', 'BAN', 'string');",
    '_admin_unban.js': "Bot.sendMessage('✅ Send User ID to unban:');\nUser.setProperty('ADMIN_STATE', 'UNBAN', 'string');",
    '_admin_checkkey.js': "Bot.sendMessage('🔍 Send the key you want to verify...\\nExample: KEY-A3F-...');\nUser.setProperty('ADMIN_STATE', 'CHECK_KEY', 'string');",
    '_admin_broadcast.js': "Bot.sendMessage('📢 Send the message you want to broadcast to all users:');\nUser.setProperty('ADMIN_STATE', 'BROADCAST', 'string');",
    '_admin_channels.js': "Bot.sendMessage('📣 Send Channel ID/Username and URL to add (Format: @channel https://t.me/channel) or use /remove_channel');\nUser.setProperty('ADMIN_STATE', 'ADD_CHANNEL', 'string');"
}

for file, content in admin_cmds.items():
    cmd_name = file.replace('.js', '').replace('_', '', 1)
    if cmd_name == 'admin_checkkey':
        cmd_name = 'admin_checkkey'
    
    header = f"/*CMD\n  command: /{cmd_name}\n  help: \n  need_reply: false\n  auto_retry_time: \n  folder: \nCMD*/\n"
    write_file(file, header + content)

all_js_content = """/*CMD
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
    else if (status == 'USED') { Bot.sendMessage('🔑 Key: ' + message + ' \\nStatus: USED'); }
    else { 
        Bot.sendMessage('🔑 Key: ' + message + ' \\nStatus: UNUSED'); 
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
"""
write_file('all.js', all_js_content)

import glob
for f in glob.glob(os.path.join(commands_dir, '_do_*.js')):
    os.remove(f)
