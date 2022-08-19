<?php


if ( ! function_exists( 'p4_child_theme_gpn_whitelist_blocks' ) ) {
	add_filter( 'allowed_block_types', 'p4_child_theme_gpn_whitelist_blocks', 10, 2 );

	/**
	 * Whitelists Gutenberg Blocks
	 *
	 * @param $allowed_blocks
	 * @param $post
	 *
	 * @return array
	 */
	function p4_child_theme_gpn_whitelist_blocks( $allowed_blocks, $post ) {
		$allowed_blocks_general = array(
			'core/block',
			'core/paragraph',
			'core/heading',
			'core/image',
			'core/list',
			'core/quote',
			'core/file',
			'core/html',
			'core/table',
			'core/buttons',
			'core/button',
			'core/separator',
			'core/spacer',
			'core/shortcode',
			'core/group',
			'core/columns',
			'core/column',
			'core/embed',
			'core/media-text',
			'core-embed/twitter',
			'core-embed/youtube',
			'core-embed/facebook',
			'core-embed/instagram',
			'core-embed/wordpress',
			'core-embed/soundcloud',
			'core-embed/spotify',
			'core-embed/flickr',
			'core-embed/vimeo',
			'core-embed/dailymotion',
			'core-embed/funnyordie',
			'core-embed/imgur',
			'core-embed/issuu',
			'core-embed/kickstarter',
			'core-embed/meetup-com',
			'core-embed/mixcloud',
			'core-embed/photobucket',
			'core-embed/polldaddy',
			'core-embed/reddit',
			'core-embed/scribd',
			'core-embed/slideshare',
			'core-embed/speaker',
			'core-embed/ted',
			'core-embed/videopress',
		);

		if ( $post->post_type === 'page' ) { // Block types only for pages
			$allowed_blocks_page = array(
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
				'planet4-blocks/accordion',
				'planet4-blocks/articles',
				'planet4-blocks/carousel-header',
				'planet4-blocks/columns',
				'planet4-blocks/cookies',
				'planet4-blocks/counter',
				'planet4-blocks/covers',
				'planet4-blocks/gallery',
				'planet4-blocks/happypoint',
				'planet4-blocks/media-video',
				'planet4-blocks/social-media',
				'planet4-blocks/split-two-columns',
				'planet4-blocks/spreadsheet',
				'planet4-blocks/submenu',
				'planet4-blocks/timeline',
				'planet4-blocks/enform',
				'planet4-blocks/guestbook',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
				'planet4-blocks/share-buttons', //beta block included
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			$allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_page );
		} else if ( $post->post_type === 'post' ) { // block types only for posts
			$allowed_blocks_post = array(
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
				'planet4-blocks/accordion',
				'planet4-blocks/articles',
				'planet4-blocks/counter',
				'planet4-blocks/gallery',
				'planet4-blocks/social-media',
				'planet4-blocks/spreadsheet',
				'planet4-blocks/take-action-boxout',
				'planet4-blocks/timeline',
				// 'acf/p4-gpn-block-testimonial',
				// 'acf/leads-form', //TODO: fix issues on posts
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			$allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_post );
		} else if ( $post->post_type === 'campaign' ) { // block types only for campaign pages
			$allowed_blocks_post = array(
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
				// We allow all blocks in these as this content is sometimes imported from other Planet4 sites
				'planet4-blocks/accordion',
				'planet4-blocks/articles',
				'planet4-blocks/carousel-header',
				'planet4-blocks/columns',
				'planet4-blocks/cookies',
				'planet4-blocks/counter',
				'planet4-blocks/covers',
				'planet4-blocks/gallery',
				'planet4-blocks/happypoint',
				'planet4-blocks/media-video',
				'planet4-blocks/social-media',
				'planet4-blocks/spreadsheet',
				'planet4-blocks/sub-pages',
				'planet4-blocks/timeline',
				'planet4-blocks/enform',
				'planet4-blocks/guestbook',
				'planet4-blocks/social-media-cards', //beta block included
				'planet4-blocks/share-buttons', //beta block included
				'acf/leads-form',
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			// $allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_campaign );

		} else if ( $post->post_type === 'action' ) { // block types only for action type pages
			// Blocks from planet4-plugin-gutenberg-blocks
			// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
			// We allow all blocks in these as this content is sometimes imported from other Planet4 sites
			$allowed_blocks_post = array(
				'planet4-blocks/accordion',
				'planet4-blocks/articles',
				'planet4-blocks/carousel-header',
				'planet4-blocks/columns',
				'planet4-blocks/cookies',
				'planet4-blocks/counter',
				'planet4-blocks/covers',
				'planet4-blocks/gallery',
				'planet4-blocks/happypoint',
				'planet4-blocks/media-video',
				'planet4-blocks/social-media',
				'planet4-blocks/split-two-columns',
				'planet4-blocks/spreadsheet',
				'planet4-blocks/submenu',
				'planet4-blocks/timeline',
				'planet4-blocks/enform',
				'planet4-blocks/guestbook',
				'leadin/hubspot-form-block',
				'gravityforms/form',
				'planet4-blocks/sub-pages',
				'planet4-blocks/action-page-dummy',
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			// $allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_action );

		}

		return $allowed_blocks;
	}
}

if ( ! function_exists( 'p4_child_theme_gpn_whitelist_block_patterns' ) ) {
	add_filter( 'register_block_pattern_category', 'p4_child_theme_gpn_whitelist_block_patterns', 10, 2 );

	function p4_child_theme_gpn_whitelist_block_patterns( $register_block_pattern_category ) {
		$register_block_pattern_category = array(
			'planet4-blocks-backend/planet4',
			'planet4-blocks-backend/planet4-headers',
			'planet4-blocks-backend/layouts',
		);

		return $register_block_pattern_category;

	}

}
