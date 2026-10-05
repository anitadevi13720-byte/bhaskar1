/*CMD
  command: /admin_channels
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let buttons = [
    [{ title: "➕ Add Channel", command: "/admin_fc_add" }],
    [{ title: "➖ Remove Channel", command: "/admin_fc_remove" }],
    [{ title: "📋 List Channels", command: "/admin_fc_list" }]
];
Bot.sendInlineKeyboard(buttons, "📣 **Force Channels Management**\nChoose an option:");