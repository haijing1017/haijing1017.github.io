var width = 960,
    height = 500;

var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

// d3 geopath for projection
var path = d3.geoPath()
    .projection(projection);

// create SVG elements in map HTML element
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

// set color
var color = d3.scaleThreshold()
    .domain([-0.5, -0.25, -0.1, 0, 0.1, 0.25, 0.5])
    .range(['#eff3ff','#bdd7e7','#6baed6','#2171b5','#fee5d9','#fcae91','#fb6a4a','#cb181d']);

// queue up the datasets, run 'ready' when loaded
d3.queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.csv, "data/election_2016_county_results.csv")
    .await(ready);

// create the graphic with this runction
function ready(error, us, election_2016_county_results) {
  if (error) throw error;

  var rateById = {}; // Create empty object for holding dataset
 election_2016_county_results.forEach(function(d) {
    rateById[d.id] = d.victory_margin; // Create property for each ID, give it value from rate
    // important: cast rate to numeric value (+)
  });
  console.log(rateById);
  
  // create and style counties
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { return color(rateById[d.id]); });

  // create state outlines
  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; }))
      .attr("class", "states")
      .attr("d", path);
}