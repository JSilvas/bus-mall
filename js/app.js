'use strict';
console.log('We have signal!');
//++++++++++++++++++++++++++++++
// SETTING UP GLOBAL DATA
//++++++++++++++++++++++++++++++
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Product.allProducts = []; // Array of all Product instances
Product.viewed = []; // Holds previously viewed image set
Product.totalClicks = 0; // Counter for 25 cycles

// Global vars for DOM access
Product.survey = document.getElementById('survey');
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.results = document.getElementById('results');

//++++++++++++++++++++++++++++++
// CONSTRUCTOR
//++++++++++++++++++++++++++++++
function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Product.allProducts.push(this);
}
//++++++++++++++++++++++++++++++
// INSTANCES
//++++++++++++++++++++++++++++++
function getInstances() {
  for (var i = 0; i < Product.names.length; i++) {
    new Product(Product.names[i]);
  }
}

//++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
//++++++++++++++++++++++++++++++
function getRandomPic() {
  return Math.floor(Math.random() * Product.names.length);
}

function showPics() {
  while (Product.viewed.length < 6) { // Check array for matching pics
    var rando = getRandomPic();
    while (!Product.viewed.includes(rando)) {
      Product.viewed.push(rando);
    }
  }
  for (var i = 0; i < 3; i++) {
    var current = Product.viewed.shift();
    Product.pics[i].src = Product.allProducts[current].path;
    Product.pics[i].alt = Product.allProducts[current].name;
    Product.pics[i].title = Product.allProducts[current].name;
    Product.allProducts[current].views += 1;
  }
  console.log('Viewed array: ' + Product.viewed);
}

function clickHandler(event) { // Add real-time answer counter here
  if (event.target === Product.survey) {
    return alert('Please select an image!');
  }
  Product.totalClicks += 1;
  console.log('total clicks: ' + Product.totalClicks);
  for (var i = 0; i < Product.names.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
      console.log(event.target.alt + ' has: ' + Product.allProducts[i].votes + ' votes and ' + Product.allProducts[i].views + ' views.');
    }
  }
  if (Product.totalClicks > 24) {
    Product.survey.removeEventListener('click', clickHandler);
    Product.survey.style.display = 'none'; //removes survey container from page
    localStorage.setItem('allProductsToLS', JSON.stringify(Product.allProducts)); // store current state
    barChart();
    console.log('Total clicks at end of survey: ' + Product.totalClicks);
  }
  showPics();
}

// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.7.1
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++
function barChart() {
  var ctx = document.getElementById('bar-chart').getContext('2d');
  var votes = [];
  for (var i = 0; i < Product.allProducts.length; i++) {
    votes.push(Product.allProducts[i].votes);
  }
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor:
        'cadetblue',
        borderColor:
          'blue',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

//++++++++++++++++++++++++++++++
// CODE THAT EXECUTES ON PAGE LOAD
//++++++++++++++++++++++++++++++
if (localStorage.allProductsToLS) {
  Product.allProducts = JSON.parse(localStorage.allProductsToLS); //   retrieve L.S. & assign to [{},{},{}]
} else {
  getInstances(); //  create instances from scratch
}

showPics();
Product.survey.addEventListener('click', clickHandler);