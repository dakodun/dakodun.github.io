var lines = new Array();
var draws = new Array();

const tLine = document.querySelector("#tAddLine");
const bLine = document.querySelector("#bAddLine");
const linesArea = document.querySelector("#Lines");

const ballColors = ["rgb(23, 107, 178)", "rgb(119, 212, 44)",
    "rgb(247, 47, 40)", "rgb(255, 116, 23)", "rgb(242, 225, 41)",
    "rgb(135, 80, 33)", "rgb(170, 46, 201)"];
const tDraw = document.querySelector("#tAddDraw");
const bDraw = document.querySelector("#bAddDraw");
const drawsArea = document.querySelector("#Draws");

const returnsArea = document.querySelector("#Returns");

tLine.addEventListener("keydown", (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    addLine(e);
  }
});
bLine.addEventListener("click", addLine);

tDraw.addEventListener("keydown", (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    addDraw(e);
  }
});
bDraw.addEventListener("click", addDraw);

function addLine(e) {
  let input = tLine.value;
  let nums = input.split(" ");

  try {
    validateNumbers(nums, 9);

    let linesEntry = document.createElement("div");
    linesEntry.className = "LinesEntry";
    linesEntry.dataset.numberStr = input;

    let linesSide = document.createElement("div");
    linesSide.className = "LinesSide";
    linesEntry.appendChild(linesSide);

    let linesNumbersGrid = document.createElement("div");
    linesNumbersGrid.className = "LinesNumbersGrid";
    for (let n of nums) {
      let linesNumbers = document.createElement("div");
      linesNumbers.className = "LinesNumbers";
      linesNumbers.insertAdjacentText("afterbegin", n);
      linesNumbersGrid.appendChild(linesNumbers);
    }

    linesEntry.appendChild(linesNumbersGrid);

    let linesButton = document.createElement("input");
    linesButton.className = "LinesButton";
    linesButton.type = "button";
    linesButton.value = "- Remove Line";
    linesButton.addEventListener("click", removeLine);
    linesEntry.appendChild(linesButton);

    linesArea.appendChild(linesEntry);

    lines.push(nums);
    updateReturns();
    tLine.value = "";
  } catch (e) {
    alert(e.message);
  }
}

function removeLine(e) {
  let parent = e.target.parentElement;
  let grandParent = parent.parentElement;
  grandParent.removeChild(parent);

  e.target.removeEventListener("click", removeLine);

  lines.splice(0, lines.length);
  for (let c of linesArea.children) {
    if (c.hasAttribute("data-number-str")) {
      let nums = c.dataset.numberStr.split(" ");
      lines.push(nums);
    }
  }

  updateReturns();
}

function addDraw(e) {
  let input = tDraw.value;
  let nums = input.split(" ");

  try {
    validateNumbers(nums, 6);

    let drawsEntry = document.createElement("div");
    drawsEntry.className = "DrawsEntry";
    drawsEntry.dataset.numberStr = input;

    let drawsNumbersRow = document.createElement("div");
    drawsNumbersRow.className = "DrawsNumbersRow";
    for (let n of nums) {
      let drawsNumbers = document.createElement("div");
      drawsNumbers.className = "DrawsNumbers";
      drawsNumbers.style = "background-image: repeating-radial-gradient(" +
          "rgb(255, 254, 245), rgb(255, 254, 245) 13px, transparent 13px," +
          "transparent), repeating-radial-gradient" +
          "(transparent, transparent 16px, " + ballColors[n % 7] +
          " 16px, " + ballColors[n % 7] + "), repeating-linear-gradient" +
          "(180deg, " + ballColors[n % 7] + ", " + ballColors[n % 7] +
          " 9px, rgb(255, 254, 245) 9px, rgb(255, 254, 245) 30px);"
      drawsNumbers.insertAdjacentText("afterbegin", n);
      drawsNumbersRow.appendChild(drawsNumbers);
    }

    drawsEntry.appendChild(drawsNumbersRow);

    let drawsButton = document.createElement("input");
    drawsButton.className = "DrawsButton";
    drawsButton.type = "button";
    drawsButton.value = "- Remove Draw";
    drawsButton.addEventListener("click", removeDraw);
    drawsEntry.appendChild(drawsButton);

    drawsArea.appendChild(drawsEntry);
    
    draws.push(nums);
    updateReturns();
    tDraw.value = "";
  } catch (e) {
    alert(e.message);
  }
}

