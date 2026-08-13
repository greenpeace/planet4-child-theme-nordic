<?php

/**
 * Greenpeace Planet4 Child Theme Nordic
 *
 * Child theme for the Planet 4 WordPress project.
 *
 * @category   Theme
 * @package    Planet4_Child_Theme_Nordic
 * @author     Greenpeace Nordic, Svilena Koleva <svilena.koleva@greenpeace.org>
 * @license    MIT, https://opensource.org/licenses/MIT
 * @version    1.47.14
 * @link       https://github.com/greenpeace/planet4-child-theme-nordic
 * @since      7.4
 * @textdomain planet4-child-theme-nordic
 */

define('THEME_VERSION', '1.47.14');

// Modify the CSP page header
require_once 'includes/csp-headers.php';
// require_once 'patterns/SliderQuiz.php';

//Add Convert & iRaiser first
add_action('wp_head', function () {
?>
    <!-- begin Convert Experiences code-->
    <script type="text/javascript" async src="//cdn-4.convertexperiments.com/v1/js/100414510-100416144.js"></script><!-- end Convert Experiences code -->
    <!-- Add anti flickering code -->
    <script>
        (function() {
            //disables the automatic body hiding of the convert script
            var _conv_prevent_bodyhide = true;
            //the duration, in mili seconds, for which the body is kept hidden if Convert tracking code does not load.
            var hideTimeout = 500; //modify this to whatever you think it's suitable

            var cssToHide = "body {visibility: hidden !important;}",
                headElement = document.head || document.getElementsByTagName("headElement")[0],
                styleElement = document.createElement("style");
            headElement.appendChild(styleElement);
            styleElement.type = "text/css";
            styleElement.id = "convert_hide_body"; //do not change this
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = cssToHide;
            } else {
                styleElement.appendChild(document.createTextNode(cssToHide));
            }
            setTimeout(function() {
                var c_h = document.getElementById("convert_hide_body");
                if (c_h) c_h.outerHTML = "";
            }, hideTimeout)
        })();
    </script>
<?php
}, 1);

// Enqueue the external iRaiserFrame.js script
add_action('wp_enqueue_scripts', function () {
    // Determine the correct iRaiser URL based on the current country/URL structure
    $path = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));
    $country_slug = $path[0] ?? '';

    switch ($country_slug) {
        case 'denmark':
            $domain = 'stoet.greenpeace.org';
            break;
        case 'finland':
            $domain = 'lahjoita.greenpeace.org';
            break;
        case 'norway':
            $domain = 'bidra.greenpeace.org';
            break;
        case 'sweden':
            $domain = 'stod.greenpeace.org';
            break;
        default:
            $domain = 'lahjoita.greenpeace.org';
            break;
    }

    $iraiser_url = "https://{$domain}/libs.iraiser.eu/libs/payment/frame/1.7/IRaiserFrame.js";

    wp_enqueue_script(
        'iraiser-frame', // Unique handle
        $iraiser_url,    // Script source URL
        [],              // No dependencies needed
        '1.7',           // Version
        false            // Load in the <head> (set to true for footer)
    );
}, 10);

/**
 * Enqueue frontend styles
 *
 * @return void
 */
add_action('wp_enqueue_scripts', 'gpn_enqueue_frontend_styles', 100);

function gpn_enqueue_frontend_styles()
{

    // Enqueue the parent theme's style.css
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    wp_enqueue_style(
        'gpn-frontend-style',
        get_stylesheet_directory_uri() . '/assets/build/style.min.css',
        array('parent-style'),
        THEME_VERSION . '.' . filemtime(
            get_stylesheet_directory() . '/assets/build/style.min.css'
        )
    );
}

/**
 * Enqueue block editor styles
 *
 * @return void
 */
add_action( 'enqueue_block_editor_assets', 'gpn_enqueue_editor_styles' );

function gpn_enqueue_editor_styles() {

	wp_enqueue_style(
		'gpn-editor-styles',
		get_stylesheet_directory_uri() . '/assets/build/editorStyle.min.css',
		array(),
		THEME_VERSION . '.' . filemtime(
			get_stylesheet_directory() . '/assets/build/editorStyle.min.css'
		)
	);
}

/**
 * Enqueue frontend scripts
 *
 * @return void
 */
add_action('wp_enqueue_scripts', 'gpn_enqueue_frontend_scripts');

function gpn_enqueue_frontend_scripts()
{

    wp_enqueue_script(
        'gpn-frontend-scripts',
        get_stylesheet_directory_uri() . '/assets/build/index.min.js',
        array(
            'jquery',
            'wp-blocks',
            'wp-data',
            'wp-dom',
            'wp-editor',
            'wp-element',
            'wp-components',
        ),
        THEME_VERSION . '.' . filemtime(
            get_stylesheet_directory() . '/assets/build/index.min.js'
        ),
        true
    );
}

/**
 * Enqueue block editor scripts
 *
 * Loads the backend editor bundle for the WordPress block editor.
 *
 * @return void
 */
