Bot.sendMessage('Enter amount of points to ADD to user ' + params + ':');
User.setProperty('targetApprove', params, 'string');
Bot.runCommand('/do_pay_approve');
