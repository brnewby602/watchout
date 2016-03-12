
// SIZE OF THE BOARD
var boardWidth = 420; 
var boardHeight = 420;
// SIZE OF CIRCLE ON BOARD
var circleWidth = 10;
var circleHeight = 10;
var radius = 10;

// SCORE DATA, FUNCTIONS,  AND VARIABLES
var scoredata = [0, 0, 0];
var startScore = false;
var updateScoreBoard = function(scoredata) {
  var score = d3.select('.scoreboard').selectAll('div span').data(scoredata);

  score.text(function(d, i) { 
    return d; 
  });
};
// Initialize score
updateScoreBoard(scoredata);

// MOUSE DATA, FUNCTIONS, AND VARIABLES
var mouseData = [{x: 100, y: 100}];



// Return the distance between two objects
var getDistance = function(dx, dy, dx2, dy2) {
  var sum = Math.pow(dx2 - dx, 2) + Math.pow(dy2 - dy, 2);
  return Math.sqrt(sum);
};
var collideOnce = false;
// Moves the circle to new location based on drag events
var dragmove = function (d, i) {


  startScore = true;

  var dx = Math.max(0, Math.min(boardWidth - circleWidth, d3.event.x));
  var dy = Math.max(0, Math.min(boardHeight - circleHeight, d3.event.y));
  var conflict = false;
  
  //var yConflict = false;

  var enemyData = svg.selectAll('circle.enemy').data();
  for (var i = 0; i < enemyData.length; i++) {
    if (getDistance(dx, dy, enemyData[i].x, enemyData[i].y) < 2 * radius) {
      conflict = true;
    }
  }

  if (conflict) {
    if (scoredata[1] > scoredata[0]) {
      scoredata[0] = scoredata[1];
    }

    if (!collideOnce) {
      scoredata[2] += 1;
    }

    collideOnce = true;
    scoredata[1] = 0;
    
    updateScoreBoard(scoredata);
  } else {
    if (collideOnce) {
      collideOnce = false;
    }
  }

  d3.select(this)
      .attr('cx', d.x = Math.max(0, Math.min(boardWidth - circleWidth, d3.event.x)));
  d3.select(this)
      .attr('cy', d.y = Math.max(0, Math.min(boardHeight - circleHeight, d3.event.y)));
  
};


// Event handler for dragging circle on the board
var dragNode = d3.behavior.drag()
  .on('drag', dragmove);

// Initial data for circles
var data = [{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth},
{'x': Math.random() * boardHeight, 'y': Math.random() * boardWidth}


];

// ADD SVG CIRCLES BASED ON AMOUNT OF DATA
var svg = d3.select('.board')
  .append('svg:svg')
  .attr('width', boardWidth)
  .attr('height', boardHeight);

// Update function for updating the location of the circles
// Updates the location of the circles on the screen
var update = function (data) {
  // DATA JOIN
  // Join new data with old data
  // console.log(data);

  var circle = svg.selectAll('circle.enemy')
    .data(data);

  // Update the circle's class css
  circle.attr('class', 'enemy');
  // UPDATE
  circle.transition().duration(3000)
    .attr('cx', function (d) {
      //console.log(d);
      return d.x;
    })
    .attr('cy', function (d) {
      return d.y;
    })
    .tween('custom', function(elementData, elementIndex) {
      // will be called for each enemy as they are moving
      return function() {
      // retrieve x and y coordinates
        var enemyX = this.cx.animVal.value;
        var enemyY = this.cy.animVal.value;
        // retrieve movableMouse object and its x and y coordinates
        var mouseCircleData = svg.selectAll('.mouse').data();
      };
      // call getDistance to determien if a collision has occurred
      // if collision
    });
  
  // EXIT

  // ENTER
  circle.enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 10);

  // Remove old elements as needed
  // circle.exit().remove();


};

// Call the initial update
// update(data);
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutationRecord) {
//     console.log('change occured');
//   });
// });

// var target = document.getElementsByClassName('enemy');
// observer.observe(target, {attributes: true, attributeFilter: ['style']});

// MOVABLE CIRCLE
// Get the circle that is updated by the mouse
var mouse = d3.select('svg');

movableCircle = mouse.selectAll('.mouse').data(mouseData);
movableCircle.enter()
  .append('circle')
  .attr('class', 'mouse')
  //.append('g')
  .attr('cx', function (d) { return d.x; })
  .attr('cy', function (d) { return d.y; })
  .attr('r', function (d) {
    return 10;
  }).style('fill', 'green')
  .call(dragNode);

// Update the circles every 2 seconds
setInterval(function () {
  // var newData = d3.shuffle(data);
  for (var i = 0; i < data.length; i++) {
    data[i].x = Math.random() * boardHeight;
    data[i].y = Math.random() * boardWidth;
  }

  update(data);
}, 1000);

setInterval(function() {

  if (startScore) {
    scoredata[1] += 1;
    updateScoreBoard(scoredata);
  }

}, 500);
















