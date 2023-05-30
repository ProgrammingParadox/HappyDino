
// Only took a bunch of work- but it works!!
// https://replit.com/@Paradoxian/Bennetts-lazy

const SPRING_TARGET = 50;

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

		console.log("hello");
		img.onerror = function() {console.log("Image failed!");};
	  img.onload = function(){
			// console.log("Here: " + img.width);

			img.src = URL.createObjectURL(blob);
			
	    ctx.drawImage(img, 0, 0);
	
			const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

			switch(split) {
				default:
				case 0:
					this.setAttribute("width", WIDTH);
					this.setAttribute("height", HEIGHT);

					ctx.drawImage(img, 0, 0);
				break;
					
				case 1: 
					this.setAttribute("width", WIDTH/2);
					this.setAttribute("height", (HEIGHT*2) + 50);
			
					canvas.style.width = "80%";
			
					ctx.fillStyle = "white";
					ctx.fillRect(0, 0, WIDTH, HEIGHT);
					
				  ctx.putImageData(imageData, 0, 0, 0, 0, (WIDTH/2) + MIDDLE_OFFSET, HEIGHT);
				  ctx.putImageData(imageData, -MIDDLE_OFFSET-WIDTH/2, HEIGHT + 50, WIDTH/2, 0, WIDTH, HEIGHT);
				break;
			}
	  };

		console.log("Golly gee");
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
			
			let navItemNames = document.querySelectorAll(".nav-item-name");
			for(let i = 0; i<navItemNames.length; i++){
				let c = navItemNames[i];

				// active
				(c.dataset.page == page) ?
					c.classList.add("active")
				:
					c.classList.remove("active");
		
				// boingy
				c.addEventListener("mouseenter", function(){
					let e = event.target;
					let spring = [0, 0, 0.8, 0.2];
					
					function animate(){
						spring[1] = springv.apply(null, spring.concat(10));
						spring[0] += spring[1];
						
						e.style.height = (SPRING_TARGET + spring[0]) + "%";
		
						if(Math.abs(spring[1]) > 0.00001){
							window.requestAnimationFrame(animate);
						}
					};
		
					animate();
				});
				c.addEventListener("mouseleave", function(){
					let e = event.target;
					let spring = [10, 0, 0.8, 0.2];
					
					function animate(){
						spring[1] = springv.apply(null, spring.concat(0));
						spring[0] += spring[1];
						
						e.style.height = (SPRING_TARGET + spring[0]) + "%";
		
						if(Math.abs(spring[1]) > 0.00001){
							window.requestAnimationFrame(animate);
						}
					};
		
					animate();
				});
		
				// click
				c.addEventListener("click", function(e){
					window.location = e.target.dataset.link;
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

	if(canvas) drawComic("./comics/1.png", canvas, 0);
	
	let lastWidth = window.innerWidth;
	window.addEventListener("resize", function(event){
		if(window.innerWidth < 650) {
			
		} else {
			
		}
	});
});
