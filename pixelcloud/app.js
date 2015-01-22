var pixelCloud = function (size) {

	function init () {
		// find the container element and prep it
		var paper = d3.select('.container').append("svg")
			.attr("width", size)
			.attr("height", size);

		// generate some random x,y coords
		var data = randomData(size);

		// apply the data
		var c = paper.selectAll()
			.data(data);


		// bind elements to the data, add a transition for when the data changes
		c.enter()
			.append("circle")
				.attr("r", function () {
					return Math.random()*2;
				})
				.attr('cx', function (d) {
					return (d.x > (size/2) ? d.x + (size/2) : d.x - (size/2));
				})
				.attr('cy', function (d) {
					return (d.y > (size/2) ? d.y + (size/2) : d.y - (size/2));
				})
				.style("fill", "black")
				.style("stroke", "1")
				.transition().duration(1000)
				.attr("cx", function (d,e) {
					return d.x;
				})
				.attr("cy", function (d,e) {
					return d.y;
				});
	}


	// generates random coordinates
	function randomData (diameter) {
		var data = [];

		for (var i = 0; i < 100; i++) {
			data.push({
				x:Math.floor(Math.random() * diameter),
				y:Math.floor(Math.random() * diameter)
			});
		};

		return data;
	};

	// re-randomize pixel cloud
	var reRender = function () {
		var paper = d3.select('.container svg').transition();
		var data = randomData(size);


		paper.selectAll("circle")
			.duration(2000)
			.attr("r", function () {
				return Math.random()*2;
			})
			.attr("cx", function (d,i) {
				return data[i].x;
			})
			.attr("cy", function (d,i) {
				return data[i].y;
			});
	};

	// Douglas Crockford object creation pattern
	return Object.freeze({init:init, reRender: reRender});
};

var size = Math.min($(window).height(), $(window).width());
var cloud = pixelCloud(size);

cloud.init();

$('.container').on('click', cloud.reRender);

