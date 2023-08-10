document.addEventListener("DOMContentLoaded", function () {
    const pageHeaderContainer = document.querySelector('div.page-header.page-header-hidden > div.container');
    const pageTitle = document.querySelector('title').textContent;
    const strippedTitle = outputStrippedTitle(); // Get the stripped title


    function outputStrippedTitle() {
        return pageTitle.split(' - ')[0].trim(); // Return the stripped title
    }

    // Check if the page header container is present and empty
    if (pageHeaderContainer && pageHeaderContainer.innerHTML.trim() === '') {
        insertTitle(strippedTitle); // Insert the title
    }

    // Function to insert the stripped title into the specified element
    function insertTitle(title) {
        const titleElement = document.createElement('h1');
        titleElement.textContent = title;
        titleElement.classList.add('hidden-title');
        pageHeaderContainer.appendChild(titleElement);
    }

    //Function to update the hidden title
    function upddateHiddenTitle() {
        const hiddenTitleElement = pageHeaderContainer.querySelector('.hidden-title');
        if (hiddenTitleElement) {
            hiddenTitleElement.textContent = strippedTitle;
        }
    }

    const titleObserver = new MutationObserver(upddateHiddenTitle);
    const titleElement = document.querySelector('title');
    titleObserver.observe(titleElement, {childList: true, subtree: true});
});