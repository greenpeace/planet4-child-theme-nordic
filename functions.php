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
 * Version: 0.0.9
 */

 // Filter available Gutenberg standard blocks
 require_once 'includes/gutenberg-blocks.php';
//  require_once 'template-parts/page-external-counter.php';
//  require_once 'includes/page-hide-from-search.php';
// include 'includes/page-hide-from-search.php';

add_action('admin_menu', 'remove_acf_options_page', 99);
function remove_acf_options_page()
{
    remove_menu_page('acf-options');
}

add_action('wp_enqueue_scripts', 'enqueue_child_styles');
function enqueue_child_styles()
{
    $css_creation = filectime(get_stylesheet_directory() . '/assets/build/style.min.css');
    // wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css', array(), '5.0.0');
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/assets/build/style.min.css', ['parent-style'], $css_creation);
}
// load the child theme scripts
function enqueue_child_scripts()
{
    wp_register_script('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js', array(), '3.6.0', true);
    wp_enqueue_script('jquery');
    // wp_register_script('jquery', get_stylesheet_directory_uri() . '/node_modules/jquery', ['jquery'], '3.5.1', true);
    // wp_enqueue_script('jquery');
    // wp_register_script('popper', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"', [], '1.16.0', true);
    // wp_enqueue_script('popper');
    // wp_register_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js', ['bootstrap'], '5.0.0', true);
    // wp_enqueue_script('bootstrap');
    wp_register_script('child-js', get_stylesheet_directory_uri() . '/assets/build/index.js', ['jquery'], '0.21', true);
    wp_enqueue_script('child-js');
}
add_action('wp_enqueue_scripts', 'enqueue_child_scripts');

//hide from page search rsults the published pages with external counter tempate integration
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

add_action('wp_head', 'get_all_hidden_template_pages');

	//update the current page template meta to not show in the page list in the search results
	// update_post_meta(get_the_ID(), '_wp_page_template', 'page-hide-from-search.php');

	// //echo meta tag robots noindex,nofollow for the hidden pages
	// add_action('wp_head', function(){
	// 	get_post_meta(get_the_ID(), '_wp_page_template', 'page-hide-from-search.php');
	// 	$hiddenPages = get_all_hidden_template_pages();
	// 	foreach ($hiddenPages as $hiddenPage) {
	// 		echo '<meta name="robots" content="noindex,nofollow" />';
	// 	}
	// });

//if a page is published and not using the external counter template, or the page-hide-from-search template, show the page in the search results


// function show_page_from_search_results()
// {
// 	$counterTemplatePages = get_all_counter_template_pages();
// 	$hiddenTemplatePages = get_all_hidden_template_pages();
// 	//get the id of the post page that is currently being viewed
// 	$currentPageId = get_the_ID();
// 	// $currentPage = get_queried_object();
// 	// $currentPageId = $currentPage->ID;
// 	$currentPageTemplate = get_post_meta($currentPageId, '_wp_page_template', true);

// 	//if page is published and not using the external counter template, or the page-hide-from-search template, show the page in the search results
// 	if ($currentPage->post_status == 'publish' && !in_array($currentPageId, $counterTemplatePages) && !in_array($currentPageId, $hiddenTemplatePages)) {
// 		echo '<meta name="robots" content="index,follow">';
// 		// add_post_meta( $currentPageId, 'p4_do_not_index', false );
// 		// wp_update_post($currentPage);
// 		} else {
// 		// $currentPage->post_status = 'private, draft';
// 		echo '<meta name="robots" content="noindex,nofollow">';
// 		// update_post_meta( $currentPageId, 'p4_do_not_index', true );

// 		// wp_update_post($currentPage);

// 	}
// }
// add_action('wp_head', 'show_page_from_search_results');





//  function p4_child_theme_gpn_gutenberg_scripts() {
//      wp_enqueue_script(
//          'gpn-customizations',
//          get_stylesheet_directory_uri() . '/assets/src/js/admin/editor.js',
//         //  p4gbks_admin_script is the JS that is loaded in planet4-plugin-gutenberg-block:
//         //  https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/4ae684660c83361f6d5f9d96744362ea7422cc4f/classes/class-loader.php#L296-L302
//         //  By putting it in the dependency list, we ensure our code gets loaded later so we can overwrite some of it.
//          array( 'wp-blocks', 'wp-dom', 'p4gbks_admin_script' ),
//          filemtime( get_stylesheet_directory() . '/assets/src/js/admin/editor.js'),
//          true
//      );

//     //  $user  = wp_get_current_user();
//     //  $roles = ( array ) $user->roles;

//     //  $script_params = array(
//     //      'roles'     => $roles,
//     //      'post_type' => get_post_type(),
//     //  );

//     //  wp_localize_script( 'gpn-customizations', 'gpnUserData', $script_params );
//  }

//  add_action( 'enqueue_block_editor_assets', 'p4_child_theme_gpn_gutenberg_scripts' );

/**
 * Font Awesome Kit Setup
 *
 * This will add the Font Awesome Kit to the front-end, the admin back-end,
 * and the login screen area.
 */
//removed for now to save loading speed time
// if (! function_exists('fa_custom_setup_kit') ) {
//     function fa_custom_setup_kit($kit_url = '')
//     {
//         foreach ( [ 'wp_enqueue_scripts', 'admin_enqueue_scripts', 'login_enqueue_scripts' ] as $action ) {
//             add_action(
//                 $action,
//                 function () use ( $kit_url ) {
//                     wp_enqueue_script('font-awesome-kit', $kit_url, [], null);
//                 }
//             );
//         }
//     }
// }

// fa_custom_setup_kit('https://kit.fontawesome.com/508a5d6fe1.js');
