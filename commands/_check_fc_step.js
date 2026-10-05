/*CMD
  command: _check_fc_step
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
var pending = User.getProperty("fc_pending_list") || [];
var index = User.getProperty("fc_verify_index") || 0;
var still_pending = User.getProperty("fc_still_pending") || [];

if (index >= pending.length) {
  if (still_pending.length > 0) {
    var msg = "⚠️ **In order to use the bot you must join our channel(s):**\n\n";
    var btns = [];
    for (var i = 0; i < still_pending.length; i++) {
      var ch = still_pending[i];
      btns.push([{ text: "Join Channel", url: ch.url }]);
    }
    btns.push([{ text: "✅ Joined", callback_data: "verify_force_join" }]);
    
    Api.sendMessage({
      text: msg,
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: btns }
    });
  } else {
    if (request && request.message) {
      Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message.message_id });
    }
    Bot.runCommand("/start", {is_verified: true});
  }
  return;
}

var ch = pending[index];
if (!ch || !ch.id) {
  User.setProperty("fc_verify_index", index + 1, "integer");
  Bot.runCommand("_check_fc_step");
  return;
}

Api.getChatMember({
  chat_id: ch.id,
  user_id: user.telegramid,
  on_result: "_on_fc_result",
  on_error: "_on_fc_error"
});
