import { LitElement, html, css } from 'lit';

/**
 * TablePagination component for tables
 * @element table-pagination
 * @prop {number} startIndex - Starting index of current page
 * @prop {number} endIndex - Ending index of current page
 * @prop {number} totalItems - Total number of items
 * @prop {number} currentPage - Current page number
 * @prop {number} totalPages - Total number of pages
 * @prop {string} lang - Language for text (default: 'en')
 * @prop {string} textKey - Key for the text object (e.g., 'alertsText' or 'alertSettingsText')
 * @fires page-change - Fired when page changes
 */

export class TablePagination extends LitElement {
    static styles = css`
        :host {
            display: block;
            margin-top: 1rem;
        }

        .pagination-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.625rem;
        }

        .results-summary {
            color: var(--dds-color-common-neutral-default);
            flex-grow: 1000;
            font-size: 0.875rem;
        }

        .pagination-controls {
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
        }

        .results-summary strong {
            font-weight: 600;
        }
    `;

    static properties = {
        startIndex: { type: Number, attribute: 'start-index' },
        endIndex: { type: Number, attribute: 'end-index' },
        totalItems: { type: Number, attribute: 'total-items' },
        currentPage: { type: Number, attribute: 'current-page' },
        totalPages: { type: Number, attribute: 'total-pages' },
        lang: { type: String },
        textKey: { type: String, attribute: 'text-key' },
        text: { type: Object }
    };

    constructor() {
        super();
        this.startIndex = 0;
        this.endIndex = 0;
        this.totalItems = 0;
        this.currentPage = 1;
        this.totalPages = 1;
        this.lang = 'en';
        this.textKey = '';
        // Default text for English
        this.text = {
            alertsText: {
                en: {
                    showingResults:
                        'Showing <strong>{start}</strong> to <strong>{end}</strong> of <strong>{total}</strong> results'
                },
                ja: {
                    showingResults:
                        '<strong>{start}</strong>から<strong>{end}</strong>まで表示（全<strong>{total}</strong>件）'
                }
            },
            alertSettingsText: {
                en: {
                    showingResults:
                        'Showing <strong>{start}</strong> to <strong>{end}</strong> of <strong>{total}</strong> results'
                },
                ja: {
                    showingResults:
                        '<strong>{start}</strong>から<strong>{end}</strong>まで表示（全<strong>{total}</strong>件）'
                }
            }
        };
    }

    render() {
        const textObj = this.text[this.textKey] || this.text;
        const showingResults =
            textObj[this.lang]?.showingResults ||
            textObj.en?.showingResults ||
            'Showing <strong>{start}</strong> to <strong>{end}</strong> of <strong>{total}</strong> results';

        const formattedResults = showingResults
            .replace('{start}', this.startIndex + 1)
            .replace('{end}', Math.min(this.endIndex, this.totalItems))
            .replace('{total}', this.totalItems);

        return html`
            <div class="pagination-container">
                <div class="results-summary" .innerHTML=${formattedResults}></div>
                <div class="pagination-controls">
                    <daikin-pagination
                        .total=${this.totalPages}
                        .current=${this.currentPage}
                        @change=${this._handlePageChange}
                    ></daikin-pagination>
                </div>
            </div>
        `;
    }

    _handlePageChange(event) {
        const newPage = event.target.current;
        this.dispatchEvent(
            new CustomEvent('page-change', {
                detail: { page: newPage },
                bubbles: true,
                composed: true
            })
        );
    }
}

customElements.define('table-pagination', TablePagination);
