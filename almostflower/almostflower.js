var flowerDiagram = function() {
	
	function init(){
		var canvas = d3.select('.container').append('svg')
			.attr('height', window.innerHeight)
			.attr('width', window.innerWidth);

		function randomData() {
			data = [];
			for(var i = 0; i<4; i++){
				data.push({
					r:Math.floor(Math.min(((window.innerHeight/16)+(Math.random()*(3*window.innerHeight/16))), (window.innerWidth/16)+(Math.random()*(3*window.innerWidth/16))))
				});
			}
			return data;
		}

		var data = randomData();
		var node = canvas.selectAll().data(data).enter().append('g');
		
			node.append('circle')
			.style('fill-opacity', '0')
			.attr('r', window.innerHeight/2)
			.attr('cx', window.innerWidth/2)
			.attr('cy', window.innerHeight/2)
			.transition().duration(2000)
			.attr('r', function(d){
				return d.r;
			})
			.attr('cx', function(d,i){
				switch (i) {
					case 1:
						return window.innerWidth/2+d.r;
						break;
					case 3:
						return window.innerWidth/2-d.r;
						break;
					default:
						return window.innerWidth/2;
				}
			})
			.attr('cy', function(d,i){
				switch (i) {
					case 0:
						return window.innerHeight/2-d.r;
						break;
					case 2:
						return window.innerHeight/2+d.r;
						break;
					default:
						return window.innerHeight/2;
				}
			});
			

			//Make a clippath in the group
			node.append('clipPath')
				//unique id for the node?
				.attr('id', function(d,i) {
					return "clip" + i;
				})
				//Define clippath with rect?
				.append('rect')
				.attr('x', function(d,i){
					switch (i) {
						// case 0:
						// 	return window.innerWidth/2;
						// case 1:
						// 	return window.innerWidth/2;
						// 	break;
						case 2:
							return (window.innerWidth/2)-d.r;
						case 3:
							return (window.innerWidth/2)-(d.r*2);
						default:
							return window.innerWidth/2;
					}
				})
				.attr('y', function(d,i){
					switch (i) {
						case 0:
							return (window.innerHeight/2)-(d.r*2);
							break;
						// case 1:
						// 	return window.innerHeight/2;
						// 	break;
						// case 2:
						// 	return window.innerHeight/2;
						// 	break;
						case 3:
							return (window.innerHeight/2)-d.r;
						default:
							return window.innerHeight/2;
					}
				})
				.attr('width', function(d,i){
					switch (i) {
						case 0, 2:
							return d.r;
							break;
						default:
							return d.r*2;
					}
				})
				.attr('height', function(d,i){
					switch (i) {
						case 1, 3:
							return d.r;
							break;
						default:
							return d.r*2;
					}
				});

			node.append('circle')
				.attr('clip-path', function(d,i){
					return 'URL(#clip' + i + ')';
				})
				.attr('r', function(d){
					return d.r;
				})
				.attr('cx', function(d,i){
					switch (i) {
						case 1:
							return window.innerWidth/2+d.r;
							break;
						case 3:
							return window.innerWidth/2-d.r;
							break;
						default:
							return window.innerWidth/2;
					}
				})
				.attr('cy', function(d,i){
					switch (i) {
						case 0:
							return window.innerHeight/2-d.r;
							break;
						case 2:
							return window.innerHeight/2+d.r;
							break;
						default:
							return window.innerHeight/2;
					}
				})
				.style('fill', '#a50000')
				.style('fill-opacity', '.7');
	}
	return Object.freeze({init:init})
}

var flower = flowerDiagram();
flower.init();