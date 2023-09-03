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
		
			//navHolder.style.height = navBB.height + "px";

			let logo = document.getElementById("logo");
			logo.setAttribute("width", 100)

			return d;
		});
});