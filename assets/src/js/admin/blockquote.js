import { registerBlockStyle } from '@wordpress/blocks';
import { subscribe } from '@wordpress/data';

function getComputedStyleProperty(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

function rgbToHex(rgbString) {
    const [r, g, b] = rgbString
        .substring(rgbString.indexOf('(') + 1, rgbString.lastIndexOf(')'))
        .split(',')
        .map((color) => parseInt(color.trim(), 10));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getBorderLeftColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-left-color');
}

function getBorderRightColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-right-color');
}

function getBorderTopColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-top-color');
}

function getBorderBottomColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-bottom-color');
}

document.addEventListener('DOMContentLoaded', () => {
    const customBlockQuotes = document.querySelectorAll('.wp-block-quote.is-style-custom');
    if (customBlockQuotes.length > 0) {
        customBlockQuotes.forEach((customBlockQuote, index) => {
            // Execute your logic for each element
            listCiteElements(customBlockQuote);

            if (typeof wp !== 'undefined' && typeof wp.data !== 'undefined' && typeof wp.blocks !== 'undefined') {

                // Listen for block selection changes and update the CSS variable
                try {
                    wp.data.subscribe(() => {
                        listCiteElements(customBlockQuote);
                        console.log(`Successfully listened to quote ${index + 1}`);
                    });
                } catch (error) {
                    console.error(`Failed to subscribe to data changes for quote ${index + 1}:`, error);
                }
            }
        });
    }
    function listCiteElements(customBlockQuote) {
        const citeElements = document.querySelectorAll('.wp-block-quote.is-style-custom > cite');
        citeElements.forEach((citeElement, index) => {
            const citeColor = rgbToHex(getComputedStyleProperty(citeElement, 'color'));
            const blockquoteElement = citeElement.closest('.wp-block-quote');
            let borderciteColor;

            switch (true) {
                case blockquoteElement.classList.contains('has-text-align-right'):
                    borderciteColor = getBorderRightColor(blockquoteElement);
                    blockquoteElement.style.borderRightColor = citeColor;
                    break;
                case blockquoteElement.classList.contains('has-text-align-center'):
                    borderciteColor = getBorderTopColor(blockquoteElement);
                    blockquoteElement.style.borderTopColor = citeColor;
                    borderciteColor = getBorderBottomColor(blockquoteElement);
                    blockquoteElement.style.borderBottomColor = citeColor;
                    break;
                case blockquoteElement.classList.contains('has-text-align-left'):
                    borderciteColor = getBorderLeftColor(blockquoteElement);
                    blockquoteElement.style.borderLeftColor = citeColor;
                    break;
                default:
                    // For wp-block-quote.is-style-custom and has-text-align-left
                    borderciteColor = getBorderLeftColor(blockquoteElement);
                    blockquoteElement.style.borderLeftColor = citeColor;
                    break;
            }
            // console.log(`Cite Element ${index + 1}: Content: ${citeElement.textContent}, Color: ${citeColor}, Border Color: ${borderciteColor}`);
        });
    }

});

try {
    if (typeof wp !== 'undefined' && wp.blocks) {
        // Block Style Registration
        wp.blocks.registerBlockStyle('core/quote', [
            {
                name: 'custom',
                label: 'Custom',
                isDefault: false,
                inlineStyle: {
                    color: 'inherit',
                    'font-size': 'inherit',
                    'border-left': '4px solid inherit',
                    padding: '0.2rem 0 0.2rem 1rem',
                    position: 'relative',
                },
            },
        ]);
    }
} catch (error) {
    console.error('Failed to register block style', error);
}