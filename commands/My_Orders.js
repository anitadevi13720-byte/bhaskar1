let ords = User.getProperty('myOrders', []);
if (ords.length == 0) {
    Bot.sendMessage('You have no orders yet.');
    return;
}
let ordText = '📦 **Your Orders**\n\n';
for(let i=0; i<ords.length; i++){
    ordText += 'Order #' + ords[i].orderId + ' - ' + ords[i].product + ' (' + ords[i].status + ')\nKey: `' + ords[i].key + '`\n\n';
}
Bot.sendMessage(ordText);
