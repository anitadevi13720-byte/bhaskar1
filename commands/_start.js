let isUser = User.getProperty('isUser');
if (!isUser) {
    User.setProperty('isUser', true, 'boolean');
    User.setProperty('balance', 0, 'integer');
    
    if (message.includes(' ')) {
        let refId = message.split(' ')[1];
        if (refId != user.telegramid) {
            User.setProperty('referredBy', refId, 'string');
            let referPoint = Bot.getProperty('referPoint', 2);
            let refBal = Bot.getProperty('balance_' + refId, 0);
            Bot.setProperty('balance_' + refId, refBal + referPoint, 'integer');
            Api.sendMessage({
                chat_id: refId,
                text: '🎉 You got ' + referPoint + ' point(s) for a new referral!'
            });
            let refs = Bot.getProperty('refs_' + refId, 0);
            Bot.setProperty('refs_' + refId, refs + 1, 'integer');
        }
    }
    let totalUsers = Bot.getProperty('totalUsers', 0);
    Bot.setProperty('totalUsers', totalUsers + 1, 'integer');
}

let defaultWelcome = '🖥️ FREE + PAID RDP AVAILABLE\n🆓 Free RDP — limited availability\n💎 Premium RDP — faster & more stable servers\n⚡ Windows RDP | Linux VPS\n🤖 Fully automated Telegram bot\n🔐 Secure & reliable service\n\n🚀 Start the bot and choose your plan!';
let welcomeText = Bot.getProperty('welcomeText', defaultWelcome);
welcomeText = welcomeText.replace('{name}', user.first_name);

let keyboard = [
    [{title: '👤 Account', command: '👤 Account'}, {title: '🎁 Refer', command: '🎁 Refer'}],
    [{title: '🏧 Withdraw', command: '🏧 Withdraw'}, {title: '📊 Statistics', command: '📊 Statistics'}],
    [{title: '🎧 Support (Ticket)', command: '🎧 Support (Ticket)'}, {title: '🖥 Buy Private RDP', command: '🖥 Buy Private RDP'}],
    [{title: '📦 My Orders', command: '📦 My Orders'}]
];

Bot.sendKeyboard(keyboard, welcomeText);
