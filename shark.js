window.onload = function() {
  let shark = document.querySelector('#secretshark');
  if (shark != null) {
    let sharkNum = Math.floor(Math.random() * 2) + 1;
    shark.src = '/site/secretshark_' + sharkNum + '.png';
  }
};
