var w = 500;
var h = 200;
var barPadding = 1;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

createGraph();


document.getElementById("gen").addEventListener("click", function() { 
	var size = Math.round(Math.random()*40);
	dataset = [];
	for(i = 0; i < size; i++){
		dataset.push(Math.round(Math.random() * 50));
	}
	d3.select("svg").remove();
	createGraph();
});

function createGraph () {
	

	//Create SVG element
	var svg = d3.select("body")
	            .append("svg")
	            .attr("width", w)
	            .attr("height", h);

	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		
		.attr("x", function(d, i) {
	    	return i * (w / dataset.length);
	 	})
		.attr("y", function (d) {
			return h - (d * 4);
		})
		.attr("width", w / dataset.length - barPadding)
		.attr("height", function (d) {
			return d * 4;
		})
		.attr("fill", "rgba(0,0,0,1)")
		.transition().duration(1000)
		.attr("fill", function(d) {
	    	return "rgba(0, 0, 0, " + 10/d + ")";
		});

	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function (d) {
			return d;
		})
		.attr("x", function(d, i) {
	        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
	    })
	    .attr("y", function(d) {
	        return h - (d * 4) + 15;              // +15
	    })
	    .attr("font-family", "sans-serif")
	    .attr("font-size", "11px")
	    .attr("fill", "white")
	    .attr("text-anchor", "middle");
	
}

