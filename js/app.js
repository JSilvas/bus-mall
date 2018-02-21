'usage strict';
console.log('We have signal!');
//++++++++++++++++++++++++++++++
// SETTING UP GLOBAL DATA
//++++++++++++++++++++++++++++++
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Product.allProducts = []; // Array of all Product instances
Product.viewed = []; // Holds previously viewed image set
Product.totalClicks = 0; // Counter for 25 cycles

// ChartJS global data
var ctx = document.getElementById('bar-chart');

// global vars for DOM access
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
for (var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}
console.table(Product.allProducts);

//++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
//++++++++++++++++++++++++++++++
/* function randomPics() { // Returns an array of 3 unique pics
  var pickArray = [];
  while (pickArray[0] === pickArray[1] || pickArray[0] === pickArray[2] || pickArray[1] === pickArray[2]) {
    pickArray = [];
    for (var i = 0; i < 3; i++) {
      var random = Math.floor(Math.random() * Product.allProducts.length);
      pickArray.push(random);
    }
  }
  return pickArray;
} */
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
    console.log(current,'before for');
    Product.pics[i].src = Product.allProducts[current].path;
    Product.pics[i].alt = Product.allProducts[current].name;
    Product.pics[i].title = Product.allProducts[current].name;
    Product.allProducts[current].views += 1;
    console.log(current,'after for');
  }
  console.log('Viewed array: ' + Product.viewed);
}

function clickHandler(event) { // Add real-time answer counter here
  if (event.target === Product.survey) {
    return alert('Please select an image!');
  }
  console.log('total clicks: ' + Product.totalClicks);
  if (Product.totalClicks > 24) {
    Product.survey.removeEventListener('click', clickHandler);
    Product.survey.style.display = 'none';  //removes survey container from page
    barChart();
  }
  Product.totalClicks += 1; // this might be adding to clicks whether you click a picture or not??
  for (var i = 0; i < Product.names.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
      console.log(event.target.alt + ' has: ' + Product.allProducts[i].votes + ' votes and ' + Product.allProducts[i].views + ' views.');
    }
  }
  // Adding Visual Counter element on index
  // var h3El = document.getElementById(answered);
  // liEl.textContent = Product.
  showPics();
}

function showResults() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');
    var conversion = (Product.allProducts[i].votes / Product.allProducts[i].views * 100).toFixed(1);
    liEl.textContent = Product.allProducts[i].name + ' has ' + Product.allProducts[i].votes + ' votes in ' + Product.allProducts[i].views + ' views  for a click-through conversion rate of ' + conversion + '%';

    if (conversion > 50) {
      liEl.style.color = 'white';
      liEl.style.backgroundColor = 'green';
    }

    if (conversion < 30) {
      liEl.style.color = 'white';
      liEl.style.backgroundColor = 'red';
    }

    Product.results.appendChild(liEl);
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.6.0
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++
function barChart() {
  var ctx = document.getElementById('bar-chart').getContext('2d');
  var votes = [];
  for (var i = 0; i < Product.allProducts.length; i++) {
    votes[i] = Product.allProducts[i].votes;
  }
  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
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
showPics();
Product.survey.addEventListener('click', clickHandler);