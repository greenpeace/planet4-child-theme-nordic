<?php
/*
Template Name: Hide page from search results (GPN)
*
* @package WordPress
* @subpackage Planet4 GP Nordic Child Theme
* @since Planet4 GP Nordic Child Theme 0.9
* Template Post Type: post, page
*
*/


// Example:
// www.greenpeace.org/country/something/page-hide-from-serach.php

use P4\MasterTheme\Post;
use P4\MasterTheme\Context;
use Timber\Timber;

if ( defined( 'ABSPATH' ) && function_exists( 'add_action' ) ) {
    $context = Timber::get_context();
    $post = new Post(); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
    $page_meta_data = get_post_meta($post->ID);
    $page_meta_data = array_map(fn ($v) => reset($v), $page_meta_data);
    
    //update the current page template meta to not show in the page list in the search results
    add_post_meta( $post->ID, 'p4_do_not_index', true );
    //get the content of the current page
    $context['post'] = $post;
    $context['page_category']       = 'Hide page from search';

    Context::set_header( $context, $page_meta_data, $post->title );
    Timber::render( 'page-hide-from-search.twig', $context );
}
?>


