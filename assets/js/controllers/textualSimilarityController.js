/**
 * textualSimilarityController.js
 *
 * Manages the various visualization pieces for textual similarity. This is both the overview component
 * and the detailed component.
 */
import { TextualSimilarityOverview } from '../visualizations/textualSimilarityOverview.js';
import { TextualSimilaritySection } from '../visualizations/textualSimilaritySection.js';

export class TextualSimilarityController {
	constructor(parentContainer) {
		this.overview = new TextualSimilarityOverview(parentContainer);
		this.section = new TextualSimilaritySection(parentContainer);
	}

	/** Sets the newly selected books to the components within the controller. */
	setBooks(mormonBook, nonMormonBook) {
		this.overview.setBooks(mormonBook, nonMormonBook);
		this.section.setBooks(mormonBook, nonMormonBook);
	}
}