<?php

/**
 * Share on 3 flip cards pattern.
 *
 * @package Planet4ChildThemeNordic
 */

return [
    'title'       => __('3 Flip Image Cards', 'planet4-child-theme-nordic'),
    'description' => __('Three flip cards with image front and content back.', 'planet4-child-theme-nordic'),
    'categories'  => ['planet4-nordic'],
    'content'     => '
    <!-- wp:group {"metadata":{"name":"3 flip image cards","categories":["planet4"],"patternName":"p4/flip-cards"},"layout":{"type":"default"}} -->
    <div class="wp-block-group"><!-- wp:heading -->
    <h2 class="wp-block-heading">Add your block heading here</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"className":"pb-3"} -->
    <p class="pb-3">Add your description text here</p>
    <!-- /wp:paragraph -->

    <!-- wp:columns {"className":"flip-card-grid"} -->
    <div class="wp-block-columns flip-card-grid"><!-- wp:column -->
    <div class="wp-block-column"><!-- wp:group {"metadata":{"name":"Flip card"},"className":"flip-card","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card"><!-- wp:group {"metadata":{"name":"Flip card inner"},"className":"flip-card-inner","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-inner"><!-- wp:group {"metadata":{"name":"Flip card front"},"className":"flip-card-front","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-front"><!-- wp:heading {"level":3,"className":"card-title"} -->
    <h3 class="wp-block-heading card-title">Add the heading displayed on the front of the image</h3>
    <!-- /wp:heading -->

    <!-- wp:image {"id":348,"aspectRatio":"3/4","scale":"cover","sizeSlug":"full","linkDestination":"none"} -->
    <figure class="wp-block-image size-full"><img src="http://www.planet4.test/wp-content/uploads/2018/10/b4dea0a8-nature-gp0stoe2u.jpg" alt="" class="wp-image-348" style="aspect-ratio:3/4;object-fit:cover"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:group -->

    <!-- wp:group {"metadata":{"name":"Flip card back"},"className":"flip-card-back","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-back"><!-- wp:heading {"level":4} -->
    <h4 class="wp-block-heading">Add here the heading displayed on the back of the image</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>Add here the text displayed on the back of the image. Here is some text with a <a href="http://www.greenpeace.org" data-type="page" data-id="1577">link</a>.</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column"><!-- wp:group {"metadata":{"name":"Flip card"},"className":"flip-card","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card"><!-- wp:group {"metadata":{"name":"Flip card inner"},"className":"flip-card-inner","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-inner"><!-- wp:group {"metadata":{"name":"Flip card front"},"className":"flip-card-front","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-front"><!-- wp:heading {"level":3,"className":"card-title"} -->
    <h3 class="wp-block-heading card-title">Add the heading displayed on the front of the image</h3>
    <!-- /wp:heading -->

    <!-- wp:image {"id":354,"aspectRatio":"3/4","scale":"cover","sizeSlug":"large","linkDestination":"none"} -->
    <figure class="wp-block-image size-large"><img src="https://www.greenpeace.org/static/planet4-defaultcontent-stateless-develop/2018/10/6aa365fe-oceans-gp0stom6c-1024x683.jpg" alt="" class="wp-image-354" style="aspect-ratio:3/4;object-fit:cover"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:group -->

    <!-- wp:group {"metadata":{"name":"Flip card back"},"className":"flip-card-back","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-back"><!-- wp:heading {"level":4} -->
    <h4 class="wp-block-heading">Add here the heading displayed on the back of the image</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>Add here the text displayed on the back of the image. Here is some text with a <a href="http://www.greenpeace.org" data-type="page" data-id="1577">link</a>.</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column -->

    <!-- wp:column -->
    <div class="wp-block-column"><!-- wp:group {"metadata":{"name":"Flip card"},"className":"flip-card","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card"><!-- wp:group {"metadata":{"name":"Flip card inner"},"className":"flip-card-inner","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-inner"><!-- wp:group {"metadata":{"name":"Flip card front"},"className":"flip-card-front","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-front"><!-- wp:heading {"level":3,"className":"card-title"} -->
    <h3 class="wp-block-heading card-title">Add the heading displayed on the front of the image</h3>
    <!-- /wp:heading -->

    <!-- wp:image {"id":295,"aspectRatio":"3/4","scale":"cover","sizeSlug":"large","linkDestination":"none"} -->
    <figure class="wp-block-image size-large"><img src="https://www.greenpeace.org/static/planet4-defaultcontent-stateless-develop/2018/05/fc54c126-gp0stqmp3-1024x683.jpg" alt="Lynx Kitten in Canadian Boreal Forest" class="wp-image-295" style="aspect-ratio:3/4;object-fit:cover"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:group -->

    <!-- wp:group {"metadata":{"name":"Flip card back"},"className":"flip-card-back","layout":{"type":"constrained"}} -->
    <div class="wp-block-group flip-card-back"><!-- wp:heading {"level":4} -->
    <h4 class="wp-block-heading">Add here the heading displayed on the back of the image</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>Add here the text displayed on the back of the image. Here is some text with a <a href="http://www.greenpeace.org" data-type="page" data-id="1577">link</a>.</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:group -->
    ',
];
