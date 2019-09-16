window.addEventListener('load', function() {
    // your code here
    alert("Nu kommer Figge Ferrum i egen hög person");

	document.getElementById("jform_title").value = "Kräftkalas, kräftkalas";
  	
  	var textEditor = document.getElementById("jform_articletext_ifr").contentWindow.document.getElementById("tinymce");
  	textEditor.getElementByTagName("P")[0].innerHTML = "Kräftkalas, kräftkalas, nu är det kräftkalas!";
}, false);