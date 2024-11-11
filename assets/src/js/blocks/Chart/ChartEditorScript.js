//Register the block here
import { ChartEditor } from './ChartEditor';
import { ChartFrontend } from './ChartFrontend';
const { registerBlockType, registerBlockStyle } = wp.blocks;
const { RawHTML } = wp.element;
const { __ } = wp.i18n;

const BLOCK_NAME = 'planet4-blocks/chart';

const attributes = {
    chart_title: {
        type: 'string',
        default: 'Chart',
    },
    description: {
        type: 'string',
        default: 'Visualize data from a spreadsheet using one of several chart types.',
    },
    url: {
        type: 'string',
        default: '',
    },
};

const styles = [
    {
        name: 'one',
        label: 'One',
        isDefault: true,
    },
    {
        name: 'two',
        label: 'Two',
    },
    {
        name: 'Three',
        label: 'Three',
    },
];

console.log('ChartEditorScript.js loaded'); // Add this log

registerBlockType(BLOCK_NAME, {
    title: 'Chart',
    description: __('Visualize data from a spreadsheet using one of several chart types.', 'planet4-blocks-backend'),
    icon: 'chart-bar',
    category: 'planet4-blocks',
    keywords: [
        'chart',
        'table',
        'graph',
    ],
    supports: {
        html: true, // Enables "Edit as HTMl" block option.
    },
    attributes,
    edit: () => <p>Chart Block Editor would render from ChartEditor</p>,
    save: () => <p>Saves the updated blocks attributes and should return the ChartFrontend</p>,
});

// Add our custom styles
registerBlockStyle(BLOCK_NAME, styles);