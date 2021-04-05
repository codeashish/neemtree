const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
	{
		name: { type: String },
		email: { type: String, unique: true },
		mobile: { type: Number },
		DOB: { type: String },
		workExp: { type: String },
		resumeTitle: { type: String },
		currLocation: { type: String },
		address: { type: String },
		currEmployer: { type: String },
		CurrDesign: { type: String },
	},

	{ timestamps: true }
);
module.exports = mongoose.model('data', dataSchema);
