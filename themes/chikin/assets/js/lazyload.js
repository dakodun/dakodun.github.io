// Iain M. Crawford (https://chikin.net)
// based on the css-tricks article: 
// https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
// and the mdn web docs page:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

/* ,-- LAZY LOADING FOR CSS IMAGES ---------.
   | delays loading of images  specified in |
   | css  (such as backgrounds)  until they |
   | are visible on the screen.             |
   |                                        |
   | works by  assigning  additional  class |
   | (.lazy)  to  element  which  overrides |
   | specified property until removed.      |
   |                                        |
   | (import  script as  'module'  or using |
   | 'defer').                              |
   '----------------------------------------' */

function lazyLoad() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // if element is in view then swap from dominant colour
        // to image by removing lazy class
        
        const element = entry.target;
        element.classList.remove("lazy");
        observer.unobserve(element);
      }
    });
  });

  // get a list of elements that should load lazily
  // and add them to the observer
  const lazyElements = document.querySelectorAll(".lazy");
  lazyElements.forEach((element) => {
    observer.observe(element);
  });
}

// call our function (which happens after DOM content is loaded)
lazyLoad();
