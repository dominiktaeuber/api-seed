const JWT_SECRET = 'qwertyuiopasdfghjklzxcvbnm123456';
const jwt = require('jsonwebtoken');

module.exports = {

	generateJwt(payload) {
		return jwt.sign(payload, JWT_SECRET);
	},

	verifyJwt(jwt) {
		const result = jwt.verify(jwt, JWT_SECRET);
		console.log('JWT verification', result);
	}
};
