/**
 * main.js
 *
 * Where the magic happens.
 */
let bookComparison;

$(document).ready(() => {
	bookComparison = new BookComparisonController();

	d3.csv('assets/dataset/overview.csv').then((data) => {
		data.forEach((d) => {
			d.isMormon = d.isMormon === 'true' ? true : false;
		});
		
		bookComparison.setup(data);
	});
});