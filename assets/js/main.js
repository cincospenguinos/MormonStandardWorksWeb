/**
 * main.js
 *
 * Where the magic happens.
 */
$(document).ready(() => {
	d3.json('assets/data/analysis_version_info.json').then((data) => {
		console.log(data);
	})
});