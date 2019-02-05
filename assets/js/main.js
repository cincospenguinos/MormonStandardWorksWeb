/**
 * main.js
 *
 * Where the magic happens.
 */
import { BookSelectorController } from './controllers/bookSelectorController.js';
import { TextualSimilarityOverview } from './visualizations/textualSimilarityOverview.js';

let bookSelectorController, mormonBooks, nonMormonBooks;
let textualSimilarityOverview;

$(document).ready(() => {
	const bookSelectorParent = d3.select('#book-selector-container');
	const bookSimilarityParent = d3.select('#book-similarity-overview');

	textualSimilarityOverview = new TextualSimilarityOverview(bookSimilarityParent);

	d3.json('assets/data/analysis_version_info.json').then((data) => {
		// $('#version-info').append(`v${data.version}`);
		mormonBooks = data.mormonBooks.map((title) => {
			return { title: title, backendName: title.replace(/\s+/g, '_') };
		});

		nonMormonBooks = data.nonMormonBooks.map((title) => {
			return { title: title, backendName: title.replace(/\s+/g, '_') };
		});

		bookSelectorController = new BookSelectorController(mormonBooks, nonMormonBooks, bookSelectorParent);
		
		const books = bookSelectorController.getCurrentlySelected();
		textualSimilarityOverview.setBooks(books.mormon, books.nonMormon);
	});
});