add_action('admin_enqueue_scripts', 'gpn_enqueue_editor_scripts');

function gpn_enqueue_editor_scripts()
{

    wp_enqueue_script(
        'gpn-editor-scripts',
        get_stylesheet_directory_uri() . '/assets/build/editor.min.js',
        array(
            'wp-blocks',
            'wp-data',
            'wp-dom',
            'wp-dom-ready',
            'wp-editor',
            'wp-element',
            'wp-components',
        ),
        THEME_VERSION . '.' . filemtime(
            get_stylesheet_directory() . '/assets/build/editor.min.js'
        ),
        true
    );

    wp_localize_script(
        'gpn-editor',
        'gpnUserData',
        array(
            'roles'     => (array) wp_get_current_user()->roles,
            'post_type' => get_post_type(),
        )
    );
}

/**
 * Register child theme block patterns
 */

add_action('init', function () {

    register_block_pattern_category(
        'planet4-nordic',
        [
            'label' => __('Nordic Patterns', 'planet4-child-theme-nordic'),
        ]
    );


    $patterns = [
        'p4/slider-quiz' => 'slider-quiz.php',
        'p4/share-on-social' => 'share-on-social.php',
        'p4/flip-cards' => 'flip-cards.php',
    ];


    foreach ($patterns as $name => $file) {

        register_block_pattern(
            $name,
            require __DIR__ . '/block-patterns/' . $file
        );
    }
}, 30);

/**
 * Theme settings modificatons
 * Filter whitelisted Gutenberg standard blocks
 *
 * @return void
 */
add_action('after_setup_theme', 'P4NO_Setup_Block_filter');
function P4NO_Setup_Block_filter()
{
    add_filter('allowed_block_types_all', 'p4no_allowed_post_type_blocks', 10, 2);
}

/**
 * Filter allowed blocks for each post type.
 *
 * @param array  $allowed_block_types Array of allowed block types.
 * @param object $editor_context      The editor context.
 *
 * @return array The filtered array of allowed block types.
 */
function p4no_allowed_post_type_blocks($allowed_block_types, $editor_context)
{

    $allowed_blocks_core = [
        //@see https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
        'core/block', //Reuse this design across your site
        'core/button', //Prompt visitors to take action with a button-style link
        'core/buttons', //Prompt visitors to take action with a group of button-style links
        'core/column', //A single column within a columns block
        'core/columns', //Display content in multiple columns, with blocks added to each column
        'core/cover', //Add an image or video with a text overlay
        'core/details', //Hide and show additional content
        'core/embed', //Add a block that displays content pulled from other sites, like Twitter or YouTube
        'core/file', //Add a link to a downloadable file
        'core/footnotes', //Add a footnote to your content
        'core/group', //Gather blocks in a layout container
        'core/heading',
        'core/html', //Add custom HTML code and preview it as you edit
        'core/image',
        'core/list', //Create a bulleted or numbered list
        'core/list-item', //Create a list item
        'core/media-text', //Set media and words side-by-side for a richer layout
        'core/paragraph',
        'core/pattern', //Show a block pattern
        'core/quote', //Give quoted text visual emphasis
        'core/separator', //Create a break between ideas or sections with a horizontal separator
        'core/shortcode', //Insert additional custom elements with a WordPress shortcode
        'core/spacer', //Add white space between blocks and customize its height.
        'core/table', //Create structured content in rows and columns to display information
    ];

    $p4_custom_blocks = [
        //Blocks from planet4-master-theme
        //@see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Loader.php#L194
        'planet4-blocks/accordion', //mt
        'planet4-blocks/articles',
        'planet4-blocks/carousel-header', //mt
        'planet4-blocks/columns', //mt
        // 'planet4-blocks/cookies', // disabled as not used
        'planet4-blocks/counter', //mt
        'planet4-blocks/covers',
        'planet4-blocks/gallery', //mt
        'planet4-blocks/guestbook', //mt 50yrs
        // 'planet4-blocks/happypoint', // disabled as not used
        // 'planet4-blocks/media-video', // disabled as we don't upload videos
        // 'planet4-blocks/social-media', //mt disabled, not needed
        'planet4-blocks/spreadsheet', //mt
        'planet4-blocks/submenu', //mt
        'planet4-blocks/timeline', //mt
        'gravityforms/form', // TODO: Connect to our DB; Contact form, ETT, etc.
        'acf/leads-form',
        // 'acf/p4-gpn-block-testimonial',

    ];

    // Includes all custom p4 patterns
    // @see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Patterns/BlockPattern.php#L41
    $p4_custom_patterns = [
        'planet4-block-templates/deep-dive', //mt
        'planet4-block-templates/highlighted-cta', //mt
        'planet4-block-templates/quick-links', //mt
        'planet4-block-templates/reality-check', //mt
        'planet4-block-templates/issues', //mt
        'planet4-block-templates/page-header', //mt
        'planet4-block-templates/page-header-img-left', //mt
        'planet4-block-templates/side-image-with-text-and-cta', //mt
        'p4/slider-quiz' //ct
    ];

    // Includes all custom p4 layouts
    //@see https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/main/planet4-gutenberg-blocks.php#L204
    $p4_custom_pattern_layouts = [
        'planet4-block-templates/blank-page', //mt
        'planet4-block-templates/action', //gb
        'planet4-block-templates/campaign', //gb
        'planet4-block-templates/deep-dive-topic', //gb
        'planet4-block-templates/high-level-topic', //gb
        'planet4-block-templates/get-informed', //gb
        'planet4-block-templates/take-action', //mt
        'planet4-block-templates/homepage', //gb
    ];

    if ($editor_context->post->post_type === 'page') {

        //All custom P4 blocks are allowed
        //@see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Loader.php#L194

        //All custom P4 patterns and layouts whitelisted
        //@see https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/main/planet4-gutenberg-blocks.php#L204

        error_log('Allowed Page Layouts: ' . print_r($p4_custom_pattern_layouts, true));
        return array_merge($allowed_blocks_core, $p4_custom_blocks, $p4_custom_patterns, $p4_custom_pattern_layouts);
    }

    if ($editor_context->post->post_type === 'post') {

        $allowed_blocks_post = [
            // Blocks from planet4-plugin-gutenberg-blocks
            // @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
            'planet4-blocks/accordion',
            'planet4-blocks/articles',
            // 'planet4-blocks/counter', //disabled as not used
            'planet4-blocks/gallery',
            'planet4-blocks/spreadsheet',
            // 'planet4-blocks/submenu', //mt //TODO: fix frontend rendering
            'planet4-blocks/take-action-boxout', //incl only on posts
            'planet4-blocks/timeline',
            // 'acf/p4-gpn-block-testimonial',
            'acf/leads-form',
            //'gravityforms/form', // TODO: Leads gen connect to our DB; Gravity Forms block quiz, Email to target, etc.
        ];
        return array_merge($allowed_blocks_core, $allowed_blocks_post);
    }

    //removed "campaign" logic as it will be decomossioned soon and it is not used

    if ($editor_context->post->post_type === 'p4_action') {

        //All custom P4 blocks are allowed
        //@see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Loader.php#L194

        $allowed_p4_layouts_action = [
            'planet4-block-templates/blank-page',
            'planet4-block-templates/action', //gb
            'planet4-block-templates/campaign', //gb
        ];

        error_log('Allowed Action Layouts: ' . print_r($allowed_p4_layouts_action, true));
        return array_merge($allowed_blocks_core, $p4_custom_blocks, $p4_custom_patterns, $allowed_p4_layouts_action);
    }

    return $allowed_block_types;
}

