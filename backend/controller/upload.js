const xlsx = require('xlsx');
const employee = require('./../models/data');
exports.uploadFile = async (req, res, next) => {
	const filePath = './uploads/excelfile.xlsx';
	const workbook = xlsx.readFile(filePath);
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];

	let posts = [];
	let post = {};
	for (let cell in worksheet) {
		const cellAsString = cell.toString();

		if (cellAsString[1] !== 'r' && cellAsString[1] !== 'm' && cellAsString[1] > 1) {
			if (cellAsString[0] === 'A') {
				post.name = worksheet[cell].v;
			}
			if (cellAsString[0] === 'B') {
				post.email = worksheet[cell].v;
			}
			if (cellAsString[0] === 'C') {
				post.mobile = worksheet[cell].v;
			}
			if (cellAsString[0] === 'D') {
				post.DOB = worksheet[cell].v;
			}
			if (cellAsString[0] === 'E') {
				post.workExp = worksheet[cell].v;
			}
			if (cellAsString[0] === 'F') {
				post.resumeTitle = worksheet[cell].v;
			}
			if (cellAsString[0] === 'G') {
				post.currLocation = worksheet[cell].v;
			}
		}
		if (cellAsString[0] === 'H') {
			post.address = worksheet[cell].v;
		}

		if (cellAsString[0] === 'I') {
			post.currEmployer = worksheet[cell].v;
		}

		if (cellAsString[0] === 'J') {
			post.CurrDesign = worksheet[cell].v;
			posts.push(post);
			post = {};
		}
	}
	try {
		for (let ele of posts) {
			if (ele.name) {
				let avail = await employee.findOne({ email: ele.email });
				if (!avail) {
					const emp = new employee(ele);
					await emp.save();
				}
			}
		}

		res.status(201).send({ status: true });
	} catch (error) {
		res.status(400).send({ status: false, error });
	}
};
