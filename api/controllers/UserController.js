module.exports = {

	read(req, res) {

		User
			.find({})
			.exec((err, records) => {
				if(err) {
					res.ok(err);
				}

				res.ok(records);
			});
	},

	create(req, res) {

		const inputResult = InputService.verifyInput(req, [
			{name: 'firstName'},
			{name: 'lastName'},
			{name: 'userName', required: true},
			{name: 'email', required: true},
			{name: 'password', required: true}
		]);

		const data = inputResult.data;

		if (!inputResult.success) {
			res.badRequest(inputResult.error);
		} else {
			data.password = CryptoService.createHash(data.password);

			User
				.create(data)
				.exec((err, result) => {

					if (err) {
						res.send(err);
					}

					res.send(result);
				});
		}
	},

	login(req, res) {

		const inputResult = InputService.verifyInput(req, [
			{name: 'password', required: true},
			{name: 'email', required: true}
		]);

		if (!inputResult.success) {
			res.badRequest(inputResult.error);
		} else {

			let data = inputResult.data;

			User
				.findOne({email: data.email})
				.exec((err, user) => {

					if (err) {
						res.send(err);
					}

					if (!user) {
						res.badRequest('No user found');
					}

					const matchingSecret = CryptoService.compare(user.password, data.password);

					if (matchingSecret) {

						// Delete unneeded properties
						delete user.password;

						// Generate JWT
						user.jwt = JwtService.generateJwt(user);

						res.send(user);
					} else {
						res.badRequest('Wrong Password');
					}
				});
		}
	},

	register(req, res) {

		const inputResult = InputService.verifyInput(req, [
			{name: 'firstName', required: false},
			{name: 'lastName', required: false},
			{name: 'userName', required: true},
			{name: 'email', required: true},
			{name: 'password', required: true}
		]);

		const data = inputResult.data;

		if (!inputResult.success) {
			res.badRequest(inputResult.error);
		} else {
			data.password = CryptoService.createHash(data.password);

			User
				.create(data)
				.exec((err, result) => {

					if (err) {
						res.send(err);
					}

					// Remove unneeded properties before sending the result
					delete result.password;

					// Generate JWT
					result.jwt = JwtService.generateJwt(result);

					res.send(result);
				});
		}
	}
};
