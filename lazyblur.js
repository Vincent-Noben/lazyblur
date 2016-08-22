(function() {
	// Fire lazyBlur on resize or scroll
	window.addEventListener("resize", lazyBlur);
	window.addEventListener("scroll", lazyBlur);

	function lazyBlur() {
		//console.log("lazyBlur called");
		var images = document.querySelectorAll("body img.lazyblur[data-src]"),item;
		images.forEach( function(image, index) {
			// Check if is in view
			if (checkVisible(image)) {
				// Load image in the back
				console.log("Image was in view");
				var downloadingImage = new Image();
				downloadingImage.onload = function(){
					// Replace src in original image
					images[index].src = this.src
					// Remove data tagg to unblur
					images[index].removeAttribute("data-src");
				};
				// Load bigg image in backend
				downloadingImage.src = images[index].getAttribute("data-src");
			}
		});
		// Remove event Listeners if last image was loaded
		if (images.length == 0) {
		window.removeEventListener("resize", lazyBlur);
		window.removeEventListener("scroll", lazyBlur);
		}
	}

	function checkVisible(elm) {
		var rect = elm.getBoundingClientRect();
		console.log("Elm is at top: " + rect.top);
		if (rect.top < window.innerHeight){
			return true;
		}
		//var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		//return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	}

/*	function checkVisible(el) {
	    var elemTop = el.getBoundingClientRect().top;
	    var elemBottom = el.getBoundingClientRect().bottom;

	    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
	    return isVisible;
	}*/

	// Initialize on pageLoad
	lazyBlur();

})();


/* 
1. Load tiny's on pageload
2. Check if image is in view on pageload.
3. Check if image is in view on scroll/resize.
4. Load large image
5. After loading, replace src tag with large one
6. Blur out to high res picture
*/