const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const connection = require('./config/db');

const uploadRoute = require('./routes/fileRoute');
require('dotenv').config({path:'./config/.env'});

connection();

app.use(express.json());


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads');
	},
	filename: function (req, file, cb) {
		cb(null, 'excelfile' + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
	},
});
var upload = multer({ storage: storage });
app.use(upload.single('excel'));
app.use(cors());
const port = process.env.PORT || 8080;
app.use('/', uploadRoute);

const server = app.listen(port, () => console.log(`Server is listen in dev mode on port ${port}`));

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error :${err.message}`);
	//Close Server
	server.close(() => process.exit(1));
});
