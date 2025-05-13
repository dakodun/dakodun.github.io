// Iain M. Crawford (https://chikin.net)

/* ,-- PRE-PARSE CSS FOR LAZY LOAD ----------.
   | parse all included  stylesheets to swap |
   | lazy load rule from dummy rule (.lazy_) |
   | to the actual lazy rule (.lazy).        |
   |                                         |
   | this means  lazy-loading  is only acti- |
   | vated if javascript is enabled.         |
   |                                         |
   | if using this method,  the rule name in |
   | the stylesheet should be ".lazy_",  and |
   | the class  assigned to the  element sh- |
   | ould be ".lazy".
   |                                         |
   | (script  must  run  before  document is |
   | parsed and  after stylesheets  are loa- |
   | ded).                                   |
   '-----------------------------------------' */

function lazyLoadPreParse() {
  // get only the stylesheets that are same-origin
  let sheets = [...document.styleSheets].filter((sheet) => {
    return ((new URL(sheet.href)).origin === window.location.origin);
  });

  // replace all dummy rules with the actual lazy load selector name
  sheets = sheets.forEach((sheet) => {
    for (let rule of sheet.cssRules) {
      if (rule.selectorText && rule.selectorText.includes(".lazy_")) {
        rule.selectorText =
        rule.selectorText.replace(".lazy_", ".lazy");
      }
    }
  });
}

lazyLoadPreParse();
