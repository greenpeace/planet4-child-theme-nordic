//import $ from the global scope
import $ from 'jquery';
import './components/acf-editor';
// import './components/blockquote'

import { registerBlockStyle } from '@wordpress/blocks';

wp.domReady(() => {

    // console.log('Registering quote style');

    registerBlockStyle('core/quote', {
        name: 'custom',
        label: 'Custom',
    });

});