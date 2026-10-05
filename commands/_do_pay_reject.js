let tReject = User.getProperty('targetReject');
Api.sendMessage({chat_id: tReject, text: '❌ **Payment Rejected!**\nReason: ' + message});
Bot.sendMessage('✅ Rejection sent to ' + tReject);
