/**
 * bookComparison.js
 *
 * Class handling comparison of books.
 *
 * TODO: Add labels for selectors
 * TODO: Create bar chart comparison
 */
class BookComparisonController {

	constructor() {
		this.dimensions = {};
		this.dimensions.svg = { width: 800, height: 600 };

		this.data = {};
		this.selectors = {};

		this.filename = {};

		this.parentContainer = d3.select('#book-select-container');
	}

	/** Setup the books overview section. */
	setup(booksOverview) {
		this.data.booksOverview = booksOverview;

		let selectedMormonBook = 'the_book_of_mormon';
		let selectedNonMormonBook = 'the_late_war';

		// Let's setup the seletors
		let selectorDiv = this.parentContainer
			.append('div')
			.classed('row', true);

		let mormonSelectorDiv = selectorDiv.append('div')
			.classed('col-md-6', true);

		this.selectors.mormon = this.createSelector(mormonSelectorDiv, 
			this.data.booksOverview.filter((d) => { return d.isMormon }), true)
			.attr('id', 'mormon-book-selector');
		this.selectors.mormon.selectAll('option')
			.filter((d) => { return d.filename === selectedMormonBook })
			.attr('selected', 'selected');

		let nonMormonSelectorDiv = selectorDiv.append('div')
			.classed('col-md-6', true);

		this.selectors.nonMormon = this.createSelector(nonMormonSelectorDiv, 
			this.data.booksOverview.filter((d) => { return !d.isMormon }), false)
			.attr('id', 'non-mormon-book-selector');
		this.selectors.nonMormon.selectAll('option')
			.filter((d) => { return d.filename === selectedNonMormonBook })
			.attr('selected', 'selected');

		// Setup the chart
		let chartDiv = this.parentContainer
			.append('div')
			.classed('row', true)
			.append('div')
			.classed('col-xl-12', true)
			.attr('id', 'book-chart-div');

		this.chartSvg = chartDiv.append('svg')
			.attr('width', this.dimensions.svg.width)
			.attr('height', this.dimensions.svg.height);

		this.setBook(selectedMormonBook, true);
		this.setBook(selectedNonMormonBook, false);
	}

	/** Set book to compare in the chart. */
	setBook(filename, isMormon) {
		isMormon ? this.filename.mormon = filename : this.filename.nonMormon = filename;

		if (this.filename.mormon && this.filename.nonMormon) {
			let intersectionFileName = this.filename.mormon + '_' + this.filename.nonMormon + '.csv';

			d3.csv('assets/dataset/' + intersectionFileName).then((data) => {
				data = data.map((d) => {
					d.mormonFreq = parseFloat(d.mormonFreq);
					d.nonMormonFreq = parseFloat(d.nonMormonFreq);
					d.size = parseFloat(d.size);

					return d;
				});

				console.log(data);
			});
		}
	}

	/** Helper method. Create the selector using the container provided with the set of books provided. */
	createSelector(container, books, isMormon) {
		let selector = container.append('select');
		selector.selectAll('option')
			.data(books)
			.enter()
			.append('option')
			.text((d) => d.textName)
			.attr('value', (d) => d.filename);

		let that = this;
		selector.on('change', function(d, i) {
			that.setBook(this.options[this.selectedIndex].value, isMormon);
		});

		return selector;
	}

	/** Helper method. Returns dataset of identical NGrams. */
	extractIdenticalNGrams() {
		let strings = this.data.nonMormon.map((e) => { return e.string });
		// console.log(strings);

		// return this.data.mormon.filter((d) => {
		// 	if (strings.includes(d.string))
		// 		return d;
		// });
		return [];
	}
}