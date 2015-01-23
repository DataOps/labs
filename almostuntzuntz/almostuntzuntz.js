var barchart = function () {

	//Set up fullscreen to work on.
	function init () {
		var paper = d3.select('.container').append('svg')
			.attr('width', window.innerWidth)
			.attr('height', window.innerHeight);

		var data = randomData(nrOfBars);
		var bar	 = paper.selectAll().data(data);

		//Bind data
		bar.enter()
			.append('rect')
				.attr('width', 30)
				.attr('height', 0)
				.attr('x', function (d) {
					return d.x + calculateMid(data);
				})
				.attr('y', function (d) {
					return window.innerHeight;
				})
				.style('fill', 'black')
				.style('stroke', '1')
				.transition().duration(200)
				.attr('height', function (d) {
					return d.height;
				})
				.attr('y', function (d) {
					return window.innerHeight - d.height;
				});
	};

	//Generates array with values for each bar.
	function randomData (bars) {
		var data = [];
		for (var i = 0; i < bars; i++) {
			data.push({
				height:Math.floor(Math.random()*window.innerHeight),
				x:35*i
			});
		}
		return data;
	};

	function calculateMid (data) {
		return window.innerWidth/2 - data.length*35/2;
	};

	//Recalculate new data for data[]
	var recal = function () {
		var transSvg = d3.select('.container svg').transition();
		var data = randomData(nrOfBars);

		transSvg.selectAll('rect')
			.duration(200)
			.attr('height', function (d, i) {
				return data[i].height;
			})
			.attr('y', function (d, i) {
				return window.innerHeight - data[i].height;
			});
	};

	return Object.freeze({init:init, recal:recal});
};

var nrOfBars = Math.random()*10 + 20;
var chart = barchart();
chart.init();

//Start and stop the untz
var interval = setInterval(chart.recal, 200);
$('.container').on('click', function () {
	if (interval != null) {
		clearInterval(interval);
		interval = null;
	}
	else {
		interval = setInterval(chart.recal, 200);
	}
});