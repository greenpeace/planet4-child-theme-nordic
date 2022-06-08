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
			'core/button',
			'core/buttons',
			'core/column',
			'core/columns',
			'core/embed',
			'core/file',
			'core/group',
			'core/heading',
			'core/html',
			'core/image',
			'core/list',
			'core/media-text',
			'core/paragraph',
			'core/quote',
			'core/separator',
			'core/spacer',
			'core/shortcode',
			'core/table',
			'core-embed/twitter',
			'core-embed/youtube',
			'core-embed/facebook',
			'core-embed/instagram',
			'core-embed/wordpress',
			'core-embed/soundcloud',
			'core-embed/spotify',
			'core-embed/flickr',
			'core-embed/vimeo',
			// 'core-embed/animoto', // removed, not needed.
			// 'core-embed/cloudup', // removed, not needed.
			// 'core-embed/collegehumor', // removed, not needed.
			'core-embed/dailymotion',
			// 'core-embed/funnyordie',
			// 'core-embed/hulu', // removed, not needed.
			'core-embed/imgur',
			'core-embed/issuu',
			'core-embed/kickstarter',
			'core-embed/meetup-com',
			'core-embed/mixcloud',
			'core-embed/photobucket',
			'core-embed/polldaddy',
			'core-embed/reddit',
			// 'core-embed/reverbnation', // removed, not needed.
			// 'core-embed/screencast', // removed, not needed.
			'core-embed/scribd',
			'core-embed/slideshare',
			// 'core-embed/smugmug', // removed, not needed.
			'core-embed/speaker',
			'core-embed/ted',
			'core-embed/tumblr',
			'core-embed/videopress',
			// 'core-embed/wordpress-tv', // removed, not needed.
			// 'acf/p4-gpn-block-testimonial',
		);

		if ( $post->post_type === 'page' ) { // Block types only for pages
			$allowed_blocks_page = array(
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/ia/pattern-report/planet4-gutenberg-blocks.php
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
				// 'planet4-blocks/social-media-cards',
				'planet4-blocks/split-two-columns',
				'planet4-blocks/spreadsheet',
				'planet4-blocks/submenu',
				'planet4-blocks/timeline',
				// 'planet4-blocks/enform',
				'planet4-blocks/guestbook',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			$allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_page );
		} else if ( $post->post_type === 'post' ) { // block types only for posts
			$allowed_blocks_post = array(
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/ia/pattern-report/planet4-gutenberg-blocks.php
				'planet4-blocks/accordion',
				'planet4-blocks/articles',
				'planet4-blocks/counter',
				'planet4-blocks/gallery',
				'planet4-blocks/guestbook',
				'planet4-blocks/social-media',
				// 'planet4-blocks/social-media-cards',
				'planet4-blocks/spreadsheet',
				// 'planet4-blocks/submenu',
				'planet4-blocks/take-action-boxout',
				'planet4-blocks/timeline',
				// 'acf/p4-gpn-block-testimonial',
				// 'acf/leads-form',
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			$allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_post );
		} else if ( $post->post_type === 'campaign' ) { // block types only for campaign pages
			$allowed_blocks_post = array(
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/ia/pattern-report/planet4-gutenberg-blocks.php
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
				// 'planet4-blocks/enform',
				'planet4-blocks/guestbook',
				// 'leadin/hubspot-form-block',
				'acf/leads-form',
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			$allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_campaign );

		} else if ( $post->post_type === 'action' ) { // block types only for action type pages
			// Blocks from planet4-plugin-gutenberg-blocks
			// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
			// We allow all blocks in these as this content is sometimes imported from other Planet4 sites
			$allowed_blocks_action = array(
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
				// 'planet4-blocks/enform',
				'planet4-blocks/guestbook',
				// 'leadin/hubspot-form-block',
				//'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
				'planet4-blocks/sub-pages',
			);
			$allowed_blocks = array_merge( $allowed_blocks_general, $allowed_blocks_action );

		}

		return $allowed_blocks;
	}
}
