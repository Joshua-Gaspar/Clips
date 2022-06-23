const User = require('../model/user.mongo');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

const JWT_SECRET="z3x4ced5rv6tbg7yn8um9i,0kol.-p/;p'["


async function httpTest(req, res){
   res.send('Hello World!');
 
}

 async function httpLogin (req, res) {
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the name, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid email/password' })
};

 async function httpRegisterUser (req, res) {
	const { 
		 name,
		 email,
		 age,
		 password: plainTextPassword,
		 phoneNumber
		 } = req.body



	if (!name || typeof name !== 'string') {
		return res.json({ status: 'error', error: 'Invalid name' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 8) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 8 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
	
	try {
		const response = await User.create({
			name,
			email,
			age,
			password,
			phoneNumber

		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error

	}

	res.json({ status: 'ok' })

};

module.exports ={
	httpTest,
    httpLogin,
    httpRegisterUser
}