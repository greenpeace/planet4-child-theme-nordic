/* Addinng custom style to the core/quote block */
const { withColors } = wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;

wp.domReady(() => {
    wp.blocks.registerBlockStyle('core/quote', [
      {
        name: 'custom',
        label: 'Custom',
        isDefault: false,
        inlineStyle: {
          color: 'inherit',
          'font-size': 'inherit',
          'border-left': '4px solid inherit',
          padding: '0.2rem 0 0.2rem 1rem',
          position: 'relative',
        },
      },
    ]);
  });
  