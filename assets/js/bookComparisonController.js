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

		this.parentContainer = d3.select('#book-select-container');
	}

	/** Setup the books overview section. */
	setup(booksOverview) {
		this.data.booksOverview = booksOverview;

		let selectedMormonBook = 'the_book_of_mormon.csv';
		let selectedNonMormonBook = 'the_late_war.csv';

		// Let's setup the seletors
		let selectorDiv = this.parentContainer
			.append('div')
			.classed('row', true);

		let mormonSelectorDiv = selectorDiv.append('div')
			.classed('col-md-6', true);

		this.selectors.mormon = this.createSelector(mormonSelectorDiv, this.data.booksOverview.filter((d) => d.isMormon))
			.attr('id', 'mormon-book-selector');
		this.selectors.mormon.selectAll('option')
			.filter((d) => { return d.filename === selectedMormonBook })
			.attr('selected', 'selected');

		let nonMormonSelectorDiv = selectorDiv.append('div')
			.classed('col-md-6', true);

		this.selectors.nonMormon = this.createSelector(nonMormonSelectorDiv, this.data.booksOverview.filter((d) => !d.isMormon))
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

		this.setBook(selectedMormonBook);
		this.setBook(selectedNonMormonBook);
	}

	setBook(filename) {
		let isMormon = this.data.booksOverview.filter((d) => d.filename === filename)[0].isMormon;

		d3.csv('assets/dataset/' + filename).then((data) => {
			data = data.map((d) => {
				return { frequency: parseFloat(d.frequency), n: parseFloat(d.n), string: d.string };
			});

			isMormon ? this.data.mormon = data : this.data.nonMormon = data;

			if (this.data.mormon && this.data.nonMormon) {
				console.log('Starting...');
				let start = Date.now();
				let chartData = this.extractIdenticalNGrams();
				let end = Date.now();
				console.log('Done!');

				console.log((end - start) / 1000.0);
				console.log(chartData);
			}
		});
	}

	/** Helper method. Create the selector using the container provided with the set of books provided. */
	createSelector(container, books) {
		let selector = container.append('select');
		selector.selectAll('option')
			.data(books)
			.enter()
			.append('option')
			.text((d) => d.name)
			.attr('value', (d) => d.filename);

		let that = this;
		selector.on('change', function(d, i) {
			that.setBook(this.options[this.selectedIndex].value)
		});

		return selector;
	}

	/** Helper method. Returns dataset of identical NGrams. */
	extractIdenticalNGrams() {
		let strings = this.data.nonMormon.map((e) => { return e.string });
		// console.log(strings);

		return this.data.mormon.filter((d) => {
			if (strings.includes(d.string))
				return d;
		});
		// return [];
	}
}