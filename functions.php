<?php

/**
 * Additional code for the child theme goes in here.
 */


function enqueue_child_styles() {
    $css_creation = filectime(get_stylesheet_directory() . '/style.css');
    wp_enqueue_style('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css', array(), '4.4.1');
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', ['bootstrap','parent-style'], $css_creation);

}

add_action('wp_enqueue_scripts', 'enqueue_child_styles', 1);

function enqueue_child_scripts()  {
    wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js', [], '3.5.0', true);
    wp_enqueue_script('jquery');
    wp_register_script('popper', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"', [], '1.16.0', true);
    wp_enqueue_script('popper');
    wp_register_script('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js', [ 'jquery', 'popper' ], '4.4.1', true);
    wp_enqueue_script('bootstrap');
    wp_register_script('child-js', get_stylesheet_directory_uri() . '/assets/build/index.js', ['jquery'], '0.2', true);
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
