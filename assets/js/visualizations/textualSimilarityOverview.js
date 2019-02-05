/**
 * textualSimilarityOverview.js
 *
 * Visualization presenting an overview of the textual similarity between two books. Specifically shows
 * how many NGrams per 1000 words there are between the two texts.
 */
export class TextualSimilarityOverview {
	constructor(parentContainer) {
		this.parentContainer = parentContainer;

		this.dimensions = { 
			width: 800, 
			height: 600,
			bars: {
				width: 140,
				xPad: 20,
			}
		};

		this._createVis();
	}

	/** Set the books to show in this visualization. */
	setBooks(bookA, bookB) {
		this._fetchBooks(bookA, bookB).then((data) => {
			this.data = this._extractDataFrom(data);
			this._presentData();
		});
	}

	/*--PRIVATE METHODS--*/

	/** Helper method. Aliases the ugly d3.json() call. */
	_fetchBooks(bookA, bookB) {
		return d3.json(`assets/data/${bookA.backendName}_${bookB.backendName}_ngram_similarity.json`);
	}

	/** Helper method. Extracts the data from the backend into the format that we desire. */
	_extractDataFrom(data) { // TODO: Fix the data
		const newFormat = {};
		Object.keys(data).forEach((nGramSize) => {
			const dataBit = data[nGramSize];

			newFormat[`${nGramSize}gram`] = {
				textA: dataBit.countTextA,
				textB: dataBit.countTextB,
				similar: dataBit.countSimilar,
			};
		});

		return newFormat;
	}

	/** Helper method. Presents the data that was extracted from the backend. */
	_presentData() {
		console.log(this.data);
		throw 'We want better data presentation!';
	}

	/** Helper method. Creates the various pieces and things, including the axes marks. */
	_createVis() {
		const svgContainer = this.parentContainer.append('div')
			.classed('col-lg-9', true);

		this.svg = svgContainer.append('svg')
			.attr('width', this.dimensions.width)
			.attr('height', this.dimensions.height)
			.attr('id', 'text-similarity-svg');

		const wrapperGroup = this.svg.append('g')
			.classed('text-similarity-wrapper-group', true)
			.attr('transform', `translate(15, ${this.dimensions.height}) scale(1, -1)`);

		const axisGroup = wrapperGroup.append('g').classed('axis', true);
		axisGroup.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', this.dimensions.width)
			.attr('y2', 0);

		axisGroup.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', this.dimensions.height);
	}
}