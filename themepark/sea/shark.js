let bubbleSurface = document.getElementById("bubbles");
//   if (shark != null) {

function Bubble() {
  this.next = null;
  this.prev = null;
};

let bubbleBlower = {
  start: function() {
    //store the current time and begin brewing bubbles
    this.lastBubble = document.timeline.currentTime;

    requestAnimationFrame((timestamp) => { this.brew(timestamp); });
  },
  brew: function(timestamp) {
    const elapsed = timestamp - this.lastBubble;

    // if enough time has elapsed then blow a bubble and
    // restart the timer
    if (elapsed > this.limit &&
      this.bubbles.length < this.bubbleLimit) {
        
      this.blow();
      this.lastBubble = document.timeline.currentTime;
    }

    // iterate through current bubbles to update positions
    // and remove those that have expired
    let bub = this.bubbles;
    while (bub !== null) {
      // move bub

      // if bub has reached it's limit
        // remove it from the dom
        // prev.bub = bub.next
      
      bub = bub.next;
    }

    requestAnimationFrame((timestamp) => { this.brew(timestamp); });
  },
  blow: function(timestamp) {
    let x = document.createElement("span", { class: "bubble" });
    bubbleSurface.appendChild(x);
  },
  
  lastBubble: 0,
  limit: 1000,

  bubbles: null,
  bubbleLimit: 20, // how many bubbles can exist at once
};

window.addEventListener("load", (e) => {
  if (bubbleSurface !== null) {
    // bubbleBlower.start();
  }
});
