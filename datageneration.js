// ==UserScript==
// @name     Ferrums skrot Greasemonkey script
// @namespace ferrumsskrot
// @version  1
// @grant    GM.openInTab
// @grant    GM.setValue
// @grant    GM.getValue
// @include  http://ferrumsskrot.gq:8888/administrator/index.php?option=com_content&view=article&layout=edit
// @require  https://raw.githubusercontent.com/a97marbr/ContextFreeLib/master/js/randapp.js
// @require  https://raw.githubusercontent.com/a97marbr/ContextFreeLib/master/js/contextfreegrammar.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js
// ==/UserScript==

console.log("The script is loaded");

var loops = 1000;

var seed = 1;

var grammar=new ContextFreeGrammar({
    "probabilityNounPhrase":0.5,
    "probabilityVerbPhrase":0.5,
    "probabilityDualAdjectives":0.5,
    "probabilityStartAdjective":0.5,
    "distributionOfNouns":"uni-squared",
    "distributionOfVerbs":"uni-squared",
    "distributionOfAdjectives":"uni-squared",
    "distributionOfAdverbs":"uni-squared",
    "distributionOfDeterminers":"uni-squared",
    "distributionOfConjunctions":"uni-squared",
    "distributionOfModals":"uni-squared",
    "randomSeed":seed
});

function generateStuff() {
    var randomTitle = grammar.generateSentence();
    //var randomTitle = "hey";


  //console.log(myrng() * 10);                // Always 0.3752569768646784

   var sentence = "";

  var randomText = "";

  var myrng = new Math.seedrandom(seed);

  var sentenceCount = myrng() * 10;
  console.log(sentenceCount);
    //Use count, to determine seed position

  for(var i = 0; i < sentenceCount; i++){
    console.log(seed);
    sentence = grammar.generateSentence();
    randomText += sentence;
  }

  document.getElementById("jform_title").value = randomTitle;
  unsafeWindow.tinyMCE.editors[0].insertContent(randomText);
}

function submitStuff() {
  document.getElementById("jform_featured0").value = "1";
	unsafeWindow.Joomla.submitbutton("article.save2new");
}

window.addEventListener('load', function() {
  //alert("Nu kommer Figge Ferrum i egen hög person");

  (async () => {
  let count_before = await GM.getValue('count', 0);
  seed += await GM.getValue('count');
  generateStuff();

  // Note awaiting the set -- required so the next get sees this set.
  await GM.setValue('count', count_before + 1);

  // Get the value again, just to demonstrate order-of-operations.
  let count_after = await GM.getValue('count');

  if (await GM.getValue('count') > loops) {
    grammar.clearSeeds();
    console.log("Seed: ", seed);
    await GM.setValue('count', 0);
    alert("FÄRDIGT!");
    return 0;
  }
  
  submitStuff();  
  
  console.log('Greasemonkey has run', count_after, 'times');
    })();
}, false);
