let curBal = Bot.getProperty('balance_' + user.telegramid);
if (curBal === undefined) { curBal = User.getProperty('balance', 0); Bot.setProperty('balance_' + user.telegramid, curBal, 'integer'); }
let wText = '💰 Your Balance: ' + curBal + ' Points\n\n👑 RDP / VPS PLANS\n👇 Click a button below to purchase using points:';
let wKb = [
    [{title: '⚡ 2GB RDP — 40 Points', command: '/claim 40 2GB_RDP', style: 'primary'}],
    [{title: '🔥 3GB RDP — 60 Points', command: '/claim 60 3GB_RDP', style: 'primary'}],
    [{title: '⚡ 4GB RDP — 80 Points', command: '/claim 80 4GB_RDP', style: 'primary'}],
    [{title: '🔥 6GB RDP — 100 Points', command: '/claim 100 6GB_RDP', style: 'success'}],
    [{title: '🚀 8GB (PRO) RDP — 120 Points', command: '/claim 120 8GB_RDP', style: 'success'}]
];
Bot.sendInlineKeyboard(wKb, wText);