function removeDraw(e) {
  let parent = e.target.parentElement;
  let grandParent = parent.parentElement;
  grandParent.removeChild(parent);

  e.target.removeEventListener("click", removeLine);

  draws.splice(0, draws.length);
  for (let c of drawsArea.children) {
    if (c.hasAttribute("data-number-str")) {
      let nums = c.dataset.numberStr.split(" ");
      draws.push(nums);
    }
  }

  updateReturns();
}

function validateNumbers(numbers, count) {
  if (numbers.length < count) {
    throw new Error("not enough numbers");
  }
  else if (numbers.length > count) {
    throw new Error("too many numbers");
  }

  let dupes = {};
  for (let n of numbers) {
    if (isNaN(n)) {
      throw new Error(n + " is not a number");
    }
    else if (n < 1 || n > 49) {
      throw new Error(n + " is outwith valid range (1 - 49)");
    }
    else if (dupes[n]) {
      throw new Error(n + " is a duplicate entry");
    }
    
    dupes[n] = true;
  }
}

function updateReturns() {
  let totalReturns = 0;
  let breakdown = new Array();

  if (lines.length != 0 && draws.length != 0) {
    for (let i = 0; i < lines.length; ++i) {
      for (let j = 0; j < draws.length; ++j) {
        let currLine = lines[i].slice();
        let currDraw = draws[j].slice();
        let currResult = [
            false, false, false,
            false, false, false,
            false, false, false
        ];

        let matches = 0;
        let trebs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        
        for (let d of currDraw) {
          for (let l = 0; l < currLine.length; ++l) {
            if (currLine[l] == d) {
              currResult[l] = true;
              ++matches;
              break;
            }
          }
        }

        if (currResult[0] && currResult[2] &&
            currResult[6] && currResult[8]) {
          
          breakdown.push("line " + (i + 1) + " matched 4 corners in draw " +
              (j + 1));
          totalReturns += 1500;
        }

        let trebCount = 0;
        for (let t of trebs) {
          if (currResult[t[0]] && currResult[t[1]] && currResult[t[2]]) {
            ++trebCount;
          }
        }

        if (trebCount > 0) {
          breakdown.push("line " + (i + 1) + " matched " + trebCount +
              " trebles in draw " + (j + 1));
          
          totalReturns += (100 * trebCount);
        }

        if (matches > 3) {
          breakdown.push("line " + (i + 1) + " matched " + matches + " from " +
              "9 in draw " + (j + 1));


          let r = (matches * (matches - 1) * (matches - 2) * (matches - 3)) /
            (4 * 3 * 2);
          totalReturns += (25 * r);
        }
      }
    }
  }

  returnsArea.innerHTML = "";

  if (totalReturns == 0) {
    let pTotal = document.createElement("p");
    pTotal.id = "ReturnsTotal";
    pTotal.insertAdjacentText("afterbegin", "no returns");
    returnsArea.appendChild(pTotal);
  }
  else {
    let pTotal = document.createElement("p");
    pTotal.id = "ReturnsTotal";
    pTotal.insertAdjacentText("afterbegin", "total returns are £" + totalReturns);
    returnsArea.appendChild(pTotal);

    for (let b of breakdown) {
      let p = document.createElement("p");
      p.className = "ReturnsBreakdown";
      p.insertAdjacentText("afterbegin", b);
      returnsArea.appendChild(p);
    }
  }
}

// check results on add
  // need to store selections and draws
// check results on remove
  // need to be able to remove correct selection/draw

// check
  // for a £2 stake
    // 4 corners (0, 2, 6, 8) == £1500
    // line or diagonal == £100
      // 0, 1, 2
      // 3, 4, 5
      // 6, 7, 8
    // and 4 from 9 == £25
