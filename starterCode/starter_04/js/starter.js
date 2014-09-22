/* Working from our previous 12 points of sales data, this chart adds a path to create a line graph.
*/

// Add some margins so that there is space around the graphics
var WIDTH = 700, HEIGHT = 500;
var margin = {top: 20, right: 20, bottom: 20, left: 80};
var W = WIDTH - margin.left - margin.right;
var H = HEIGHT - margin.top - margin.bottom;

//Setup the SVG element
var svg = d3.select("#svgcanvas").append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT);

//This function is called when the data is loaded
var dataReady = function(error, data) {
    
    //Check that we actually got the data that we expected
    console.log("Data: "+JSON.stringify(data));
    console.log("Max: "+ d3.max(data, function(d) { return d.sales; }) );
    
    // Set the ranges (including the margins) - the domain is set once we have the data
    var x = d3.time.scale()
                .domain([new Date(2014,0,1), new Date(2014,11,31)])
                .range([margin.left, W]);
    var y = d3.scale.linear()
                .domain([0,d3.max(data, function(d) { return d.sales; })])
                .range([H, margin.top]);

    //Circle to mark the actual data points
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d,i) {return x(new Date(2014,i,1));})
        .attr("cy", function(d) {return y(d.sales);})
        .attr("r", 6)
        .style("fill","none")
        .style("stroke","red")
        .style("stroke-width","2");
    
    //A function for connecting data with a line
    var lineFunction = d3.svg.line()
        .x(function(d,i) {return x(new Date(2014,i,1));})
        .y(function(d) {return y(d.sales);})
        .interpolate("monotone");
    
    //Create the path by calling the lineFunction on our data
    svg.append("path")
        .attr("d", lineFunction(data))
        .attr("stroke","blue")
        .attr("stroke-width",2)
        .attr("fill","none");
    
    // Create the axes
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(d3.time.months)
        .tickSize(16,0)
        .tickFormat(d3.time.format("%b"));
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(7)
        .tickSize(16,0);
    
    // Add the axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + H + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(yAxis);
    
    // Add a title
    svg.append("text")
        .attr("class","chartTitle")
        .attr("x", W/2)
        .attr("y", margin.top)
        .attr("text-anchor","middle")
        .text("Sales by Month");
    
} // end dataReady function

//Load the data - the anon function ensure the type for sales is a number
d3.csv("data/myData.csv", function(d) { return {month: d.month, sales: +d.sales};}, dataReady);
