let supT = Bot.getProperty('supportText', '🎟 <b>SUPPORT & HELP CENTER</b>\n\n💬 For direct support, contact: <b>@CLOUD_RDP_MARKET_BOT</b>\n\n✅ <b>Support Ticket Opened!</b>\nYou can also send your query, message, or screenshot directly here and the admin will reply to you.');
User.setProperty('ticketStatus', 'open', 'string');
Bot.sendMessage(supT);
