/**
 * Базовый класс для геометрической фигуры
 * @param name название фигуры
 * @param edges грани фигуры
 * @constructor
 */
function Shape(name, edges){
    this.name = name;
    this.edges = edges;
}
Shape.prototype.getPerimeter = function() {
    if (this.edges) {
        var sum = 0;
        for (var i = 0; i < this.edges.length; i++) {
            sum += this.edges[i];
        }
        return sum;
    }
    throw new Error('Нет имплементации расчета периметра для "' + this.name + '"');
};
Shape.prototype.getSize = function() {
    throw new Error('Нет имплементации расчета площади для "' + this.name + '"');
};
Shape.prototype.info = function() {
    return 'Тип: ' + this.name + '. Периметр = ' + this.getPerimeter() + '. Площадь = ' + this.getSize();
};

/**
 * Класс для квадрата
 * @param edgeSize размер стороны квадрата
 * @constructor
 */
function Square(edgeSize) {
    Shape.call(this, 'квадрат', [edgeSize, edgeSize, edgeSize, edgeSize]);
}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.getSize = function() {
    return this.edges[0] * this.edges[1];
};

/**
 * Класс для прямоугольника
 * @param edgeSize1 первая сторона прямоугольника
 * @param edgeSize2 вторая сторона прямоугольника
 * @constructor
 */
function Rectangle(edgeSize1, edgeSize2) {
    Shape.call(this, 'прямоугольник', [edgeSize1, edgeSize2, edgeSize1, edgeSize2]);
}
Rectangle.prototype = Object.create(Square.prototype);


/**
 * Класс для круга
 * @param radius радиус круга
 * @constructor
 */
function Circle(radius) {
    Shape.call(this, 'круг');
    this.radius = radius;
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.getPerimeter = function() {
    var per = (2 * Math.PI * this.radius);
    return per.toFixed(2);
};
Circle.prototype.getSize = function() {
    var size = this.getPerimeter() * this.radius / 2;
    return size.toFixed(2);
};

var square = new Square(5);
console.log(square.info());

var rect = new Rectangle(2, 3);
console.log(rect.info());

var circle = new Circle(7);
console.log(circle.info());
