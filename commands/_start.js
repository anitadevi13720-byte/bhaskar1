/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
if (!options || !options.is_verified) {
    Bot.runCommand("verify_force_join");
    return;
}

let isUser = User.getProperty('isUser');
if (!isUser) {
    User.setProperty('isUser', true, 'boolean');
    Bot.setProperty('balance_' + user.telegramid, 0, 'integer');

    
    if (message && message.includes(' ')) {
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
if(welcomeText.includes('{name}')) {
    welcomeText = welcomeText.replace('{name}', user.first_name);
}

let keyboard = "👤 Account, 🎁 Refer\n🏧 Withdraw, 📊 Statistics\n🎧 Support (Ticket), 🖥 Buy Private RDP\n📦 My Orders";
Bot.sendKeyboard(keyboard, welcomeText);
