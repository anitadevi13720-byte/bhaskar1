let settingsKb = [
    [{title: '📝 Edit Welcome Text', command: '/edit_welcome'}, {title: '🖥 Edit RDP Text', command: '/edit_rdp'}]
];
Bot.sendInlineKeyboard(settingsKb, '⚙️ **BOT SETTINGS**\n\nSelect an option to edit text:');
