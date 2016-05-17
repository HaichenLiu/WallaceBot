
/*
 * GET Webhook.
 */

exports.webhook = function(req, res){
  res.render('index', { title: 'Webhook' })
};