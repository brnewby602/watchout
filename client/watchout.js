
var boardWidth = 720;
var boardHeight = 720;

var circleWidth = 10;
var circleHeight = 10;

// Moves the circle to new location based on drag events
var dragmove = function (d, i) {
  d3.select(this)
      .attr('cx', d.x = Math.max(0, Math.min(boardWidth - circleWidth, d3.event.x)));
  d3.select(this)
      .attr('cy', d.y = Math.max(0, Math.min(boardHeight - circleHeight, d3.event.y)));
};

// Event handler for dragging circle on the board
var dragNode = d3.behavior.drag()
  .on('drag', dragmove);

// Initial data for circles
var data = [boardHeight, boardHeight, boardHeight, boardHeight];

// ADD SVG CIRCLES BASED ON AMOUNT OF DATA
var svg = d3.select('svg');

// Update function for updating the location of the circles
// Updates the location of the circles on the screen
var update = function (data) {
  // DATA JOIN
  // Join new data with old data
  var circle = svg.selectAll('circle')
    .data(data);

  // Update the circle's class css
  circle.attr('class', 'update');
  // UPDATE
  circle.transition()
    .attr('cx', function (d) {
      return Math.random() * d;
    })
    .attr('cy', function (d) {
      return Math.random() * d;
    });
  
  // EXIT

  // ENTER
  circle.enter().append('circle')
    .attr('class', 'enter')
    .attr('cx', function(d) {
      return d * Math.random();
    })
    .attr('cy', function(d) { return d * Math.random(); })
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
  //var newData = d3.shuffle(data);
  update(data);
}, 1000);