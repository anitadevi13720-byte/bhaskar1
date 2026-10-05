Bot.sendMessage('Enter REASON for rejection for user ' + params + ':');
User.setProperty('targetReject', params, 'string');
Bot.runCommand('/do_pay_reject');
