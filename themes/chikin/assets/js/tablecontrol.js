// Iain M. Crawford (https://chikin.net)

/* ,-- TABLE CONTROL -----------------------.
   | handles the form elements that consti- |
   | ute the  controls  for the  game  card |
   | table.                                 |
   |                                        |
   | handles sorting, styling and filtering |
   | of game cards in the table.            |
   |                                        |
   | deals with behaviour in firefox regar- |
   | ing selecting  inputs via  clicking on |
   | their labels and moving the mouse.     |
   |                                        |
   | transforms game name into a barcode to |
   | decorate the front of the card.        |
   '----------------------------------------' */

let table = document.querySelector("#games-table");
let instrElem = table.querySelector("div.card-instr");
let cards = [];
let currCard = null;

let tableControls =
  document.querySelector("#games-table-controls");
let filterMap = new Map();

let styleProps = ["--games-entry-height", "--games-entry-name",
  "--games-entry-platform", "--games-hr-disp", "--games-simp-text"];

function getCards() {
  // if we have a valid table, get all cards in that table
  // (matching children in its dom)

  if (table) {
    // select the instruction card radio button on a page load
    // to ensure all cards are colapsed on a "soft" refresh (firefox)
    if (instrElem) {
      let elemContent = instrElem.firstElementChild;

      if (elemContent) {
        for (const child of elemContent.children) {
          if (child.nodeName === "INPUT" && child.type === "radio") {
            child.checked = true;
            break;
          }
        }
      }
    }
    
    // get only cards that form the content of the table (i.e.,
    // not the instruction card)
    let cardElems = table.querySelectorAll("div.card-cont");
    for (let elem of cardElems) {
      cards.push(elem);
      barcodifyCard(elem);
    }
  }
}

function barcodifyCard(cardElem) {
  // step through the card element contnent to find the
  // horizontal rule element buried in its hierarchy and 
  // change it to be a customised barcode based on the
  // game's name

  let elemHR = null;

  if (cardElem) {
    let elemIter = cardElem.firstElementChild;

    if (elemIter) {
      for (let i = 0; i < elemIter.children.length; ++i) {
        let child = elemIter.children[i];
        if (child.className.includes("card-cover")) {
          elemIter = child;
          i = -1;
        } else if (child.className.includes("cover-content")) {
          elemIter = child;
          i = -1;
        } else if (child.nodeName === "HR") {
          elemHR = child;
          break;
        }
      }
    }
  }

  // if we found a horizontal rule inside the card cover
  // then change the content to be our customised barcode
  if (elemHR) {
    // map letters to values depending on how often they
    // appear in writings, numbers are divided by 3
    let letterValue = new Map([
      ["z", 0], ["q", 0], ["j", 0], ["x", 0], ["k", 0],
      ["v", 0], ["b", 0], ["p", 0],

      ["g", 1], ["y", 1], ["f", 1], ["m", 1], ["w", 1],
      ["c", 1], ["u", 1], ["l", 1], ["d", 1],

      ["r", 2], ["h", 2], ["s", 2], ["n", 2], ["i", 2],
      ["o", 2], ["a", 2], ["t", 2], ["e", 2],

      ["0", 0], ["3", 0], ["6", 0], ["9", 0],
      ["1", 1], ["4", 1], ["7", 1],
      ["2", 2], ["5", 2], ["8", 2]
    ]);

    // each value is then assigned a thickness of bar
    let valueBar = new Map([
      [0, "❘"], [1, "❙"], [2, "❚"]
    ]);

    // convert every character into a bar, special characters
    // are middle thickness and spaces are a dot
    let output = "";
    let input = elemHR.dataset.name.toLowerCase();
    for (let char of input) {
      let val = letterValue.get(char);
      let bar = valueBar.get(val);

      if (bar) {
        output += bar;
      } else if (char === " ") {
        output += "‧";
      } else {
        output += valueBar.get(1);
      }
    }

    // updating the custom dataset attribute updates
    // the content property in the css pseudo-element
    elemHR.dataset.barcode = output;
  }
}

function getFilters() {
  // for all filter checkboxes, get their current checked 
  // status and create a map entry using it as the value

  let filters = document.querySelectorAll("input");
  for (let elem of filters) {
    if (elem.name === "card-filter") {
      filterMap.set(elem.value, elem.checked);
    }
  }
}

function setInitial() {
  // need to perform an initial sort, style and filter as a
  // "soft" refresh doesn't always reset form state

  // get all radio buttons and apply the currently
  // selected card sort and style
  let counter = 0;
  let styles = document.querySelectorAll("input");
  for (let elem of styles) {
    if (elem.name === "card-sort" && elem.checked) {
      let sortMode = parseInt(elem.value);
      sortCards(sortMode);
      ++counter;
    } else if (elem.name === "card-style" && elem.checked) {
      updateStyle(elem.value);
      ++counter;
    }

    if (counter === 2) { break; }
  }

  // update all cards visibility depending on the corresponding
  // checkbox state
  for (let c of cards) {
    if (!filterMap.get(c.dataset.platform))  {
      c.classList.add("card-hidden");
    }
  }
}

