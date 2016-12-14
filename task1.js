// решить квадратное уровнение


var alert = console.log;

function discr(p1, p2, p3) {
    return p2 * p2 - 4 * p1 * p3;
}
function calcX1(p1, p2, p3) {
    return (-(p2) + Math.sqrt(p3)) / (2 * p1);
}
function calcX2(p1, p2, p3) {
    return (-(p2) - Math.sqrt(p3)) / (2 * p1);
}
function solve(a, b, c) {
    var d = discr(a, b, c);
    if (d < 0) {
        return {error: 'Дискриминант меньше нуля. Уравнение не имеет действительных корней'};
    }

    var x1 = calcX1(a, b, d);
    var x2 = calcX2(a, b, d);
    x1 = x1.toFixed(2);
    x2 = x2.toFixed(2);
    if (x1 == x2) {
        return {root: x1}
    }
    return {root1: x1, root2: x2};
}

var res = solve(3, 4, 5);
if (res.error) {
    alert('не решается!!!\r\n' + res.error)
} else if (res.root) {
    alert('решилось. 1 корень: ' + res.root)
} else {
    alert('решилось. 2 корня: ' + res.root1 + ' и ' + res.root2)
}
