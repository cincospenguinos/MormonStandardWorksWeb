/**
 * main.js
 *
 * Where the magic happens.
 */
import { BookSelectorController } from './controllers/bookSelectorController.js';

let bookSelectorController, mormonBooks, nonMormonBooks;

$(document).ready(() => {
	d3.json('assets/data/analysis_version_info.json').then((data) => {
		$('#version-info').append(`v${data.version}`);
		mormonBooks = data.mormonBooks.map((title) => {
			return { title: title, backendName: title.replace(/\s+/g, '_') };
		});

		nonMormonBooks = data.nonMormonBooks.map((title) => {
			return { title: title, backendName: title.replace(/\s+/g, '_') };
		});

		bookSelectorController = new BookSelectorController(mormonBooks, nonMormonBooks);
	});
});