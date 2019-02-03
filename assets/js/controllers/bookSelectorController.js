/**
 * bookSelectorController.js
 *
 * Book selector controller. Handles book collection, indicating what the new book that changed
 * is, and letting othe components handle the change.
 */
export class BookSelectorController {

	constructor(mormonBooks, nonMormonBooks) {
		this.mormonBooks = mormonBooks;
		this.nonMormonBooks = nonMormonBooks;

		this.selectors = {};
		this.listeningVisualzations = [];

		this._createSelectors();
	}

	/** Adds a visualization that wishes to listen to book selector changes. */
	addOnBookChangedListener(visualization) {
		this.listeningVisualzations.push(visualization);
	}

	/** Returns currently selected books. */
	getCurrentlySelected() {
		return this.currentlySelected;
	}

	/** Returns the parent container of this */
	getContainer() {
		return this.parentContainer;
	}

	/*--PRIVATE METHODS--*/

	/** Helper method. Creates various selectors on the page. */
	_createSelectors() {
		this.parentContainer = d3.select('#book-selector-container');
		const mormonBooksContainer = this.parentContainer.append('div').classed('col-md-6', true);
		const nonMormonBooksContainer = this.parentContainer.append('div').classed('col-md-6', true);

		this.selectors.mormon = this._createSelector(mormonBooksContainer, this.mormonBooks);
		this.selectors.nonMormon = this._createSelector(nonMormonBooksContainer, this.nonMormonBooks);

		this._setDefaultSelectedWorks();
	}

	_setDefaultSelectedWorks() {
		this.selectors.mormon.selectAll('option')
			.filter(o => o.title === BookSelectorController.DEFAULT_SELECTED_MORMON_BOOK)
			.attr('selected', 'selected');

		this.selectors.nonMormon.selectAll('option')
			.filter(o => o.title === BookSelectorController.DEFAULT_SELECTED_NON_MORMON_BOOK)
			.attr('selected', 'selected');

		this.currentlySelected = { 
			mormon: this.mormonBooks.filter(book => book.title === BookSelectorController.DEFAULT_SELECTED_MORMON_BOOK)[0],
			nonMormon: this.nonMormonBooks.filter(book => book.title === BookSelectorController.DEFAULT_SELECTED_NON_MORMON_BOOK)[0],
		}
	}

	/** Helper method. Create the selector using the container provided with the set of books provided. */
	_createSelector(container, books) {
		let selector = container.append('select');
		selector.selectAll('option')
			.data(books)
			.enter()
			.append('option')
			.text((d) => d.title)
			.attr('value', (d) => d.backendName);

		// TODO: Setup listener for changing

		return selector;
	}
}

BookSelectorController.DEFAULT_SELECTED_MORMON_BOOK = 'The Book of Mormon';
BookSelectorController.DEFAULT_SELECTED_NON_MORMON_BOOK = 'The Late War';