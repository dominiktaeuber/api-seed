const _ = require('lodash');

module.exports = {

	verifyInput(req, definition) {

		let inputResult = {
			data: {},
			success: true,
			error: {
				error: 'E_VALIDATION',
				status: 400,
				summary: null,
				invalidAttributes: []
			}
		};

		if(_.isEmpty(req.body)) {

			inputResult.success = false;
			inputResult.error.summary = 'Body is empty';

		} else {

			_.each(definition, (criteria) => {

				if (criteria.required) {
					if (req.body.hasOwnProperty(criteria.name)) {
						inputResult.data[criteria.name] = req.body[criteria.name];
					} else {
						inputResult.success = false;
						inputResult.error.summary = 'Invalid attributes provided';
						inputResult.error.invalidAttributes.push({name: criteria.name, validation: 'required'});
					}
				}

				if (!criteria.required && req.body.hasOwnProperty(criteria.name)) {
					inputResult.data[criteria.name] = req.body[criteria.name];
				}
			});
		}

		return inputResult;
	}
};
