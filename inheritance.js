function Human(name, age){
    this.name = name;
    this.age = age;
}
Human.prototype.planet = 'earth';
Human.prototype.about = function() {
    return this.name + ' lives on ' + this.planet + ' at the age of ' + this.age;
};



function Male(name, age) {
    Human.call(this, name, age);
}
Male.prototype = Object.create(Human.prototype);
Male.prototype.constructor = Male;
Male.prototype.sex = 'male';




function Female(name, age) {
    Human.call(this, name, age);
}
Female.prototype = Object.create(Human.prototype);
Female.prototype.constructor = Female;
Female.prototype.sex = 'female';




var john = new Male('john', 33);
console.log(john.about()); // john lives on earth at the age of 33
console.log(john.sex); // male

var yoko = new Female('yoko', 23);
console.log(yoko.about()); // yoko lives on earth at the age of 23
console.log(yoko.sex); // female