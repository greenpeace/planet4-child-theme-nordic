//add missing H1 title when the page header is hidden
document.addEventListener("DOMContentLoaded", function () {
    const noPageTitleContainer = document.querySelector('div.page-content.container.no-page-title');
    const isHomeNoPageTitleContainer = document.querySelector('.home > div.page-content.container.no-page-title');
    const pageHeaderContainer = document.querySelector('.page-template-default.page > div.page-header.page-header-hidden > div.container');
    const pageTitle = document.querySelector('title').textContent;
    const strippedTitle = outputStrippedTitle(); // Get the stripped title

    // Check if there is no <h1> element on the page
    const h1Elements = document.querySelectorAll('h1');
    const isNoPageTitle = noPageTitleContainer !== null;
    const noH1OnPage = h1Elements.length === 0;

    if (isNoPageTitle && noH1OnPage && pageHeaderContainer) {
        // Check if the page header container is present and empty
        if (pageHeaderContainer && pageHeaderContainer.innerHTML.trim() === '') {
            insertTitle(strippedTitle); // Insert the title
        }
    }

    if (isNoPageTitle && noH1OnPage && isHomeNoPageTitleContainer) {
        const newElement = document.createElement('h1');
        newElement.classList.add('hidden-title');
        newElement.textContent = strippedTitle;
        isHomeNoPageTitleContainer.prepend(newElement);
    }

    function outputStrippedTitle() {
        return pageTitle.split(' - ')[0].trim(); // Return the stripped title
    }

    // Function to insert the stripped title into the specified element
    function insertTitle(title) {
        const titleElement = document.createElement('h1');
        titleElement.textContent = title;
        titleElement.classList.add('hidden-title');
        pageHeaderContainer.appendChild(titleElement);
    }

    //Function to update the hidden title
    function updateHiddenTitle() {
        const hiddenTitleElement = pageHeaderContainer.querySelector('.hidden-title');
        if (hiddenTitleElement) {
            hiddenTitleElement.textContent = strippedTitle;
        }
    }

    const titleObserver = new MutationObserver(updateHiddenTitle);
    const titleElement = document.querySelector('title');
    titleObserver.observe(titleElement, { childList: true, subtree: true });
});