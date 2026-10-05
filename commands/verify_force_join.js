/*CMD
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