add_action(
    'admin_menu',
    function () {
        // Remove ACF Options page
        if (function_exists('acf_add_options_page')) {
            remove_menu_page('acf-options');
        }

        // Remove ACF Custom Fields menu
        if (post_type_exists('acf-field-group')) {
            remove_menu_page('edit.php?post_type=acf-field-group');
        }

        // Remove Campaigns menu item
        if (post_type_exists('campaign')) {
            remove_menu_page('edit.php?post_type=campaign');
        }
    },
    99
);

add_action('wp_head', 'Get_All_Hidden_Template_pages');
add_action('wp_head', 'Get_All_Counter_Template_pages');
/**
 * Get all hidden template pages and hide them from search
 *
 * @return void
 */
function Get_All_Counter_Template_pages()
{
    $args = array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'meta_key' => '_wp_page_template',
        'meta_value' => 'includes/page-external-counter.php',
        'posts_per_page' => -1,
        'publicly_queryable' => false
    );
    $query = new WP_Query($args);
    $counterTemplatePages = $query->posts;
    return $counterTemplatePages;
}

//Simplified fix to include posts back to internal search results by @lithrel
add_action(
    'save_post',
    function ($post_id, $post, $update) {
        $template = get_post_meta($post_id, '_wp_page_template', true);
        if ('page-templates/page-hide-from-search.php' === $template) {
            update_post_meta($post_id, 'p4_do_not_index', true);
        } elseif ('includes/page-external-counter.php' === $template) {
            update_post_meta($post_id, 'p4_do_not_index', true);
        } else {
            delete_post_meta($post_id, 'p4_do_not_index');
        }
    },
    99,
    3
);
/**
 * Get all hidden template pages
 *
 * @return void
 */
function Get_All_Hidden_Template_pages()
{
    $args = array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'meta_key' => '_wp_page_template',
        'meta_value' => 'page-templates/page-hide-from-search.php',
        'posts_per_page' => -1,
        'publicly_queryable' => false
    );
    $query = new WP_Query($args);
    $hiddenTemplatePages = $query->posts;
    return $hiddenTemplatePages;
}

/**
 * Tell visitor browsers to check Cloudflare for the latest version on every load,
 * while inheriting all default Cloudflare CDN and "Always Online" rules.
 */
add_action('send_headers', function () {
    if (!is_admin() && !is_user_logged_in()) {
        header('Cache-Control: no-cache');
    }
});