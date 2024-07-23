<?php
/**
 * Gets the list of allowed block types to use in the block editor.
 *
 * @since 6.5.3
 *
 * @param WP_Block_context $block_context The current block editor context.
 *
 * @return bool|string[] Array of block type slugs, or boolean to enable/disable all.
 *
 */

/**
 * Base pattern class.
 *
 * @package P4GBKS legacy blocks setup
 * @package P4\MasterTheme migration location
 */

 namespace P4\MasterTheme;
 use P4\MasterTheme\Patterns;
 use P4\MasterTheme\Blocks;

if ( ! function_exists( 'p4_child_theme_gpn_allowed_list' ) ) {
	/**
	 * Whitelists P4 Blocks
	 *
	 * @param $blocks
	 * @param $post
	 *
	 * @return array
	 */

	function p4_child_theme_gpn_allowed_list( $allowed_block_types, $block_editor_context ) {

		$allowed_blocks_core = [
			//@see https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
			'core/block', //Reuse this design across your site
			'core/button', //Prompt visitors to take action with a button-style link
			'core/buttons', //Prompt visitors to take action with a group of button-style links
			'core/column', //A single column within a columns block
			'core/columns', //Display content in multiple columns, with blocks added to each column
			'core/cover', //Add an image or video with a text overlay
			'core/details', //Hide and show additional content
			'core/embed', //Add a block that displays content pulled from other sites, like Twitter or YouTube
			'core/file', //Add a link to a downloadable file
			'core/group', //Gather blocks in a layout container
			'core/heading', 
			'core/html', //Add custom HTML code and preview it as you edit
			'core/image',
			'core/list', //Create a bulleted or numbered list
			'core/list-item', //Create a list item
			'core/media-text', //Set media and words side-by-side for a richer layout
			'core/paragraph', 
			'core/pattern', //Show a block pattern
			'core/quote', //Give quoted text visual emphasis
			'core/separator', //Create a break between ideas or sections with a horizontal separator
			'core/shortcode', //Insert additional custom elements with a WordPress shortcode
			'core/spacer', //Add white space between blocks and customize its height.
			'core/table', //Create structured content in rows and columns to display information
		];

		$p4_custom_blocks = [
			//Blocks from planet4-master-theme
			//@see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Loader.php#L194
			'planet4-blocks/accordion', //mt
			'planet4-blocks/articles',
			'planet4-blocks/carousel-header', //mt
			'planet4-blocks/columns', //mt
			// 'planet4-blocks/cookies', // disabled as not used
			'planet4-blocks/counter', //mt
			'planet4-blocks/covers',
			'planet4-blocks/gallery', //mt
			'planet4-blocks/guestbook', //mt 50yrs
			// 'planet4-blocks/happypoint', // disabled as not used
			// 'planet4-blocks/media-video', // disabled as we don't upload videos
			// 'planet4-blocks/social-media', //mt disabled, not needed
			'planet4-blocks/spreadsheet', //mt
			'planet4-blocks/submenu', //mt
			'planet4-blocks/timeline', //mt
			'gravityforms/form', // TODO: Connect to our DB; Contact form, ETT, etc.
			'acf/leads-form',
			// 'acf/p4-gpn-block-testimonial',

		];

		// Includes all custom p4 patterns
		// @see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Patterns/BlockPattern.php#L41
		$p4_custom_patterns = [
			'planet4-block-templates/deep-dive', //mt
			'planet4-block-templates/highlighted-cta', //mt
			'planet4-block-templates/quick-links', //mt
			'planet4-block-templates/reality-check', //mt
			'planet4-block-templates/issues', //mt
			'planet4-block-templates/page-header', //mt
			'planet4-block-templates/page-header-img-left', //mt
			'planet4-block-templates/side-image-with-text-and-cta', //mt
		];

		// Includes all custom p4 layouts
		//@see https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/main/planet4-gutenberg-blocks.php#L204
		$p4_custom_pattern_layouts = [
			'planet4-block-templates/blank-page', //mt
			'planet4-block-templates/action', //gb
			'planet4-block-templates/campaign', //gb
			'planet4-block-templates/deep-dive-topic', //gb
			'planet4-block-templates/high-level-topic', //gb
			'planet4-block-templates/get-informed', //gb
			'planet4-block-templates/take-action', //mt
			'planet4-block-templates/homepage', //gb
		];

		if ( $block_editor_context->post->post_type === 'page' ) {

			//All custom P4 blocks are allowed
			//@see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Loader.php#L194

			//All custom P4 patterns and layouts whitelisted
			//@see https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/main/planet4-gutenberg-blocks.php#L204

			error_log('Allowed Page Layouts: ' . print_r($p4_custom_pattern_layouts, true));
			return array_merge( $allowed_blocks_core, $p4_custom_blocks, $p4_custom_patterns, $p4_custom_pattern_layouts );
		}

		if ( $block_editor_context->post->post_type === 'post' ) {

			$allowed_blocks_post = [
				// Blocks from planet4-plugin-gutenberg-blocks
				// @see: https://github.com/greenpeace/planet4-plugin-gutenberg-blocks/blob/master/planet4-gutenberg-blocks.php
				'planet4-blocks/accordion',
				'planet4-blocks/articles',
				// 'planet4-blocks/counter', //disabled as not used
				'planet4-blocks/gallery',
				'planet4-blocks/spreadsheet',
				// 'planet4-blocks/submenu', //mt //TODO: fix frontend rendering
				'planet4-blocks/take-action-boxout', //incl only on posts
				'planet4-blocks/timeline',
				// 'acf/p4-gpn-block-testimonial',
				'acf/leads-form', //TODO: fix issues on posts
				//'gravityforms/form', // TODO: Leads gen connect to our DB; Gravity Forms block quiz, Email to target, etc.
			];
			return array_merge( $allowed_blocks_core, $allowed_blocks_post );
		}

		//removed "campaign" logic as it will be decomossioned soon and it is not used
		
		if ( $block_editor_context->post->post_type === 'p4_action' ) {

			//All custom P4 blocks are allowed
			//@see https://github.com/greenpeace/planet4-master-theme/blob/main/src/Loader.php#L194

			$allowed_p4_layouts_action = [
				'planet4-block-templates/blank-page',
				'planet4-block-templates/action', //gb
				'planet4-block-templates/campaign', //gb
				];

			error_log('Allowed Action Layouts: ' . print_r($allowed_p4_layouts_action, true));
			return array_merge( $allowed_blocks_core, $p4_custom_blocks, $p4_custom_patterns, $allowed_p4_layouts_action);
		}

		return $allowed_block_types;
	}

	add_filter( 'allowed_block_types_all', 'P4\MasterTheme\p4_child_theme_gpn_allowed_list', 10, 2 );
}

