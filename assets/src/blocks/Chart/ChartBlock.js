const BLOCK_NAME = 'planet4-blocks/chart';

const attributes = {
    chart_title: {
      type: 'string',
      default: 'Chart',
    },
    description: {
      type: 'string',
      default: '',
    },
  };

export const registerChartBlock = () => {
  const {registerBlockType} = wp.blocks;
  const {RawHTML} = wp.element;
  const {__} = wp.i18n;

  registerBlockType(BLOCK_NAME, {
    title: 'Chart',
    description: __('Visualize data from a spreadsheet using one of several chart types.', 'planet4-blocks-backend'),
    icon: 'chartBar',
    category: 'planet4-blocks',
    supports: {
      html: false, // Disable "Edit as HTMl" block option.
    },
    attributes,
    edit: ChartEditor,
    save: props => {
      const markup = renderToString(
        <div
          data-hydrate={BLOCK_NAME}
          data-attributes={JSON.stringify(props.attributes)}
        >
          <ChartFrontend {...props} />
        </div>
      );
      return <RawHTML>{markup}</RawHTML>;
    },
    deprecated: [
      {
        attributes,
        save: frontendRendered(BLOCK_NAME),
      },
      {
        attributes,
        save() {
          return null;
        },
      },
    ],
  });
}