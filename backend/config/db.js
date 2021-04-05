const mongoose = require('mongoose');

const connection = async () => {
	const conn = await mongoose.connect(process.env.MONGOSTRING, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log(`Mongoose is connected at ${conn.connection.host}`);
};

module.exports = connection;
