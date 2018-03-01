/* eslint-env browser */

import requestRedraw from './requestRedraw';

export default class extends HTMLElement {

    requestRedraw() {
        requestRedraw(this);
    }

    get autoResize() {
        return this.hasAttribute('auto-resize') && this.getAttribute('auto-resize') !== 'false';
    }

    set autoResize(autoResize) {
        if (autoResize && !this.autoResize) {
            this.setAttribute('auto-resize', '');
        } else if (!autoResize && this.autoResize) {
            this.removeAttribute('auto-resize');
        }
        this.updateAutoResize();
    }

    updateAutoResize() {
        if (this.autoResize) {
            if (this.__autoResizeListener__ == null) {
                this.__autoResizeListener__ = () => requestRedraw(this);
            }
            addEventListener('resize', this.__autoResizeListener__);
        } else {
            removeEventListener('resize', this.__autoResizeListener__);
        }
    }

    static get observedAttributes() {
        return ['auto-resize'];
    }

    attributeChangedCallback(name) {
        switch (name) {
        case 'auto-resize':
            this.updateAutoResize();
            break;
        }
    }
};
