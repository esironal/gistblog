/*
Copyright 2013 Sadique Ali
http://blog.sdqali.in
*/

(function () {
    $(document).ready(function() {
	var converter = new Showdown.converter();

	var setContent = function(content) {
	    $("#content").text(content);
	};

	var renderGist = function(title, gistFile){
	    var gistTitle = $("<h1>");
	    gistTitle.text(title);
	    gistTitle.attr("class", "title");
	    $("#content").append(gistTitle);

	    var gistBody = $("<div>");
	    gistBody.html(converter.makeHtml(gistFile.content));
	    $("#content").append(gistBody);

	    var footer = $("<div>");
	    footer.attr("class", "footer");
	    footer.html('<p>Coded by <a href="http://blog.sdqali.in">Sadique Ali</a>. Checkout the <a href="https://github.com/sdqali/gistblog">source code</a>.</p>');
	    $("#content").append(footer);
	};

	var loadGist = function(url) {
	    $.getJSON(url)
		.done(function(gist) {
		    var mainFile;
		    for(var file in gist.files) {
			mainFile = gist.files[file];
			break;
		    }
		    renderGist(gist.description, mainFile);
		})
		.fail(function(){
		    setContent("Failed to load Gist. Please check the ID.");
		});

	};

	var url = window.location.href;
	var match = url.match(/#(.*)/);
	if(match) {
	    var gistId = match[1];
	    var gistUrl = "https://api.github.com/gists/".concat(gistId);
	    loadGist(gistUrl);
	} else {
	    var gistUrl = "https://api.github.com/gists/6756799";
	    loadGist(gistUrl);
	}
    });
}) ();
