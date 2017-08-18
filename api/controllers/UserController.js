module.exports = {

	read(req, res) {

		User
			.find({})
			.exec(function(err, records) {
				if(err) {
					res.ok(err);
				}

				res.ok(records);
			});
	},

	create(req, res) {

		if (!req.body) {
			res.badRequest();
		}

		User
			.create(req.body)
			.exec(function(err, records) {
				if(err) {
					res.ok(err);
				}

				res.ok(records);
			});
	}
};
