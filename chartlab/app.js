var charter = function () {
	var containerHeight = 800;
	
	var init = function () {
		 var paper = d3.select('.container').append("svg")
			.attr("width", $(window).width())
			.attr("height", containerHeight);

		
		var data = randomData();

		var dataBindings = paper.selectAll()
			.data(data);

		dataBindings.enter().append('rect')
			.attr('width', 100)
			.attr('fill', "black")
			.attr('height', function (d) {
				return d;
			})
			.attr('x', function (d, index) {
				return index * 110;
			})
			.attr('y', containerHeight)
			.transition().duration(400)
			.attr('y', function (d) {
				return containerHeight - d; // because origin is at top of page
			})
	};

	var randomData = function () {
		var data = [];

		for (var i = 0; i < 14; i++) {
			data.push(
				Math.floor(Math.random() * containerHeight * 0.8)
			);
		};

		return data;
	};

	var update = function () {
		var paper = d3.select('.container svg').transition();
		var newData = randomData();

		paper.selectAll('rect')
			.duration(400)
			.attr('y', function (d,i) {
				return newData[i];
			})
			.attr('height', function (d,i) {
				return newData[i];
			})
			.attr('width', function (d,i) {
				return newData[i];
			})

	}

	return Object.freeze({init:init,update:update});
}

var c = charter();

// setInterval(function () {
// 	c.update();
// }, 400);

c.init();