function sortCards(sortMode) {
  // sort all cards in the array by the specified mathod, and
  // then update the table dom by removing all children and re-
  // adding them in the new (array) order
  
  // switch sort order depending on if ascending
  // or descending is preferred (odd is descending)
  let asc = (sortMode % 2 === 0) ? [-1, 1] : [1, -1];
  
  cards.sort((a, b) => {
    // sort depending on which property is preferred
    // [0, 1] added, [2, 3] title, [4, 5] platform
    // default to order in which cards were added if
    // there is a match (i.e., same platform)

    if (sortMode === 0 || sortMode === 1) {
      return (a.dataset["order"] < b.dataset["order"]) ? asc[0] :
        (a.dataset["order"] > b.dataset["order"]) ? asc[1] : 0;
    } else if (sortMode === 2 || sortMode === 3) {
      return (a.dataset["name"] < b.dataset["name"]) ? asc[0] :
        (a.dataset["name"] > b.dataset["name"]) ? asc[1] : 
        (a.dataset["order"] < b.dataset["order"]) ? asc[0] :
        (a.dataset["order"] > b.dataset["order"]) ? asc[1] : 0;
    } else if (sortMode === 4 || sortMode === 5) {
      return (a.dataset["platform"] < b.dataset["platform"]) ? asc[0] :
        (a.dataset["platform"] > b.dataset["platform"]) ? asc[1] :
        (a.dataset["order"] < b.dataset["order"]) ? asc[0] :
        (a.dataset["order"] > b.dataset["order"]) ? asc[1] : 0;
    }

    // invalid sort criteria so skip sorting
    return 0;
  });

  // update table dom
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // add the instruction card back to the start
  if (instrElem) {
    table.appendChild(instrElem);
  }

  for (let c of cards) {
    table.appendChild(c);
  }
}

function updateStyle(styleMode) {
  // update the styling of the cards by applying a
  // prefix to the css variable to change which
  // variable is being pointed to
  // (for example, --xyz: var(--xyz-c) => --xyz: var(--xyz-r))

  const root = document.querySelector(':root');

  for (let prop of styleProps) {
    let val = "var(" + prop + styleMode + ")";
    root.style.setProperty(prop, val);
  }
}

function dispatchCustomEvent(target, control) {
  // create a custom event that points to the actual control
  // (such as checkbox or radio button) that we want to trigger
  // and dispatch it to target element

  const event = new CustomEvent("control-change", {
    view: window,
    bubbles: true,
    cancelable: true,
    detail: control,
  });

  // only send the event if the control has actually
  // changed (an already selected radio button shouldn't
  // generate an event)
  if (control.nodeName === "INPUT") {
    if (control.type === "radio" && control.checked === false) {
      // a radio button should only toggle its state if it is
      // current unchecked, then send a custom change event
      control.checked = true;
      target.dispatchEvent(event);
    } else if (control.type === "checkbox") {
      // a checkbox should just toggle its state then send
      // a custom change event
      control.checked = !control.checked;
      target.dispatchEvent(event);
    }
  }
}

function handleChange(target) {
  switch(target.name) {
    case "card-sort" :
      // get the new sort mode and perform a sort (which will
      // also update the dom of the table)

      let sortMode = parseInt(target.value);
      sortCards(sortMode);
      
      break;

    case "card-style" :
      // update the style according to the newly selected
      // radio button

      updateStyle(target.value);
      
      break;

    case "card-filter" :
      // when a filter checkbox is changed iterate all cards
      // and update the visibility of any with a matching platform,
      // then update the current value in the map

      
      for (let c of cards) {
        if (c.dataset.platform === target.value) {
          if (target.checked) {
            c.classList.remove("card-hidden");
          } else {
            c.classList.add("card-hidden");
          }
        }
      }

      filterMap[target.value] = target.checked;

      break;

    default:
      break;
  }
}

function registerCallbacks() {
  // register callback for the entire form element which handles
  // individual controls within it via a switch statement and
  // target attribute (event bubbling)

  // (controls only work properly when javascript is enabled, so
  // initially assume controls are disabled and only enable them
  // when we reach this point in the script)

  // chrome always sends a "change" event when a label is clicked
  // even if the mouse is moving, but firefox doesn't so instead
  // we need to handle the "click" event and perform a little bit
  // of busy-work to generate our own change event
  
  if (tableControls) {
    tableControls.classList.remove("controls-nojs");

    tableControls.addEventListener("click", (e) => {
      if (e.target && e.target.nodeName === "LABEL") {
        // if any label is clicked then first prevent the
        // default action which makes behaviour consistent
        // across both browsers (i.e., no change event generated)
        // then dispatch a custom event

        e.preventDefault();
        dispatchCustomEvent(tableControls, e.target.control);
      }
    });

    tableControls.addEventListener("control-change", (e) => {
      // our custom event is essentially a change event but
      // the target is contained in the custom "detail" property
      // since "target" is a read-only property
      
      handleChange(e.detail);
    });
    
    tableControls.addEventListener("change", (e) => {
      // still want to handle default change event as it is
      // consistent across both browsers and doesn't interfere
      // with our custom code

      handleChange(e.target);
    });
  }
}

// perform initial setup of form elements
getCards();
getFilters();
setInitial();
registerCallbacks();
