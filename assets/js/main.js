/**
 * main.js
 *
 * Where the magic happens.
 */
$(document).ready(() => {
	d3.json('assets/data/analysis_version_info.json').then((data) => {
		$('#version-info').append(`v${data.version}`);
		console.log(data);
	});
});