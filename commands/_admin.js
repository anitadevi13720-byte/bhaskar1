let adminIds = ['8710308658', '8789936408'];
if (adminIds.includes(user.telegramid.toString())) {
    let adKb = [
        [{title: '📢 Broadcast', command: '/admin_broadcast'}, {title: '⚙️ Edit Settings', command: '/admin_settings'}],
        [{title: '➕ Add Points', command: '/admin_addpoints'}, {title: '➖ Remove Points', command: '/admin_rmpoints'}],
        [{title: '🚫 Ban User', command: '/admin_ban'}, {title: '✅ Unban User', command: '/admin_unban'}],
        [{title: '🔍 Check Key', command: '/admin_checkkey'}, {title: '📣 Force Channels', command: '/admin_channels'}]
    ];
    Bot.sendInlineKeyboard(adKb, '🛠 **ADMIN PANEL**\nChoose an option:');
} else {
    Bot.sendMessage('❌ You are not an admin.');
}
