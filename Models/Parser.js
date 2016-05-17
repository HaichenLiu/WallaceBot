exports.sendTextMessage = function(senderId, response){
	var fs = require('fs');
	token = fs.readFileSync('./ssl/server-key.pem');
	messageData = {
		text:response
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
	    json: {
	      recipient: {id:this.senderId},
	      message: messageData,
	    }
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
};