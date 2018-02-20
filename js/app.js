'usage strict';
console.log('We have signal!');
// Data+++++++++++++++++++++++++++++++++++++++++++++++++++++
// total clicks array
var totalClicks = [];
Product.allProducts = [];

// global vars for DOM
var pick1 = document.getElementById('one');
var pick2 = document.getElementById('two');
var pick3 = document.getElementById('three');

// constuctor
function Product(name, alt, filepath) {
  this.name = name;
  this.alt = alt;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
  console.log('Look! I made a ' + this.name + '!');
}

// Object Instances
function instProducts() {
  new Product('Bag','Bag','img/bag.jpg');
  new Product('Banana', 'Banana', 'img/banana.jpg');
  new Product('Bathroom', 'Bathroom', 'img/bathroom.jpg');
  new Product('Boots', 'Boots', 'img/boots.jpg');
  new Product('Breakfast', 'Breakfast', 'img/breakfast.jpg');
  new Product('Bubblegum', 'Bubblegum', 'img/bubblegum.jpg');
  new Product('Chair', 'Chair', 'img/chair.jpg');
  new Product('Cthulhu', 'Cthulhu', 'img/cthulhu.jpg');
  new Product('Dog Duck', 'Dog Duck', 'img/dog-duck.jpg');
  new Product('Dragon', 'Dragon', 'img/dragon.jpg');
  new Product('Pen', 'Pen', 'img/pen.jpg');
  new Product('Pet Sweep', 'Pet Sweep', 'img/pet-sweep.jpg');
  new Product('Scissors', 'Scissors', 'img/scissors.jpg');
  new Product('Shark', 'Shark', 'img/shark.jpg');
  new Product('Sweep', 'Sweep', 'img/sweep.png');
  new Product('Tauntaun', 'Tauntaun', 'img/tauntaun.jpg');
  new Product('Unicorn', 'Unicorn', 'img/unicorn.jpg');
  new Product('Usb', 'Usb', 'img/usb.gif');
  new Product('Water Can', 'Water Can', 'img/water-can.jpg');
  new Product('Wine Glass', 'Wine Glass', 'img/wine-glass.jpg');
  console.log('Products instantiated.');
}

// Function Declarations++++++++++++++++++++++++++++++++++++
// global vars for DOM
// var pick1 = document.getElementById('one');
// var pick2 = document.getElementById('two');
// var pick3 = document.getElementById('three');

// random()
function randomProducts() { //add no-duplicate feature later
  var pickArray = [];
  for (var i = 0; i < 3; i++) {
    var randProd = Math.floor(Math.random() * Product.allProducts.length);
    pickArray.push(randProd);
  }
  console.log('Index positions from random function: ' + pickArray);
  console.log('Random product picks: ' + Product.allProducts[pickArray]);
  return pickArray;
}
function AttrToImg() {
  var pick123 = randomProducts();
  console.log(pick123, 'pick123');
  console.log(Product.allProducts[pick123[0]]);
  // Assign the src, alt, and title attributes to the <img> element
  // Make these into functions to call here for better readability and less lines
  pick1.src = Product.allProducts[pick123[0]].filepath;
  pick1.alt = Product.allProducts[pick123[0]].alt;
  pick1.title = Product.allProducts[pick123[0]].name;

  pick2.src = Product.allProducts[pick123[1]].filepath;
  pick2.alt = Product.allProducts[pick123[1]].alt;
  pick2.title = Product.allProducts[pick123[1]].name;

  pick3.src = Product.allProducts[pick123[2]].filepath;
  pick3.alt = Product.allProducts[pick123[2]].alt;
  pick3.title = Product.allProducts[pick123[2]].name;

  console.log(pick123.name, 'is being displayed');
}
// test for dupes()

// display pages ()

// show results ()

// click handler ()


// Executing Code+++++++++++++++++++++++++++++++++++++++++++
instProducts();
// console.table(Product.allProducts);
// console.table(totalClicks);
AttrToImg();
// show images on page

// event listener(s)
// Now we need to listen for clicks on the product and then display a new product
pick1.addEventListener('click', AttrToImg);