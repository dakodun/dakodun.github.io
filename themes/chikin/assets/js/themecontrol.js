// Iain M. Crawford (https://chikin.net)

/* ,-- CONTROL FOR THEME TOGGLE CHECKBOX ---.
   | switches  between dark and light theme |
   | when checkbox "themeToggle" is toggled |
   | by setting "theme-" vars to "dark-" or |
   | "light-" vars as appropiate.           |
   |                                        |
   | defaults to light theme  unless a dark |
   | theme is preferred or a preference ex- |
   | ists in local storage.                 |
   '----------------------------------------' */

let toggleID = "#themeToggle";
let themeCurr = "--light-";
let themeProps = [];

// initialise the theme by storing theme related vars
// and toggling theme to dark if necessary
function initTheme() {
  // get all theme related properties
  populateThemeProps();

  // switch the initial theme if the user has set a preference
  // for a darker theme (as the css will default to that theme
  // before this script runs)
  if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
    
    themeCurr = "--dark-";
  }

  // get the stored theme if any exists and attempt to switch
  // to it
  let storedTheme = localStorage.getItem("themeCurr");
  if (storedTheme) {
    switchTheme(storedTheme);
  }
}

// get toggle element, set initial state of checkbox child and
// add event listener for click
function initToggle() {
  let themeEle = document.querySelector(toggleID);
  if (themeEle !== null) {
    if (themeCurr === "--dark-") {
      themeEle.firstElementChild.checked = true;
    }

    // use click event to prevent an issue in firefox regarding
    // clicking and dragging not firing a change event when bubbling
    // from input control to a parent label
    themeEle.addEventListener("click", (e) => {
      e.preventDefault();

      switchTheme();

      themeEle.firstElementChild.checked =
        !themeEle.firstElementChild.checked;

      localStorage.setItem("themeCurr", themeCurr);
      
      // change animation to a more flashy slide when clicked
      // (i couldn't find a way to do this in pure css
      // without it activating on every page load)
      if (themeEle.firstElementChild.checked) {
        themeEle.classList.add("checkbox-sunmoon-anim");
        themeEle.classList.remove("checkbox-sunmoon-anim-r");
      } else {
        themeEle.classList.remove("checkbox-sunmoon-anim");
        themeEle.classList.add("checkbox-sunmoon-anim-r");
      }
    });

    // since we have javascript available we can remove the
    // "nojs" overlay wich should be the last child
    themeEle.removeChild(themeEle.lastElementChild);
  }
}


// find all vars beginning with "theme-", which
// are the vars which can be toggled
function populateThemeProps() {
  /* // just doing this works fine in firefox to get the
  // ":root" styles from all same-origin stylesheets
  // but in chrome it doesn't get any custom styles,
  // only in-built

    const root = document.querySelector(':root');
    const styles = [getComputedStyle(root)]; */

  // this works in both firefox and chrome in much the same
  // way but is a little more complicated

  // get only the stylesheets that are same-origin
  let sheets = [...document.styleSheets].filter((sheet) => {
    return ((new URL(sheet.href)).origin === window.location.origin);
  });

  // search the same-origin stylesheets for a ":root" rule
  // and add its styles to the array
  const styles = [];
  sheets = sheets.forEach((sheet) => {
    for (let rule of sheet.cssRules) {
      if (rule.selectorText === ":root") {
        styles.push(rule.style);
        break;
      }
    }
  });
  
  // loop all ":root" styles and all properties in those
  // styles for "--theme-" releated variables
  for (let style of styles) {
    for (let prop of style) {
      if (prop.slice(0, 8) === "--theme-") {
        let propSub = prop.slice(8);
        themeProps.push(propSub);
      }
    }
  }
}

// toggle theme if the new theme doesn't match the current
// theme
function switchTheme(newTheme) {
  if (newTheme !== themeCurr) {
    const root = document.querySelector(':root');
    const style = getComputedStyle(root);

    themeCurr = (themeCurr === "--light-") ? "--dark-" : "--light-";

    for (let prop of themeProps) {
      let propTheme = "--theme-" + prop;
      let valueTheme = "var(" + themeCurr + prop + ")";
      root.style.setProperty(propTheme, valueTheme);
    }
  }
}
