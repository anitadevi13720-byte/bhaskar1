/*CMD
  command: /admin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let adminIds = ['8710308658', '8789936408'];
if (adminIds.includes(user.telegramid.toString())) {
    let adKb = [
        [{title: '📢 Broadcast', command: '/admin_broadcast', style: 'primary'}, {title: '⚙️ Edit Settings', command: '/admin_settings', style: 'primary'}],
        [{title: '➕ Add Points', command: '/admin_addpoints', style: 'success'}, {title: '➖ Remove Points', command: '/admin_rmpoints', style: 'danger'}],
        [{title: '🚫 Ban User', command: '/admin_ban', style: 'danger'}, {title: '✅ Unban User', command: '/admin_unban', style: 'success'}],
        [{title: '🔍 Check Key', command: '/admin_checkkey', style: 'primary'}, {title: '📣 Force Channels', command: '/admin_channels', style: 'primary'}]
    ];
    Bot.sendInlineKeyboard(adKb, '🛠 **ADMIN PANEL**\nChoose an option:');
} else {
    Bot.sendMessage('❌ You are not an admin.');
}
