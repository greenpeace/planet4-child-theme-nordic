<?php
/**
* Theme Name: Greenpeace Planet 4 Child Theme Nordic
* Theme URI: Theme URI: https://github.com/greenpeace/planet4-child-theme-nordic
* Description: Child theme for the Planet 4 Wordpress project
* Author: Greenpeace Nordic
* Author URI: https://github.com/greenpeace
* License: MIT
* License URI: https://opensource.org/licenses/MIT
* Tags: light, accessibility-ready
* Text Domain: planet4-child-theme-nordic
* Version: 0.0.7
*/

 // Filter available Gutenberg standard blocks
 require_once( 'includes/gutenberg-blocks.php' );

//  function p4_child_theme_gpn_gutenberg_scripts() {
// 	 wp_enqueue_script(
// 		 'gpn-customizations',
// 		 get_stylesheet_directory_uri() . '/assets/src/js/admin/editor.js',
// 		//  p4gbks_admin_script is the JS that is loaded in planet4-plugin-gutenberg-block:
// 		//  https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/4ae684660c83361f6d5f9d96744362ea7422cc4f/classes/class-loader.php#L296-L302
// 		//  By putting it in the dependency list, we ensure our code gets loaded later so we can overwrite some of it.
// 		 array( 'wp-blocks', 'wp-dom', 'p4gbks_admin_script' ),
// 		 filemtime( get_stylesheet_directory() . '/assets/src/js/admin/editor.js'),
// 		 true
// 	 );

// 	//  $user  = wp_get_current_user();
// 	//  $roles = ( array ) $user->roles;

// 	//  $script_params = array(
// 	// 	 'roles'     => $roles,
// 	// 	 'post_type' => get_post_type(),
// 	//  );

// 	//  wp_localize_script( 'gpn-customizations', 'gpnUserData', $script_params );
//  }

//  add_action( 'enqueue_block_editor_assets', 'p4_child_theme_gpn_gutenberg_scripts' );


add_action('admin_init', 'remove_acf_options_page', 99);
function remove_acf_options_page() {
   remove_menu_page('acf-options');
}

add_action('wp_enqueue_scripts', 'enqueue_child_styles');
function enqueue_child_styles() {
    $css_creation = filectime(get_stylesheet_directory() . '/assets/build/style.min.css');
    // wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css', array(), '5.0.0');
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/assets/build/style.min.css', ['parent-style'], $css_creation);

}

function enqueue_child_scripts()  {
    wp_register_script('jquery', get_stylesheet_directory_uri() . '/node_modules/jquery', ['jquery'], '3.5.1', true);
    wp_enqueue_script('jquery');
    // wp_register_script('popper', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"', [], '1.16.0', true);
    // wp_enqueue_script('popper');
    // wp_register_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js', ['bootstrap'], '5.0.0', true);
    // wp_enqueue_script('bootstrap');
    wp_register_script('child-js', get_stylesheet_directory_uri() . '/assets/build/index.js', ['jquery'], '0.17', true);
    wp_enqueue_script('child-js');

}

add_action('wp_enqueue_scripts', 'enqueue_child_scripts');


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
