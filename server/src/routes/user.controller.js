const User = require('../model/user.mongo');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const {createToken} = require('../middleware/JWT')

async function httpTest(req, res){
   return res.status(200).json({message: 'Hello word' })
}

 async function httpLogin (req, res) {
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.status(400).json({message: 'Invalid email/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the name, password combination is successful

		const token = createToken(user);
		
		res.cookie('jwt', token, {
			httpOnly: true,
			exp: 24 * 60 * 60 * 1000 //1 day

		})

		return res.status(200).json({ message:'Login succesful'})
	}

	res.status(400).json({ status: 'error', message: 'Invalid email/password' })
};

 async function httpRegisterUser (req, res) {
	const { 
		 name,
		 email,
		 age,
		 password: plainTextPassword,
		 phone
		 } = req.body


	if (plainTextPassword.length < 8) {
		return res.status(400).json({
			status: 'error',
			error: 'Password too small. Should be atleast 8 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
	
	try {
		const user = await User.create({
			name,
			email,
			age,
			password,
			phone

		})
		console.log('User created successfully: ', user)
		res.status(201).json({message: "User created successfully"})

	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.status(400).json({message: 'email already in use' })
		}

	}
};



 async function httpUserProfile(req, res){

	try{
	const cookie= req.cookies['jwt']

	const claims = jwt.verify(cookie,JWT_SECRET );

	// const user = await User.findOne({_id: claims._id})
	 const user = await User.find({_id: claims._id}).select("-password -__v -_id")
	
	return res.status(200).json({user: user});

}catch(err){
	return res.status(401).json(null)
}

}


async function httLogout(req, res){
	res.cookie('jwt', '', {maxAge: 0})

	return res.status(200).json({ status: 'Logout succesful' })

}

module.exports ={
	httpTest,
    httpLogin,
    httpRegisterUser,
	httpUserProfile,
	httLogout
}