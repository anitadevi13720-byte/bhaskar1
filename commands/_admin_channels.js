/*CMD
  command: /admin_channels
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
CMD*/
let buttons = [
    [{ title: "➕ Add Channel", command: "/admin_fc_add", style: 'success' }],
    [{ title: "➖ Remove Channel", command: "/admin_fc_remove", style: 'danger' }],
    [{ title: "📋 List Channels", command: "/admin_fc_list", style: 'primary' }]
];
Bot.sendInlineKeyboard(buttons, "📣 **Force Channels Management**\nChoose an option:");