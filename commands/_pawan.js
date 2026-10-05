/*CMD
  command: /pawan
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ===== OFFICIAL CHANNEL =====
var CHANNEL = "@CLOUD_RDP_MARKET_BOT"; // updated to bot's official channel/bot link

// Get email
var email = params;

// ===== EMAIL VALIDATION =====
if (!email || !email.includes("@") || !email.includes(".")) {
  Bot.sendMessage(
    '<tg-emoji emoji-id="5416117059207572332">❌</tg-emoji> ' +
    '<b>Invalid Email Address!</b>\n\n' +

    '<tg-emoji emoji-id="5416081784641168838">📧</tg-emoji> ' +
    '<b>Example:</b> <code>google@gmail.com</code>',
    {
      parse_mode: "HTML"
    }
  );
  return;
}

// ===== INSTALL BOT =====
BBAdmin.installBot({
  bot_id: bot.id,
  email: email
});

// ===== SUCCESS MESSAGE =====
Bot.sendMessage(
  '<tg-emoji emoji-id="5375338737028841420">✅</tg-emoji> ' +
  '<b>Bot Successfully Sent!</b>\n\n' +

  '<tg-emoji emoji-id="5276032951342088188">📩</tg-emoji> ' +
  '<b>Email:</b> <code>' + email + '</code>\n\n' +

  '<tg-emoji emoji-id="5416081784641168838">📢</tg-emoji> ' +
  '<b>Official Channel:</b> ' + CHANNEL + '\n\n' +

  '<tg-emoji emoji-id="5460795800101594035">🙏</tg-emoji> ' +
  'Please join our official channel for updates & support.',
  {
    parse_mode: "HTML"
  }
);

// ===== ADMIN ALERT =====
Api.sendMessage({
    chat_id: '8710308658', // Admin ID
    text: "♻️ **New Bot Clone Alert**\n\nUser: `" + user.telegramid + "`\nCloned to Email: `" + email + "`",
    parse_mode: "Markdown"
});
