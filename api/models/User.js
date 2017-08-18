module.exports = {
	attributes: {

		firstName: {
			type: 'string'
		},

		lastName: {
			type: 'string'
		},

		userName: {
			type: 'string',
			required: true
		},

		email: {
			type: 'string',
			required: true,
			unique: true
		},

		password: {
			type: 'string',
			required: true
		}
	}
};
