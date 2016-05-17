
/*
 * GET Webhook.
 */
exports.webhook = function(req, res){
  res.render('index', { title: 'Webhook' })
};

exports.messengerwebhook = function(req, res){
	messaging_events = req.body.entry[0].messaging;
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i];
		sender = event.sender.id;
		if (event.message && event.message.text) {
			text = event.message.text;
			// Handle a text message from this sender
			var parser = require('../Models/Parser');
			parser.sendTextMessage(sender, "Hi!");
		}
	}
	res.sendStatus(200);
};

