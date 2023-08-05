
function drawComic(path, canvas, split) {
	let WIDTH = 5046;
	let HEIGHT = 1226;
	
	let MIDDLE_OFFSET = 25;

	let renderImage = function(blob, split){
	  let ctx = this.getContext('2d');
	  let img = new Image();

		img.src = URL.createObjectURL(blob);

		img.onerror = function() { console.log("Image failed! Whoops :/"); };
	  img.onload = function() {
			canvas.setAttribute("width", WIDTH);
			canvas.setAttribute("height", HEIGHT);
			
	    ctx.drawImage(img, 0, 0);
	
			const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

			switch(split) {
				default:
				case 0:
					canvas.style.width = "80%";
					
					canvas.setAttribute("width", WIDTH);
					canvas.setAttribute("height", HEIGHT);

					ctx.drawImage(img, 0, 0);
				break;
					
				case 1: 
					canvas.style.width = "80%";
					
					canvas.setAttribute("width", WIDTH/2);
					canvas.setAttribute("height", (HEIGHT*2) + 50);
			
					ctx.fillStyle = "white";
					ctx.fillRect(0, 0, WIDTH, HEIGHT);
					
				  ctx.putImageData(imageData, 0, 0, 0, 0, (WIDTH/2) + MIDDLE_OFFSET, HEIGHT);
				  ctx.putImageData(imageData, -MIDDLE_OFFSET-WIDTH/2, HEIGHT + 50, WIDTH/2, 0, WIDTH, HEIGHT);
				break;
			}
	  };
	};

	if(canvas){							 
		fetch(path)
			.then((blarb) => {
				return blarb.blob();
			})
			.then((blag) => {
				renderImage.call(canvas, blag, split);
			});
	}
}

window.addEventListener("load", function(){
	let canvas = document.getElementById("strip");

	// makes the comic responsive so 
	// on phones it's not too small
	if(canvas) {
		let lastWidth = window.innerWidth;
		if(window.innerWidth < 650) {
			drawComic("./comics/1.png", canvas, 1);
		} else {
			drawComic("./comics/1.png", canvas, 0);
		}
				
		window.addEventListener("resize", function(event){
			if(lastWidth >= 650 && window.innerWidth < 650) {
				drawComic("./comics/1.png", canvas, 1);
			} else if (lastWidth <= 650 && window.innerWidth > 650) {
				drawComic("./comics/1.png", canvas, 0);
			}

			lastWidth = window.innerWidth;
		});
	}
});
