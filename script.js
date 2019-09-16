// ==UserScript==
// @name     Ferrums skrot Greasemonkey script
// @namespace ferrumsskrot
// @version  1
// @grant    GM.openInTab
// @include	 http://ferrumsskrot.gq:8888/administrator/index.php?option=com_content&view=article&layout=edit
// @require  https://raw.githack.com/HGustavs/ContextFreeLib/master/js/contextfreegrammar.js
// ==/UserScript==

console.log("The script is loaded");

window.addEventListener('load', function() {
  //alert("Nu kommer Figge Ferrum i egen hög person");
  
  // The randomized sentence is stored in the snus variable
  var randomTitle = generate_sentence(0.5,0.5,0.5,0.5,null,null,null,null,null,null,null);
  
  var randomText = "";
  for(var i = 0; i < 20; i++){
    sentence = generate_sentence(0.5,0.5,0.5,0.5,null,null,null,null,null,null,null);
    randomText += sentence;
  }
  
  document.getElementById("jform_title").value = randomTitle;
  unsafeWindow.tinyMCE.editors[0].insertContent(randomText);
  
  document.getElementById("jform_featured0").value = "1";
  unsafeWindow.Joomla.submitbutton("article.save2new");
}, false);