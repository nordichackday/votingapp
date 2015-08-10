module.exports = function parseIpfilter(input) {
	var items = input.split(',');

	return items.map(function (item) {
		if (item.indexOf('-') > -1) {
			return item.split('-');
		}

		return item;
	});
}
