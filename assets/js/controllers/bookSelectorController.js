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

		this._createSelectorSetup();
	}

	/*--PRIVATE METHODS--*/

	/** Helper method. Creates various selectors on the page. */
	_createSelectorSetup() {
		const parentContainer = d3.select('#book-selector-container');
		const mormonBooksContainer = parentContainer.append('div').classed('col-md-6', true);
		const nonMormonBooksContainer = parentContainer.append('div').classed('col-md-6', true);

		this._createSelector(mormonBooksContainer, this.mormonBooks);
		this._createSelector(nonMormonBooksContainer, this.nonMormonBooks);
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

		return selector;
	}
}