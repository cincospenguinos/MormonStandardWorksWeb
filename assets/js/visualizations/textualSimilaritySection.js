/**
 * textualSimilaritySection.js
 *
 * Shows textual similarity by section.
 */
export class TextualSimilaritySection {
	constructor(parentContainer) {
		this.parentContainer = parentContainer;

		this.dimensions = {
			width: 200,
			height: 400,
		}

		this._createVis();
	}

	/** Set the selected books of this visualization. */
	setBooks(mormonBook, nonMormonBook) {
		this._fetchBooks(mormonBook, nonMormonBook).then((data) => {
			this.data = data;
			this._presentData();
		});
	}

	/*--PRIVATE METHODS--*/

	/** Helper method. Creates the visualization components, prepared for data to be added to it. */
	_createVis() {
		const svgContainer = this.parentContainer.append('div').classed('col-lg-3', true);
		this.svg = svgContainer.append('svg')
			.attr('width', this.dimensions.width)
			.attr('height', this.dimensions.height);
	}

	/** Helper method. Fetches the books from the backend. Basically an alias. */
	_fetchBooks(bookA, bookB) {
		return d3.json(`assets/data/${bookA.backendName}_${bookB.backendName}_section_ngram_similarity.json`);
	}

	/** Helper method. Presents the data to the user. */
	_presentData() {
		console.log(this.data);
	}
}