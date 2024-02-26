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
 * Version: 1.48.0
 */


// Filter available Gutenberg standard blocks
require_once 'includes/gutenberg-blocks.php';
// Modify the CSP page header
require_once 'includes/csp-headers.php';

add_action('admin_menu', 'remove_acf_options_page', 99);
function remove_acf_options_page()
{
    remove_menu_page('acf-options');
}

//load the child theme styles
add_action('wp_enqueue_scripts', 'enqueue_child_styles');
function enqueue_child_styles()
{
    $css_creation = filectime(get_stylesheet_directory() . '/assets/build/style.min.css');
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/assets/build/style.min.css', ['parent-style'], $css_creation);
}

// Load the child theme frontend scripts
// Enqueue scripts for frontend and block editor
function enqueue_child_scripts()
{
    // Load scripts for frontend
    wp_enqueue_script('child-js', get_stylesheet_directory_uri() . '/assets/build/index.js', ['jquery'], '0.26', true);

    // Enqueue scripts for block editor
    wp_enqueue_script(
        'gpn_gutenberg_scripts_blocks', 
        get_stylesheet_directory_uri() . '/assets/build/index.js',
        array( 'wp-blocks', 'wp-data', 'wp-dom', 'wp-editor', 'p4gbks_admin_script' ), // Dependencies: wp-blocks and wp-edit-post
        filemtime( get_stylesheet_directory() . '/assets/build/index.js' ),
        true
    );

    // Note: You may need to make sure 'p4gbks_admin_script' is a valid dependency for block editor
}
add_action('wp_enqueue_scripts', 'enqueue_child_scripts');
add_action('enqueue_block_editor_assets', 'enqueue_child_scripts'); // Enqueue for block editor too

//Load the child theme gtb editor script
 function p4_child_theme_gpn_gutenberg_scripts() {
     wp_enqueue_script(
         'gpn-customizations',
         get_stylesheet_directory_uri() . '/assets/src/js/admin/editor.js',
        //  p4gbks_admin_script is the JS that is loaded in planet4-plugin-gutenberg-block:
        //  https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/4ae684660c83361f6d5f9d96744362ea7422cc4f/classes/class-loader.php#L296-L302
        //  By putting it in the dependency list, we ensure our code gets loaded later so we can overwrite some of it.
         array( 'wp-blocks', 'wp-dom', 'p4gbks_admin_script', 'planet4-blocks-editor-script' ),
         filemtime( get_stylesheet_directory() . '/assets/src/js/admin/editor.js'),
         true
     );

     $user  = wp_get_current_user();
     $roles = ( array ) $user->roles;

     $script_params = array(
         'roles'     => $roles,
         'post_type' => get_post_type(),
     );

     wp_localize_script( 'gpn-customizations', 'gpnUserData', $script_params );
 }

 add_action( 'enqueue_block_editor_assets', 'p4_child_theme_gpn_gutenberg_scripts' );

//Load the editor scripts for ACF
function enqueue_custom_scripts() {
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

//hide from page search rsults the published pages with external counter tempate integration
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
    'save_post', function ( $post_id, $post, $update ) {
        $template = get_post_meta($post_id, '_wp_page_template', true);
        if ('page-templates/page-hide-from-search.php' === $template ) {
            update_post_meta($post_id, 'p4_do_not_index', true);
        } elseif ('includes/page-external-counter.php' === $template ) {
            update_post_meta($post_id, 'p4_do_not_index', true);
        } else {
            delete_post_meta($post_id, 'p4_do_not_index');
        }
    }, 99, 3
);


/**
 * Font Awesome Kit Setup
 *
 * This will add the Font Awesome Kit to the front-end, the admin back-end,
 * and the login screen area.
 */
if (! function_exists('fa_custom_setup_kit') ) {
    function fa_custom_setup_kit($kit_url = '')
    {
        foreach ( [ 'wp_enqueue_scripts', 'admin_enqueue_scripts', 'login_enqueue_scripts' ] as $action ) {
            add_action(
                $action,
                function () use ( $kit_url ) {
                    wp_enqueue_script('font-awesome-kit', $kit_url, [], null);
                }
            );
        }
    }
}

fa_custom_setup_kit('https://kit.fontawesome.com/508a5d6fe1.js');


