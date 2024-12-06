<?php

/**
 * Theme Name: Greenpeace Planet4 Child Theme Nordic
 * Theme URI: Theme URI: https://github.com/greenpeace/planet4-child-theme-nordic
 * Description: Child theme for the Planet 4 Wordpress project
 * Author: Greenpeace Nordic
 * Author URI: https://github.com/greenpeace
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Tags: light, accessibility-ready
 * Text Domain: planet4-child-theme-nordic
 * Version: 1.48.3
 */

// Modify the CSP page header
require_once 'includes/csp-headers.php';

//load the child theme styles
add_action('wp_enqueue_scripts', 'enqueue_child_styles', 100);
function enqueue_child_styles()
{
    // Enqueue the parent theme's style.css
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    $css_creation = filectime(get_stylesheet_directory() . '/assets/build/style.min.css');
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/assets/build/style.min.css', ['parent-style'], $css_creation, 'all', true);
}

// Load the child theme frontend scripts
// Enqueue scripts for frontend and block editor
function enqueue_child_scripts()
{
    // Load scripts for frontend
    wp_enqueue_script('child-js', get_stylesheet_directory_uri() . '/assets/build/index.js', ['jquery'], '0.27.4', true);

    // Enqueue scripts for block editor
    wp_enqueue_script(
        'gpn_gutenberg_scripts_blocks',
        get_stylesheet_directory_uri() . '/assets/build/index.js',
        array('wp-blocks', 'wp-data', 'wp-dom', 'wp-editor', 'p4gbks_admin_script'), // Dependencies: wp-blocks and wp-edit-post
        filemtime(get_stylesheet_directory() . '/assets/build/index.js'),
        true
    );

    // Note: You may need to make sure 'p4gbks_admin_script' is a valid dependency for block editor
}
add_action('wp_enqueue_scripts', 'enqueue_child_scripts');
add_action('enqueue_block_editor_assets', 'enqueue_child_scripts'); // Enqueue for block editor too

//Load the child theme gtb editor script
function p4_child_theme_gpn_gutenberg_scripts()
{
    wp_enqueue_script(
        'gpn-customizations',
        get_stylesheet_directory_uri() . '/assets/src/js/admin/editor.js',
        //  p4gbks_admin_script is the JS that is loaded in planet4-plugin-gutenberg-block:
        //  https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/4ae684660c83361f6d5f9d96744362ea7422cc4f/classes/class-loader.php#L296-L302
        //  By putting it in the dependency list, we ensure our code gets loaded later so we can overwrite some of it.
        array('wp-blocks', 'wp-dom', 'p4gbks_admin_script', 'planet4-blocks-editor-script'),
        filemtime(get_stylesheet_directory() . '/assets/src/js/admin/editor.js'),
        true
    );

    $user  = wp_get_current_user();
    $roles = (array) $user->roles;

    $script_params = array(
        'roles'     => $roles,
        'post_type' => get_post_type(),
    );

    wp_localize_script('gpn-customizations', 'gpnUserData', $script_params);
}

add_action('enqueue_block_editor_assets', 'p4_child_theme_gpn_gutenberg_scripts');

//Load the editor scripts for ACF
function enqueue_custom_scripts()
{
    if (is_admin()) {
        wp_enqueue_script(
            'custom-acf-editor-script',
            get_stylesheet_directory_uri() . '/assets/src/js/admin/acf-editor.js',
            array(), // Dependencies (if any)
            filemtime(get_stylesheet_directory() . '/assets/src/js/admin/acf-editor.js'),
            true // Make sure the script is enqueued in the footer
        );
    }
}
add_action('admin_enqueue_scripts', 'enqueue_custom_scripts'); // Hook into admin_enqueue_scripts

//hide from page search results the published pages with external counter tempate integration
add_action('wp_head', 'get_all_counter_template_pages');
function get_all_counter_template_pages()
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

add_action('wp_head', 'get_all_hidden_template_pages');
function get_all_hidden_template_pages()
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
 * Theme settings modificatons
 */

// Filter whitelisted Gutenberg standard blocks
function p4no_setup_block_filter()
{
    add_filter('allowed_block_types_all', 'p4no_allowed_post_type_blocks', 10, 2);
}
add_action('after_setup_theme', 'p4no_setup_block_filter');

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
            // 'acf/leads-form', //TODO: fix issues on posts
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


//remove the acf menu item as it is not used
add_action('admin_menu', 'remove_acf_options_page', 99);
function remove_acf_options_page()
{
    remove_menu_page('acf-options');
}

//remove the acf custom fields menu item as it is not used
add_action('admin_init', function () {
    remove_menu_page('edit.php?post_type=acf-field-group');
    remove_menu_page('Custom Fields');
});


//remove the campaign menu item as it is not used
add_action('admin_init', function () {
    remove_menu_page('edit.php?post_type=campaign');
    remove_menu_page('Campaigns');
});

/**
 * Font Awesome Kit Setup
 *
 * This will add the Font Awesome Kit to the front-end, the admin back-end,
 * and the login screen area.
 */
if (! function_exists('fa_custom_setup_kit')) {
    function fa_custom_setup_kit($kit_url = '')
    {
        foreach (['wp_enqueue_scripts', 'admin_enqueue_scripts', 'login_enqueue_scripts'] as $action) {
            add_action(
                $action,
                function () use ($kit_url) {
                    wp_enqueue_script('font-awesome-kit', $kit_url, [], null);
                }
            );
        }
    }
}

fa_custom_setup_kit('https://kit.fontawesome.com/508a5d6fe1.js');
