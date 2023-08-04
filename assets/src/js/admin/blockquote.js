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

function listCiteElements() {
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

        console.log(`Cite Element ${index + 1}: Content: ${citeElement.textContent}, Color: ${citeColor}, Border Color: ${borderciteColor}`);
    });
}


// Function to register the custom block style
document.addEventListener('DOMContentLoaded', () => {
    listCiteElements();

    // Listen for block selection changes and update the CSS variable
    wp.data.subscribe(() => {
        listCiteElements();
    });
});

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
