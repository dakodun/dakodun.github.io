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
   | (.lazyload) to  element  which  overr- |
   | ides specified property until removed. |
   |                                        |
   | (import  script as  'module'  or using |
   | 'defer').                              |
   '----------------------------------------' */

// <div class="myclass"> Content </div>
// 
// ... becomes:
// 
// <div class="myclass lazyload"
// style="--lazybg: url('path/to/bg.png');
// --lazycol: #AA4466;"> Content </div>
//
// ... where myclass might look like:
// 
// background-image: var(--lazybg);
// background-color: var(--lazycol);

function lazyLoad() {
  // create an observer that explicitly loads a lazy-loaded element's
  // image file (via the src of img element not in the dom) when in
  // view and transitions from a defined block colour to the image
  // only when it is fully loaded

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // image source is contained in the "--lazybg_" var
        // which was created from the "--lazybg" var -
        // "srcSub" strips out "url('" and "')" from the css var
        // for use as the image elements source

        let srcCSS = element.style.getPropertyValue("--lazybg_");
        element.style.removeProperty("--lazybg_");
        let srcImg = srcCSS.substring(5, srcCSS.length - 2);

        let image = document.createElement("img");
        image.src = srcImg;
        image.addEventListener("load", (e) => {
          image = null;

          // remove lazy colour as it can create artefacts if left
          // especially with anti-aliasing at rounded borders

          element.style.setProperty("--lazycol", "none");
          element.style.setProperty("--lazybg", srcCSS);
          element.classList.remove("lazyload");

          observer.unobserve(element);
        });
      }
    });
  });

  // find all lazy-loaded elements on the page and add them to the
  // observer, making sure to set their default background var to
  // none (so it is only visible when fully loaded) after storing
  // a copy of it

  // initially background var should be set to the actual background
  // image in case javascript is disabled as this allows it to display
  // normally

  const lazyElements = document.querySelectorAll(".lazyload");
  lazyElements.forEach((element) => {
    // store a copy of the "lazybg" variable before setting
    // it to none so we can later restore it when the image
    // is fully loaded

    let lazybg = element.style.getPropertyValue("--lazybg");
    element.style.setProperty("--lazybg", "none");
    element.style.setProperty("--lazybg_", lazybg);

    observer.observe(element);
  });
}

// call our function (which happens after DOM content is loaded)
lazyLoad();
