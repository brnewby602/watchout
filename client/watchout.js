
var boardWidth = 420;
var boardHeight = 420;

var circleWidth = 10;
var circleHeight = 10;
var radius = 10;

// Return the distance between two objects
var getDistance = function(dx, dy, dx2, dy2) {
  var sum = Math.pow(dx2 - dx, 2) + Math.pow(dy2 - dy, 2);
  return Math.sqrt(sum);
};

// Moves the circle to new location based on drag events
var dragmove = function (d, i) {

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
    console.log('conflict');
  } else {
    console.log('not conflict');
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
var data = [{'x': boardHeight, 'y': boardWidth}];

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

  var circle = svg.selectAll('circle')
    .data(data, function(d) {
      d.x = Math.random() * boardHeight;
      d.y = Math.random() * boardWidth;
      return d; 
    });

  // Update the circle's class css
  circle.attr('class', 'enemy');
  // UPDATE
  circle.transition()
    .attr('cx', function (d) {
      //console.log(d);
      return d.x;
    })
    .attr('cy', function (d) {
      return d.y;
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
update(data);

// MOVABLE CIRCLE
// Get the circle that is updated by the mouse
var mouse = d3.select('svg');

movableCircle = mouse.selectAll('.mouse').data([1]);
movableCircle.enter()
  .append('circle')
  //.append('g')
  .attr('cx', function (d) { return d * 50; })
  .attr('cy', function (d) { return 50; })
  .attr('r', function (d) {
    return 10;
  }).style('fill', 'green')
  .call(dragNode);

// Update the circles every 2 seconds
setInterval(function () {
  // var newData = d3.shuffle(data);
  for (var i = 0; i < data.length; i++) {
    data.x = Math.random() * boardHeight;
    data.y = Math.random() * boardWidth;
  }

  update(data);
}, 5000);

















