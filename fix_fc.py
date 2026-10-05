import os

commands_dir = 'c:\\Users\\pawan\\Downloads\\promo\\commands'

def write_file(name, content):
    with open(os.path.join(commands_dir, name), 'w', encoding='utf-8') as f:
        f.write(content)

# verify_force_join.js
verify_force_join = \"\"\"/*CMD
  command: verify_force_join
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
if (request && request.data) {
  Api.answerCallbackQuery({ callback_query_id: request.id, text: "Checking..." });
}

let channels = Bot.getProperty("forceChannels", []);
if (channels.length == 0) {
  Bot.runCommand("/start", {is_verified: true});
  return;
}

User.setProperty("fc_pending_list", channels, "json");
User.setProperty("fc_verify_index", 0, "integer");
User.setProperty("fc_still_pending", [], "json");
Bot.runCommand("_check_fc_step");
\"\"\"
write_file('verify_force_join.js', verify_force_join)

# _check_fc_step.js
check_fc_step = \"\"\"/*CMD
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
    var msg = "⚠️ **In order to use the bot you must join our channel(s):**\\n\\n";
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
\"\"\"
write_file('_check_fc_step.js', check_fc_step)

# _on_fc_result.js
on_fc_result = \"\"\"/*CMD
  command: _on_fc_result
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
var status = options.result.status;
var pending = User.getProperty("fc_pending_list") || [];
var index = User.getProperty("fc_verify_index") || 0;
var still_pending = User.getProperty("fc_still_pending") || [];
var ch = pending[index];

if (!ch) {
  User.setProperty("fc_verify_index", index + 1, "integer");
  Bot.runCommand("_check_fc_step");
  return;
}

if (status != "member" && status != "administrator" && status != "creator") {
  still_pending.push(ch);
}

User.setProperty("fc_still_pending", still_pending, "json");
User.setProperty("fc_verify_index", index + 1, "integer");
Bot.runCommand("_check_fc_step");
\"\"\"
write_file('_on_fc_result.js', on_fc_result)

# _on_fc_error.js
on_fc_error = \"\"\"/*CMD
  command: _on_fc_error
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
var pending = User.getProperty("fc_pending_list") || [];
var index = User.getProperty("fc_verify_index") || 0;
var still_pending = User.getProperty("fc_still_pending") || [];
var ch = pending[index];

if (!ch) {
  User.setProperty("fc_verify_index", index + 1, "integer");
  Bot.runCommand("_check_fc_step");
  return;
}

still_pending.push(ch);
User.setProperty("fc_still_pending", still_pending, "json");
User.setProperty("fc_verify_index", index + 1, "integer");
Bot.runCommand("_check_fc_step");
\"\"\"
write_file('_on_fc_error.js', on_fc_error)

# Update _start.js to use verify_force_join
with open(os.path.join(commands_dir, '_start.js'), 'r', encoding='utf-8') as f:
    start_js = f.read()

if 'options.is_verified' not in start_js:
    start_js = start_js.replace(\"let isUser = User.getProperty('isUser');\", 
\"\"\"if (!options || !options.is_verified) {
    Bot.runCommand("verify_force_join");
    return;
}

let isUser = User.getProperty('isUser');\"\"\")
    
    with open(os.path.join(commands_dir, '_start.js'), 'w', encoding='utf-8') as f:
        f.write(start_js)

