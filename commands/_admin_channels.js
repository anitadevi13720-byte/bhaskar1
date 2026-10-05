/*CMD
  command: /admin_channels
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let buttons = [
    [{ text: "➕ Add Channel", callback_data: "/admin_fc_add" }],
    [{ text: "➖ Remove Channel", callback_data: "/admin_fc_remove" }],
    [{ text: "📋 List Channels", callback_data: "/admin_fc_list" }]
];
Api.sendMessage({
    text: "📣 **Force Channels Management**\nChoose an option:",
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: buttons }
});