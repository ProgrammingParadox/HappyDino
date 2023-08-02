
// Only took a bunch of work- but it works!!
// https://replit.com/@Paradoxian/Bennetts-lazy

// needs some more work

const SPRING_TARGET = 5;

// spring physikz
function springv(x, xv, a, b, target=0){
	xv *= a;
	xv += (target-x) * b;

	return xv;
}

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
	// load nav bar into body
	fetch("../nav.html")
		.then((d) => d.text())

		// parse and load
		.then((d) => {
			const parser = new DOMParser();
			const navBar = 
				parser.parseFromString(d, "text/html")
				.getElementById("nav");

			document.getElementById("nav-holder").appendChild(navBar);

			return navBar;
		})
	
		// Initialize nav bar items
		.then((d) => {

			let page = document.getElementById("nav-holder").dataset.page;
						
			let navItems = document.querySelectorAll(".nav-item");
			for(let i = 0; i<navItems.length; i++){
				let c = navItems[i];
				let n = c.querySelectorAll(".nav-item-name")[0];
				
				// active
				(n.dataset.page == page) ?
					n.classList.add("active")
				:
					n.classList.remove("active");
			
				// click
				c.addEventListener("click", function(e){
					window.location = n.dataset.link;
				});
				
				const mediaQuery = window.matchMedia('(max-width: 500px)');
				if (mediaQuery.matches) {
					console.log(mediaQuery);
					
				  continue;
				}
				
				if(n.classList.contains("active")){
					// n.style.marginBottom = (SPRING_TARGET + 10) + "px";
			
					continue;
				}
				
				// boingy
				c.addEventListener("mouseenter", function(){
					let e = n;
					let spring = [0, 0, 0.8, 0.2];
					
					function animate(){
						spring[1] = springv.apply(null, spring.concat(10));
						spring[0] += spring[1];
						
						e.style.marginBottom = (SPRING_TARGET + spring[0]) + "px";
			
						if(Math.abs(spring[1]) > 0.00001){
							window.requestAnimationFrame(animate);
						}
					};
			
					animate();
				});
				c.addEventListener("mouseleave", function(){
					let e = n;
					let spring = [10, 0, 0.8, 0.2];
					
					function animate(){
						spring[1] = springv.apply(null, spring.concat(0));
						spring[0] += spring[1];
						
						e.style.marginBottom = (SPRING_TARGET + spring[0]) + "px";
			
						if(Math.abs(spring[1]) > 0.00001){
							window.requestAnimationFrame(animate);
						}
					};
			
					animate();
				});
			}
			
			return d;
		})

		// make a space for our floating navbar here
		// so it doesn't cover up any content
		.then((d) => {
			let nav = document.getElementById("nav");
			let navHolder = document.getElementById("nav-holder");
		
			let navBB = nav.getBoundingClientRect();
		
			navHolder.style.height = navBB.height + "px";

			return d;
		});

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
