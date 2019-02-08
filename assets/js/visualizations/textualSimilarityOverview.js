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
			width: 600, 
			height: 400,
			bars: {
				width: 100,
				xPad: 20,
				yScale: 50,
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
	_extractDataFrom(data) {
		const newFormat = {};
		Object.keys(data).forEach((nGramSize) => {
			const dataBit = data[nGramSize];

			newFormat[`${nGramSize}gram`] = {
				textA: dataBit.countSimilar / (dataBit.countTextA / 1000.0),
				textB: dataBit.countSimilar / (dataBit.countTextB / 1000.0),
			};
		});

		return newFormat;
	}

	/** Helper method. Presents the data that was extracted from the backend. */
	_presentData() {
		if (!this.nGramGroups) {
			this._createNGramGroups();
		}

		// TODO: Remove the old group information
		let idx = 0;
		Object.keys(this.data).forEach((key) => {
			const group = d3.select(`#n-${key}`);
			const dataBit = this.data[key];

			group.append('rect')
				.attr('x', idx * (this.dimensions.bars.width + this.dimensions.bars.xPad))
				.attr('y', 0)
				.attr('width', this.dimensions.bars.width)
				.attr('height', dataBit.textA * this.dimensions.bars.yScale);

			idx += 1;
		});
	}

	/** Helper method. Creates the various data holders for the nGrams. */
	_createNGramGroups() {
		this.nGramGroups = this.rectGroup.selectAll('g')
			.data(Object.keys(this.data))
			.enter()
			.append('g')
			.attr('id', d => `n-${d}`)
			.classed('n-gram-bar-group', true);
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

		this.rectGroup = wrapperGroup.append('g').classed('n-gram-rect-group', true);
	}
}