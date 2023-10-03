(function ($) {
  if (window.acf) {
    const arrayAddRows = [jQuery('a[data-event="add-row"]')];
    const arrayRemoveRows = [jQuery('a[data-event="remove-row"]')];

    arrayAddRows.forEach(arrayAddRow => {
      arrayAddRow.removeAttr('href');
    });

    arrayRemoveRows.forEach(arrayRemoveRow => {
      arrayRemoveRow.removeAttr('href');
    });

  } else {
    console.warn('ACF is not loaded');
  }
})(jQuery);
