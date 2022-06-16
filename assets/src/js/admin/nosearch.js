//add a script to the page to hide the page from google search results
window.addEventListener('DOMContentLoaded', function() {
  let body = document.querySelector('body');
  let bodyClass = body.getAttribute('class');
  let robots = document.querySelector('meta[name="robots"]');
  let robotsContent = document.querySelector('meta[content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"]');
  //check if the page is using the hide-page-from-search class
  if (bodyClass.includes('page-template-page-hide-from-search')) {
    //remove the content of the current meta tag robots
    robotsContent.removeAttribute("content");
    //add a new content value for the meta tag robots
    robots.setAttribute("content", "noindex, noarchive, nositelinkssearchbox, noimageindex, nofollow, nosnippet");
    console.log('Page is hidden from search results');
    console.log(robots);
  } else {
    console.log('Page is not hidden from search results');
    console.log(robots);
  }
});
