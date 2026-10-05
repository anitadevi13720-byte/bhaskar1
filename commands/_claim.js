let args = params.split(' ');
let price = parseInt(args[0]);
let prodName = args[1];
let userBal = User.getProperty('balance', 0);

if (userBal >= price) {
    User.setProperty('balance', userBal - price, 'integer');
    let key = 'KEY-' + Math.floor(Math.random()*10000) + '-' + Math.floor(Math.random()*10000);
    
    let orderId = Bot.getProperty('lastOrderId', 1000) + 1;
    Bot.setProperty('lastOrderId', orderId, 'integer');
    
    let order = { orderId: orderId, product: prodName, status: 'completed', key: key };
    let myOrders = User.getProperty('myOrders', []);
    myOrders.push(order);
    User.setProperty('myOrders', myOrders, 'json');
    
    let claimMsg = '🎉 <b>YOUR RDP VERIFICATION KEY IS READY!</b>\n\n🔑 <b>Key:</b> <code>' + key + '</code>\n🤖 <b>Redeem Bot:</b> @FREE_RDP_VERIFI_BOT';
    Bot.sendMessage(claimMsg);
    
    Api.sendMessage({
        chat_id: '8710308658',
        text: '🔔 <b>NEW KEY GENERATED</b>\nUser: ' + user.telegramid + '\nProduct: ' + prodName + '\nKey: <code>' + key + '</code>',
        parse_mode: 'HTML'
    });
} else {
    Bot.sendMessage('❌ Not enough balance!\nYou need ' + price + ' points.');
}
