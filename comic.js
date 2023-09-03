
window.addEventListener('load', function(){
	let strips = document.getElementsByClassName("strip-img");
	for(let i = 0; i<strips.length; i++) {
		let strip = strips[i];
		let stripNumber = strip.dataset.strip;

		strip.src = "comics/" + stripNumber + ".png";
	}

	let search = window.location.search;
	const params = new URLSearchParams(search);
	if(params.get("strip")){
		let strip = document.getElementById("strip");
	
		strip.src = "comics/" + params.get("strip") + ".png";	

		strip.dataset.strip = params.get("strip");
	}

	let last = document.getElementById("last");
	let next = document.getElementById("next");

	let strip = document.getElementById("strip").dataset.strip;
	fetch("comics/"+(parseInt(strip, 10) + 1)+".png")
			.then((a) => {
				if(a.status != 404){
					next.addEventListener("click", function() {
						let strip = document.getElementById("strip").dataset.strip;
						
						window.location = "?strip=" + (parseInt(strip, 10) + 1);
					});
				}
			});

	last.addEventListener("click", function() {
		let strip = document.getElementById("strip").dataset.strip;

		if((parseInt(strip, 10) - 1) <= 0) {
			return;
		}

		window.location = "?strip=" + (parseInt(strip, 10) - 1);
	});
});

