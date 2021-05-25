// Content Class...
function Content() {
	this.mColours = ["#EB2B2B", "#EB982B", "#20C8E4", "#392FD5", "#2DC812", "#0DCDA2", "#9B40E2", "#F89EB9"];
	this.mIndex = 0;
	
	this.mWords = new Array();
	this.mRandom = false;
	this.mMinSize = 320;
	this.mSizeVariance = 110;
}

Content.prototype.Init = function() {
	var element = document.getElementById("content");
	
	var test = "<div id='currentHead'>\n";
	test += '\tenter words below seperated by a new line and then press "begin"\n';
	test += "</div>\n\n";
	
	test += "<p/>\n";
	
	test += "<div id='currentDesc'>\n";
		test += "<form>\n";
			test += "<textarea id='wordList' rows='10' cols='50' autofocus='true'></textarea>\n";
				test += "<br/>\n";
			test += "<input id='randomCheck' type='checkbox'> randomise order?\n"
				test += "<br/>\n";
			test += "min size <input id='minSize' type='number' min='20' value='320' size='10px'> <input id='maxSize' type='number' min='20' value='430' size='5px'> max size\n"
				test += "<p/>\n";
			test += "<input onclick='OnBeginClick()' type='button' value='begin'>\n"
		test += "</form>\n";
	test += "</div>\n";
	
	element.innerHTML = test;
}

Content.prototype.Begin = function() {
	var wordList = document.getElementById("wordList").value;
	this.mWords = wordList.split("\n");
	for (var i = 0; i < this.mWords.length; ++i) {
		if (this.mWords[i] == "") {
			this.mWords.splice(i, 1);
			--i;
		}
	}
	
	this.mRandom = document.getElementById("randomCheck").checked;
	this.mMinSize = document.getElementById("minSize").value;
	this.mSizeVariance = document.getElementById("maxSize").value - this.mMinSize;
	if (this.mSizeVariance < 0) {
		this.mSizeVariance = 0;
	}
	
	this.ShuffleWords();
	
	this.DisplayWord();
	nmain.started = true;
}

Content.prototype.DisplayWord = function() {
	if (this.mWords.length > 0) {
		var word = this.mWords[this.mIndex];
		this.mIndex++;
		if (this.mIndex >= this.mWords.length) {
			this.mIndex = 0;
			
			this.ShuffleWords();
			if (this.mWords.length > 1 && this.mWords[0] == word) {
				var temp = this.mWords[0];
				this.mWords[0] = this.mWords[this.mWords.length - 1];
				this.mWords[this.mWords.length - 1] = temp;
			}
		}
		
		var colour = this.mColours[Math.floor(Math.random() * this.mColours.length)];
		var size = Number(this.mMinSize) + Math.floor(Math.random() * Number(this.mSizeVariance));
		
		var element = document.getElementById("content");
		
		var test = "<div id='currentHead'>\n";
		test += "</div>\n\n";
		
		test += "<div id='currentDesc'";
			test += "style='color: ";
				test += colour;
			test += ";";
			
			test += "font-size: ";
				test += size;
			test += "px;'";
		test += ">\n";
		test += word;
		test += "\n";
		test += "</div>\n";
		
		element.innerHTML = test;
	}
}

Content.prototype.ShuffleWords = function() {
	if (this.mRandom  == true) {
		var currentIndex = this.mWords.length, temporaryValue, randomIndex;
		
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			// And swap it with the current element.
			temporaryValue = this.mWords[currentIndex];
			this.mWords[currentIndex] = this.mWords[randomIndex];
			this.mWords[randomIndex] = temporaryValue;
		}
	}
}
// ...End

// main Namespace...
var nmain = new function() {
	this.started = false;
	this.cont = new Content();
}
// ...End

function OnPageLoad() {
	nmain.cont.Init();
};

function OnBeginClick() {
	nmain.cont.Begin();
};

document.onmousedown = function(e) {
	if (e.button == 0 && nmain.started == true) {
		nmain.cont.DisplayWord();
	}
}
