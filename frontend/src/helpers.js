function checkMimeType(event) {
	let files = event.target.files;
	let err = '';
	console.log(files);

	const types = ['xlsx', 'xls', 'sheet', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
	for (let x = 0; x < files.length; x++) {
		if (types.every((type) => files[x].type !== type)) {
			err += files[x].type + ' is not a supported format\n';
		}
	}

	if (err !== '') {
		event.target.value = null;
		this.setState({
			message: err,
		});
		return false;
	}
	return true;
}

function checkFileSize(event) {
	let files = event.target.files;
	let size = 2000000000;
	let err = '';
	for (var x = 0; x < files.length; x++) {
		if (files[x].size > size) {
			err += files[x].type + ' is too large, please pick a smaller file\n';
		}
	}
	if (err !== '') {
		event.target.value = null;
		this.setState({
			message: err,
		});
		return false;
	}

	return true;
}

export { checkFileSize, checkMimeType };
