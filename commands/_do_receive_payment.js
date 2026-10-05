if (request.photo) {
    let photoId = request.photo[0].file_id;
    let uid = user.telegramid;
    let inlineKeys = [
        [{title: '✅ Approve', command: '/pay_approve ' + uid}, {title: '❌ Reject', command: '/pay_reject ' + uid}]
    ];
    Api.sendPhoto({
        chat_id: '8710308658',
        photo: photoId,
        caption: '📸 **NEW PAYMENT SCREENSHOT**\nUser: ' + uid + '\n@' + user.username,
        reply_markup: { inline_keyboard: inlineKeys }
    });
    Bot.sendMessage('✅ Your screenshot has been sent to the Admin! Please wait for verification.');
} else {
    Bot.sendMessage('❌ Please send a valid photo/screenshot.');
}
