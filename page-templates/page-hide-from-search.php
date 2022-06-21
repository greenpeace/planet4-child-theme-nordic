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
// www.greenepace.org/country/something/page-hide-from-serach.php

use P4\MasterTheme\Context;
use P4\MasterTheme\Post;
use Timber\Timber;

$context        = Timber::get_context();
$post           = new Post(); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
// $page_meta_data = get_post_meta( $post->ID );
//get the content of the current page
$context['post'] = $post;
// $context['page_category']       = 'Hidden Page';

//update the current page template meta to not show in the page list in the search results
$page_meta_data = update_post_meta( $post->ID, 'p4_do_not_index', true );

Context::set_header( $context, $page_meta_data, $post->title );
	Timber::render( 'page.twig', $context );

?>


