<?php

/**
 * Additional code for the child theme goes in here.
 */

 // Filter available Gutenberg standard blocks
 require_once( 'includes/gutenberg-blocks.php' );

 function p4_child_theme_gpn_gutenberg_scripts() {
	 wp_enqueue_script(
		 'gpn-customizations',
		 get_stylesheet_directory_uri() . '/assets/src/js/admin/editor.js',
		 // p4gbks_admin_script is the JS that is loaded in planet4-plugin-gutenberg-block:
		 // https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/4ae684660c83361f6d5f9d96744362ea7422cc4f/classes/class-loader.php#L296-L302
		 // By putting it in the dependency list, we ensure our code gets loaded later so we can overwrite some of it.
		 array( 'wp-blocks', 'wp-dom', 'p4gbks_admin_script' ),
		 filemtime( get_stylesheet_directory() . '/assets/src/js/admin/editor.js' ),
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


function enqueue_child_styles() {
    $css_creation = filectime(get_stylesheet_directory() . '/assets/build/style.min.css');
    wp_enqueue_style('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css', array(), '4.4.1');
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/assets/build/style.min.css', ['bootstrap','parent-style'], $css_creation);

}

add_action('wp_enqueue_scripts', 'enqueue_child_styles', 1);

function enqueue_child_scripts()  {
    wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js', [], '3.5.0', true);
    wp_enqueue_script('jquery');
    wp_register_script('popper', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"', [], '1.16.0', true);
    wp_enqueue_script('popper');
    wp_register_script('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js', [ 'jquery', 'popper' ], '4.4.1', true);
    wp_enqueue_script('bootstrap');
    wp_register_script('child-js', get_stylesheet_directory_uri() . '/assets/build/index.js', ['jquery'], '0.7', true);
    wp_enqueue_script('child-js');

}

add_action('wp_enqueue_scripts', 'enqueue_child_scripts');

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
