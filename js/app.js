'usage strict';
console.log('We have signal!');
// Data+++++++++++++++++++++++++++++++++++++++++++++++++++++
// total clicks array
var totalClicks = [];
var allProducts = [];

// global vars for DOM

// constuctor
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
  console.log('Look! I made a ' + this.name + '!');
}

// instances
// new Choice('Cruisin goat', 'img/cruisin-goat.jpg');
new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulu', 'img/cthulu.jpg');
new Product('Dog Duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet Sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('Usb', 'img/usb.gif');
new Product('Water Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');

// var goatPic = document.getElementById('goat-pic');


// Function Declarations++++++++++++++++++++++++++++++++++++
// random()

// test for dupes()

// display pages ()

// show results ()

// click handler ()



// Executing Code+++++++++++++++++++++++++++++++++++++++++++
console.table(allProducts);
console.table(totalClicks);
// show images on page

// event listener(s)