/*CMD
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
