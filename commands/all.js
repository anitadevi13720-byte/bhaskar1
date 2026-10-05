let isBanned = User.getProperty('isBanned');
if (isBanned) {
    Bot.sendMessage('❌ You are banned from using this bot.');
    return;
}

let channels = Bot.getProperty('forceChannels', []);
let mustJoin = false;
if (channels.length > 0) {
    for (let i = 0; i < channels.length; i++) {
        let ch = channels[i];
        let status = Api.getChatMember({chat_id: ch.id, user_id: user.telegramid});
        if (status.status == 'left' || status.status == 'kicked') {
            mustJoin = true;
            break;
        }
    }
}

if (mustJoin) {
    let buttons = [];
    for (let i = 0; i < channels.length; i++) {
        buttons.push([{title: 'Join Channel', url: channels[i].url}]);
    }
    buttons.push([{title: '✅ Joined', command: '/checkjoin'}]);
    Bot.sendInlineKeyboard(buttons, '⚠️ **In order to use the bot you must join our channel(s):**');
    return;
}
