<?php
/**
 * Chart block class.
 *
 * @package P4\MasterTheme
 * @since 0.1
 */

namespace P4\MasterTheme\Blocks;

// Manually require the BaseBlock class from the master theme
require_once get_template_directory() . '/src/Blocks/BaseBlock.php';

/**
 * Class Chart
 *
 * @package P4\MasterTheme\Blocks
 */

class Chart extends BaseBlock
{
    /**
     * Block name.
     *
     * @const string BLOCK_NAME.
     */
    public const BLOCK_NAME = 'chart';

    /**
     * Chart constructor.
     */
    public function __construct()
    {
        $this->register_chart_block();
    }

    /**
     * Register Chart block.
     */
    public function register_chart_block(): void {
        register_block_type(
            'planet4-blocks/chart',
            [
                'attributes' => [
                    'title' => [
                        'type' => 'string',
                        'default' => '',
                    ],
                    'description' => [
                        'type' => 'string',
                        'default' => '',
                    ],
                    'url' => [
                        'type' => 'string',
                        'default' => '',
                    ],
                ],
            ]
        );

        add_action('enqueue_block_editor_assets', [ self::class, 'enqueue_editor_assets' ]);
        add_action('wp_enqueue_scripts', [ self::class, 'enqueue_frontend_assets' ]);
    }

    /**
     * Required by the `BaseBlock` class.
     *
     * @param array $fields Unused, required by the abstract function.
     *
     * @return array Array.
     * @phpcs:disable SlevomatCodingStandard.Functions.UnusedParameter.UnusedParameter
     */
    public function prepare_data(array $fields): array
    {
        return [];
    }
}
