function JSONreader(){

	var init = function (data) {
		if(!data){
			console.error("Invalid data");
		};

		var height = 200;
		var dataScale = 10;

		var paper = d3.select('.container').append('svg')
			.attr('width', 500)
			.attr('height', 300);

		var bindings = paper.selectAll()
			.data(data);

		bindings.enter().append("rect")
			.attr('x', function (d,i) {
				return i * 25;
			})
			.attr('y', function (d) {
				return height - d*dataScale;
			})
			.attr('width', 20)
			.attr('height', function (data) {
				return data*dataScale;
			});


	};

	var readJsonFromFile = function(filename, callback){
		d3.json(filename, function(err, d) {
		  callback(d.data);
		});
	};

	return Object.freeze({
		read: readJsonFromFile,
		draw: init
	});
};

var r = JSONreader();

r.read('data.json', function (data) {
	r.draw(data);
});