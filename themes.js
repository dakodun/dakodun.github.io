var currentTheme = "bee";

function lsTest() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

if (lsTest) {
  let t = localStorage.getItem('theme');
  if (t) {
    currentTheme = t;
  }
}

function getVar(name) {
  let styles = window.getComputedStyle(document.body);
  return styles.getPropertyValue(name);
}

function setVar(name, val) {
  document.body.style.setProperty(name, val);
}

function themeHelper(name) {
  setVar("--theme-background", getVar("--" + name + "-background"));
  setVar("--theme-background-size", getVar("--" + name + "-background-size"));
  setVar("--theme-background-repeat", getVar("--" + name + "-background-repeat"));

  setVar("--theme-color-main", getVar("--" + name + "-color-main"));

  setVar("--theme-logo", getVar("--" + name + "-logo"));

  document.querySelector('#logo-text').textContent = getVar("--" + name + "-logo-text");

  document.querySelector('#theme-button-' + currentTheme).disabled = false;
  document.querySelector('#theme-button-' + name).disabled = true;

  if (lsTest) {
    localStorage.setItem('theme', name);
  }

  currentTheme = name;
}

function setTheme(theme) {
  switch (theme) {
    case "sea":
      themeHelper("sea");
      break;
    case "bee":
    default:
      themeHelper("bee");
      break;
  }
}

function addListener(...names) {
  for (let i = 0; i < names.length; ++i) {
    document.querySelector('#theme-button-'+ names[i]).addEventListener('click', () => setTheme(names[i]), false);
  }
}

window.onload = function() {
  addListener("bee", "sea");
  setTheme(currentTheme);
};
