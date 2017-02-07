function Figure(sides) {
	if (Array.isArray(sides)) 
		this.sides = sides
	else
		this.sides = Array.prototype.slice.call(arguments);
}

Figure.prototype.perimeter = function () {
    var perim = 0;
    if (this.sides.length <= 2) {
        console.log('num of sides must be > 2');
    }else {
        for (var i = 0; i < this.sides.length; i++) {
            perim += this.sides[i]
        }
    }
    return perim;
};

var triangle = new Figure(3,2,5);
console.log(triangle.perimeter());