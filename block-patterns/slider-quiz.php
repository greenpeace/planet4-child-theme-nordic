<?php
/**
 * Slider Quiz block pattern.
 *
 * @package Planet4ChildThemeNordic
 */

return [
    'title'       => __('Slider Quiz', 'planet4-child-theme-nordic'),
    'description' => __('A slider quiz wrapper with an empty Gravity Forms block.', 'planet4-child-theme-nordic'),
    'categories'  => ['planet4'],
    'content'     => '
        <!-- wp:group {"metadata":{"name":"Slider quiz"},"className":"slider-quiz","layout":{"type":"default"}} -->
        <div class="wp-block-group slider-quiz"><!-- wp:gravityforms/form {"formId":"","inputPrimaryColor":"#204ce5","style":{"css":"slider-quiz"}} /--></div>
        <!-- /wp:group -->
    ',
];