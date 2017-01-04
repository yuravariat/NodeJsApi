/**
 * http://usejsdoc.org/
 */

exports.ping = function(req, res){
	if(req._body){
		var obj = { response : req.body };
	    res.json(obj);
	}
	else{
		res.json({ message: 'hooray! welcome to our api!' });
	}
};
