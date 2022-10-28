<?php
/**
 * Gets the list of allowed block types to use in the block editor.
 *
 * @since 5.8.0
 *
 * @param WP_Block_Editor_Context $block_editor_context The current block editor context.
 *
 * @return bool|string[] Array of block type slugs, or boolean to enable/disable all.
 *
 */

if ( ! function_exists( 'p4_child_theme_gpn_whitelist_blocks' ) ) {
	//add_filter( 'allowed_block_types_all', 'p4_child_theme_gpn_whitelist_blocks', 10, 2 );

	add_filter( 'allowed_block_types_all', 'p4_child_theme_gpn_whitelist_blocks', 10, 2 );

	/**
	 * Whitelists Gutenberg Blocks
	 *
	 * @param $blocks
	 * @param $post
	 *
	 * @return array
	 */

	function p4_child_theme_gpn_whitelist_blocks( $allowed_block_types, $editor_context ) {
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
			'core/cover',
			'core/embed',
			'core/media-text',
			'core/post-content',
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

		if ( 'page' === $editor_context->post->post_type ) {

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
				'planet4-blocks/guestbook',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
				// 'planet4-blocks/share-buttons', //beta block included
				// 'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			return array_merge( $allowed_blocks_general, $allowed_blocks_page );
		}

		if ( 'post' === $editor_context->post->post_type ) {

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
				// 'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			return array_merge( $allowed_blocks_general, $allowed_blocks_post );
		}

		if ( 'campaign' === $editor_context->post->post_type ) {

			$allowed_blocks_campaign = array(
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
				'planet4-blocks/guestbook',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
				// 'planet4-blocks/share-buttons', //beta block included
				// 'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			return array_merge( $allowed_blocks_general, $allowed_blocks_campaign );
		}

		if ( 'action' === $editor_context->post->post_type ) {

			$allowed_blocks_action = array(
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
				'planet4-blocks/guestbook',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
				// 'planet4-blocks/share-buttons', //beta block included
				// 'gravityforms/form', // TODO: connect to our DB; Gravity Forms block quiz, Email to target, etc.
			);
			return array_merge( $allowed_blocks_general, $allowed_blocks_action );
		}
		return $blocks;
	}
	add_filter( 'allowed_block_types_all', 'p4_child_theme_gpn_whitelist_blocks', 10, 2 );
}

if ( ! function_exists( 'p4_child_theme_gpn_whitelist_block_patterns' ) ) {
	add_filter( 'register_block_pattern_category', 'p4_child_theme_gpn_whitelist_block_patterns', 10, 2 );

	function p4_child_theme_gpn_whitelist_block_patterns( $register_block_pattern_category, $post ) {
		$register_block_pattern_category_general = array(
			'planet4-blocks-backend/planet4',
			'planet4-blocks-backend/planet4-headers',
			'planet4-blocks-backend/layouts',
		);

		if ( $post->post_type === 'page' ) { // Block patterns only for pages
			$register_block_pattern_category_page = array(
				'p4/high-level-topic-pattern-layout',
				'p4/deep-dive-topic-pattern-layout',
				'p4/homepage-pattern-layout',
				'p4/get-informed-pattern-layout',

			);

			$register_block_pattern_category = array_merge( $register_block_pattern_category_general, $register_block_pattern_category_page );
		} else if ( $post->post_type === 'campaign' ) { // block patterns only for campaign pages
			$register_block_pattern_category = array(
				'p4/campaign-pattern-layout',
			);

		} else if ( $post->post_type === 'action' ) { // block patterns only for action type pages
			$register_block_pattern_category = array(
				'p4/action-pattern-layout',
			);

		}
		return $register_block_pattern_category;
	}
}
