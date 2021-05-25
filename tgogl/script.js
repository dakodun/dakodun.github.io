var parts = [
  [
    "stab", "go on holiday with", "stay in a tent with", "join a band with",
    "marry", "kiss", "bathe", "are a siamese twin with", "tap £20 to",
    "borrow underpants from", "win a nobel prize with",
    "share a bag of monster munch with", "have a child with",
    "lose a fight to", "star in a tv comedy with",
    "repopulate the planet post apocalypse with", "sniff a fart from",
    "get invited to christmas dinner by",
    "go on a romantic weekend to ??? with", "share a cigarette with",
    "recieve a foot massage from", "send a risque text to"
  ],
  [
    "Big John (from Paddy Power)", "Pat and her Family", "Eddie",
    "George Morning", "Spud", "Gareth and his Wife",
    "Under a Bridge Man", "Man Bin", "Ten Eddies",
    "Shorty and Prestige Kris", "Dorothy Fag Man",
    "Big Steph in a gimp suit", "gay robot Eddie",
    "Jake Sparrow dressed in a tuxedo", "Graeme Lightbody",
    "a confident, single Willie", "talk a lot Charlie",
    "Sean, Tam Winters and the Romanian Gang", "an eight year old Eddie",
    "Diane's ex Gary and his toothless burd",
    "Sean and his wife but he refers to her as Wilma II",
    "an attractive Anne Marie with long hair"
  ],
  [
    "once", "twice", "never", "every full moon", "for the whole of July",
    "every minute of every day", "every Easter", "on a bus",
    "in the back of Spud's car", "under Pat's quilt covers",
    "at knife point from Jamie Cadle", "up a tree hiding from Bosco",
    "only when it's raining", "in the swimming pool changing rooms",
    "at a kid's birthday party", "in the queue to get into the Dump",
    "at five past four PM", "in the back of a bin lorry",
    "during the final round of a gameshow",
    "whilst trying to explain a rule four to an idiot or ???",
    "whilst in a headlock from Matching Mick",
    "trapped in the Nip after closing time"
  ],
  [
    "because you love him/her/them.", "because you hate him/her/them.",
    "because you're horny.", "because you're lonely.",
    "because they smell great.", "because you drank too much.",
    "because you've been blackmailed.", "because you've been drugged.",
    "because of his/her/their beautiful singing voice.",
    "because of your daddy issues.", "because Angry Jesus told you to.",
    "because you hate yourself.", "because you lost a bet.",
    "because your bank card declined.", "because you're having a bad day.",
    "because you're just out of a complicated relationship.",
    "because that's just the person you are.",
    "because your phone battery died.", "because you ate a dodgy kebab.",
    "because you won second prize in a beauty contest.",
    "because the prick had it coming.", "because you wore the wrong outfit."
  ]
];

var button = document.querySelector('button');

var spans = [
  document.querySelector('#firstSpan'),
  document.querySelector('#secondSpan'),
  document.querySelector('#thirdSpan'),
  document.querySelector('#fourthSpan')
];

var spinDelay = 25;
var spinMax = 1200;
var timeoutID = null;

var rng = new MersenneTwister();
{
  let d = new Date();
  rng.init_genrand(d.getTime());
}

function getInt(lower, upper) {
  return (rng.genrand_int32() % ((upper + 1) - lower)) + lower;
}

button.addEventListener('click', event => {
  window.clearTimeout(timeoutID);
  for (let i = 0; i < spans.length; ++i) {
    spans[i].innerHTML = "";
  }

  timeoutID = window.setTimeout(spin, spinDelay, 0, 0, 0);
});

function spin(id, val, accum) {
  if (accum < spinMax) {
    spans[id].innerHTML = parts[id][val];
    let newVal = (val + 1) % parts[id].length;
    let newAccum = accum + spinDelay;
    timeoutID = window.setTimeout(spin, spinDelay, id, newVal, newAccum);
  }
  else if (id + 1 < spans.length){
    spans[id].innerHTML = parts[id][getInt(0, parts[id].length - 1)];
    timeoutID = window.setTimeout(spin, spinDelay, id + 1, 0, 0);
  }
  else {
    spans[id].innerHTML = parts[id][getInt(0, parts[id].length - 1)];
  }
}
