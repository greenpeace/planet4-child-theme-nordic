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
			'core/buttons', // TODO: Styling.
			'core/columns',
			'core/file',
			'core/group',
			'core/html',
			'core/heading',
			'core/image',
			// 'core/gallery', // functionality replaced by P4 galleries.
			'core/quote',
			'core/query-pagination', // TODO: Styling or removal.
			// 'core/audio', // removed, not needed.
			// 'core/cover', // removed, not needed.
			// 'core/video', // TODO: Decision. Ideally only allow embedded video.
			// 'core/preformatted', // removed, not needed.
			// 'core/code', // functionality not needed and not styled.
			// 'core/pullquote', // removed, normal quote element is available.
			// 'core/verse', // removed, not needed, not styled.
			'core/media-text', // the new media block.
			// 'core/more', // removed, not needed.
			// 'core/nextpage', // removed, not needed.
			'core/separator', // TODO: Styling.
			'core/spacer',
			'core/shortcode',
			// 'core/archives', // removed, not needed.
			// 'core/categories', // removed, not needed.
			// 'core/latest-comments', // removed, not needed.
			// 'core/latest-posts', // removed, functionality replaced by P4 article list.
			'core/paragraph',
			'core/table', // TODO: Styling.


			'core/embed',
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
			// 'core-embed/tumblr', // removed, not needed.
			'core-embed/videopress',
			// 'core-embed/wordpress-tv', // removed, not needed.
			// 'acf/p4-gpn-block-testimonial',
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
				// 'planet4-blocks/social-media-cards',
				'planet4-blocks/split-two-columns',
				'planet4-blocks/spreadsheet',
				'planet4-blocks/submenu',
				'planet4-blocks/timeline',
				// 'planet4-blocks/enform',
				'planet4-blocks/guestbook',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
			);
			$allowed_blocks      = array_merge( $allowed_blocks_general, $allowed_blocks_page );
		} else if ( $post->post_type === 'post' ) { // block types only for posts
			$allowed_blocks_post = array(
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
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
			);
			$allowed_blocks      = array_merge( $allowed_blocks_general, $allowed_blocks_post );
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
				'planet4-blocks/guestbook',
				'planet4-blocks/happypoint',
				'planet4-blocks/media-video',
				'planet4-blocks/social-media',
				// 'planet4-blocks/social-media-cards',
				'planet4-blocks/spreadsheet',
				'planet4-blocks/sub-pages',
				'planet4-blocks/timeline',
				// 'planet4-blocks/enform',
				'acf/leads-form',
			);
		}

		return $allowed_blocks;
	}
}
