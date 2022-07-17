const jwt = require("jsonwebtoken");

require('dotenv').config()

 const validateToken = (req, res, next) => {
	try {
		const token = req.cookies['jwt']

		const claims = jwt.verify(token, process.env.JWT_SECRET);

		next();
	} catch (err) {
		return res.status(401).json({
			loggedIn: false,
			message: "Unauthorized"
		})
	}
}

const createToken = (user)=>{
	const token = jwt.sign(
		{
			_id: user._id,
			email: user.email,
		},process.env.JWT_SECRET
	)

	return token;
}

module.exports = {
	validateToken,
	createToken

}


