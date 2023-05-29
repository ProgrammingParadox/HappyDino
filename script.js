
const SPRING_TARGET = 50;

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
});
