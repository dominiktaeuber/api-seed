const crypto = require('crypto');

module.exports = {

	createHash(string) {

		const hash = crypto.createHash('sha256');
		hash.update(string);
		return hash.digest('hex');
	},

	compare(hash, string) {
		const comparator = crypto.createHash('sha256');
		comparator.update(string);

		return comparator.digest('hex') === hash;
	}
};
