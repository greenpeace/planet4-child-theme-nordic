
document.addEventListener("DOMContentLoaded", function () {
    //fix the missing H1 if the page carouselHeadingH1 is hodden and carousel is the first block
    const carouselHeader = document.querySelector('div.page-content.container.no-page-title > div.wp-block-planet4-blocks-carousel-header > div[data-hydrate="planet4-blocks/carousel-header"]');
    if (carouselHeader) {
        const captionWrapper = carouselHeader.querySelector('div.carousel-captions-wrapper');
        const heading = captionWrapper.querySelector('h2');
        if (heading) {
            heading.outerHTML = '<h1>' + heading.innerHTML + '</h1>';
        }
    }

    //fix for no page header on petition pages
    const container = document.querySelector('div.page-content.container.no-page-title');
    const firstChild = container ? container.firstElementChild : null;
    const secondChild = firstChild ? firstChild.nextElementSibling : null;
    
    function outputStrippedTitle() {
      const pageTitle = document.querySelector('title').textContent;
      const strippedTitle = pageTitle.split(' - ')[0];
      console.log('Stripped Page Title:', strippedTitle);
    }
    
    if (firstChild && firstChild.classList.contains('leads-form')) {
      outputStrippedTitle();
    } else if (secondChild && secondChild.classList.contains('leads-form')) {
      outputStrippedTitle();
    }
});