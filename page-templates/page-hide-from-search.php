<?php
/*
Template Name: Hide page from search results (GPN)
*
* @package WordPress
* @subpackage Planet4 GP Nordic Child Theme
* @since Planet4 GP Nordic Child Theme 0.9
*Template Post Type: post, page
*
*/

// Example:
// www.greenepace.org/country/something/page-hide-from-serach.php

//get the id of the current page
$page_id = get_the_ID();
//update the current page template meta to not show in the page list in the search results
update_post_meta( $page_id, 'p4_do_not_index', true );
// delete_post_meta ( $page_id, 'robots', 'max-snippet:-1, max-image-preview:large, max-video-preview:-1' );
//add a meta tag name=robots noindex, no follow
// $meta_key = 'robots';
// $meta_value = 'noindex, noarchive, nositelinkssearchbox, noimageindex, nofollow, nosnippet';
// add_post_meta( $page_id, $meta_key, $meta_value, true );

//update the meta tag with the name of the template in use for the current page
// update_post_meta( $page_id, '_wp_page_template', 'page-hide-from-search.php' );

//hide the page from search results
// echo '<script type="text/JavaScript"> document.addEventListener(\'DOMContentLoaded\', function() { document.querySelector(\'meta[name=\"robots\"]\').content.remove();document.querySelector(\'head\').appendChild(document.createElement(\'meta\')).setAttribute(\'name\', \'robots\').setAttribute(\'content\', \'noindex, noarchive, nositelinkssearchbox, noimageindex, nofollow, nosnippet\');	}); </script>';
// echo '<meta name="robots" content="noindex, noarchive, nositelinkssearchbox, noimageindex, nofollow, nosnippet" />';
// add the meta value with name= robots and value= noindex, nofollow, noarchive
// add_post_meta( $page_id, 'robots', 'noindex, noarchive, nositelinkssearchbox, noimageindex, nofollow, nosnippet' );
// exit;
?>
