<?php

/**
 * Share on Social block pattern.
 *
 * @package Planet4ChildThemeNordic
 */

return [
    'title'       => __('Share on Social', 'planet4-child-theme-nordic'),
    'description' => __('Social sharing buttons with heading and description.', 'planet4-child-theme-nordic'),
    'categories'  => ['planet4'],
    'content'     => '
        <!-- wp:group {"metadata":{"name":"Share on Social"},"className":"share-block__buttons","layout":{"type":"constrained"}} -->
        <div class="wp-block-group share-block__buttons"><!-- wp:spacer {"height":"30px"} -->
        <div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
        <!-- /wp:spacer -->

        <!-- wp:heading {"level":3,"style":{"typography":{"textAlign":"center"}}} -->
        <h3 class="wp-block-heading has-text-align-center">Help us and share!</h3>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"className":"py-4","style":{"typography":{"textAlign":"center"}}} -->
        <p class="has-text-align-center py-4">This is some text as a sample description. </p>
        <!-- /wp:paragraph -->

        <!-- wp:group {"className":"buttons-row","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
        <div class="wp-block-group buttons-row"><!-- wp:buttons {"className":"share-button share-button\u002d\u002dcopy "} -->
        <div class="wp-block-buttons share-button share-button--copy"><!-- wp:button {"className":"gp-share-copy"} -->
        <div class="wp-block-button gp-share-copy"><a class="wp-block-button__link wp-element-button">Copy link</a></div>
        <!-- /wp:button --></div>
        <!-- /wp:buttons -->

        <!-- wp:buttons {"className":"share-button share-button\u002d\u002dcopy "} -->
        <div class="wp-block-buttons share-button share-button--copy"><!-- wp:button {"className":"gp-share-facebook"} -->
        <div class="wp-block-button gp-share-facebook"><a class="wp-block-button__link wp-element-button">Facebook</a></div>
        <!-- /wp:button --></div>
        <!-- /wp:buttons -->

        <!-- wp:buttons {"className":"share-button share-button\u002d\u002dwhatsapp "} -->
        <div class="wp-block-buttons share-button share-button--whatsapp"><!-- wp:button {"className":"gp-share-whatsapp"} -->
        <div class="wp-block-button gp-share-whatsapp"><a class="wp-block-button__link wp-element-button">WhatsApp</a></div>
        <!-- /wp:button --></div>
        <!-- /wp:buttons -->

        <!-- wp:buttons {"className":"share-button share-button\u002d\u002dlinkedin "} -->
        <div class="wp-block-buttons share-button share-button--linkedin"><!-- wp:button {"className":"gp-share-linkedin"} -->
        <div class="wp-block-button gp-share-linkedin"><a class="wp-block-button__link wp-element-button">LinkedIn</a></div>
        <!-- /wp:button --></div>
        <!-- /wp:buttons --></div>
        <!-- /wp:group -->

        <!-- wp:group {"className":"custom-message-group","layout":{"type":"constrained"}} -->
        <div class="wp-block-group custom-message-group"><!-- wp:paragraph {"metadata":{"name":"Instructions"},"className":"custom-meesage-instructions","style":{"typography":{"textAlign":"center"}},"fontSize":"small"} -->
        <p class="has-text-align-center custom-meesage-instructions has-small-font-size"><em>Type your custom sharing Whatsapp message in the block below, or leave empty for the default translation of "I just signed this petition, Want to join me?"</em></p>
        <!-- /wp:paragraph -->

        <!-- wp:paragraph {"metadata":{"name":"Share message"},"className":"share-message has-grey-200-background-color has-background","style":{"typography":{"textAlign":"center"}},"backgroundColor":"grey-200"} -->
        <p class="has-text-align-center share-message has-grey-200-background-color has-background"></p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:group -->

        <!-- wp:spacer {"height":"30px"} -->
        <div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
        <!-- /wp:spacer --></div>
        <!-- /wp:group -->
    ',
];
