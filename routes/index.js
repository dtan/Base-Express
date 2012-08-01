
var data = require('./data');

/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log('data: ', data);
	res.render('index', { title: 'Express', data: data })
};