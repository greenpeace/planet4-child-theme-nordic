<?php
/**
 * Gets the list of allowed block types to use in the block editor.
 *
 * @since 5.8.0
 *
 * @param WP_Block_context $block_context The current block editor context.
 *
 * @return bool|string[] Array of block type slugs, or boolean to enable/disable all.
 *
 */

 namespace P4GBKS\Patterns;
 use P4GBKS\Search\Pattern\PatternData;

if ( ! function_exists( 'p4_child_theme_gpn_allowed_list' ) ) {
	/**
	 * Whitelists Gutenberg Blocks
	 *
	 * @param $blocks
	 * @param $post
	 *
	 * @return array
	 */

	function p4_child_theme_gpn_allowed_list( $allowed_block_types, $block_editor_context ) {

		$allowed_blocks_general = [
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
			'core/cover', //extra
			'core/embed',
			'core/media-text',
			'core/post-content', //extra
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
		];

		//includes all custom p4 patterns @see https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/tree/main/classes/patterns
		$p4_custom_pattern_blocks = [
			'planet4-block-templates/deep-dive',
			'planet4-block-templates/highlighted-cta',
			'planet4-block-templates/quick-links',
			'planet4-block-templates/reality-check',
			'planet4-block-templates/issues',
			'planet4-block-templates/page-header',
			'planet4-block-templates/side-image-with-text-and-cta',
		];

		if ( $block_editor_context->post->post_type === 'page' ) {

			$allowed_blocks_page = [
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
				'planet4-blocks/spreadsheet',
				'planet4-blocks/submenu',
				'planet4-blocks/timeline',
				'planet4-blocks/guestbook',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
				'planet4-blocks/social-media-cards',//beta block included
				'planet4-blocks/share-buttons',//beta block included
				'gravityforms/form', // TODO: Leads gen connect to our DB; Gravity Forms block quiz, Email to target, etc.
			];

			//Custom P4 Layouts
			//@see https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/tree/main/classes/patterns
			$allowed_p4_templates = [
				'planet4-block-templates/deep-dive',
				'planet4-block-templates/highlighted-cta',
				'planet4-block-templates/quick-links',
				'planet4-block-templates/reality-check',
				'planet4-block-templates/issues',
				'planet4-block-templates/page-header',
				'planet4-block-templates/side-image-with-text-and-cta',
			
				// layouts.
				'planet4-block-templates/deep-dive-topic',
				'planet4-block-templates/homepage',
				'planet4-block-templates/campaign',
				'planet4-block-templates/take-action',
				'planet4-block-templates/action',
				'planet4-block-templates/get-informed',
				'planet4-block-templates/high-level-topic',
			];

			error_log('Allowed Page Layouts: ' . print_r($allowed_p4_templates, true));
			return array_merge( $allowed_blocks_general, $allowed_blocks_page, $p4_custom_pattern_blocks, $allowed_p4_templates );
		}

		if ( $block_editor_context->post->post_type === 'post' ) {

			$allowed_blocks_post = [
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
				'acf/leads-form', //TODO: fix issues on posts
				//'gravityforms/form', // TODO: Leads gen connect to our DB; Gravity Forms block quiz, Email to target, etc.
			];
			return array_merge( $allowed_blocks_general, $allowed_blocks_post );
		}

		//removed "campaign" logic as it will be decomissioned soon
		
		if ( $block_editor_context->post->post_type === 'action' ) {

			$allowed_blocks_action = [
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
				'planet4-blocks/spreadsheet',
				'planet4-blocks/submenu',
				'planet4-blocks/timeline',
				'planet4-blocks/guestbook',
				'gravityforms/form',
				'planet4-blocks/sub-pages',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form',
				'gravityforms/form', // TODO: Leads gen connect to our DB; Gravity Forms block quiz, Email to target, etc.
				'planet4-blocks/social-media-cards',//beta block included
				'planet4-blocks/share-buttons',//beta block included
			];

			$allowed_p4_layouts_action = [
				'p4/campaign-pattern-layout',
			];

			error_log('Allowed Action Layouts: ' . print_r($allowed_p4_layouts_action, true));
			return array_merge( $allowed_blocks_general, $allowed_blocks_action, $p4_custom_pattern_blocks, $allowed_p4_layouts_action);
		}

		return $allowed_block_types;
	}

	add_filter( 'allowed_block_types_all', 'P4GBKS\Patterns\p4_child_theme_gpn_allowed_list', 10, 2 );
}

