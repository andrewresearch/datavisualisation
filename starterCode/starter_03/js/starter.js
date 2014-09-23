/* When loading code from an external file, we need to split our javascript into 2 parts.
The first part does work while the file loads. The second part runs after the data loads.
We do this by putting those lines of code that require the data inside the load data function.
*/

// Add some margins so that there is space around the graphics
var WIDTH = 700, HEIGHT = 500;
var margin = {top: 20, right: 20, bottom: 20, left: 20};
var W = WIDTH - margin.left - margin.right;
var H = HEIGHT - margin.top - margin.bottom;

var diamondSize = 30;

//Setup the SVG element
var svg = d3.select("#svgcanvas").append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT);

// Set the ranges - the domain is set once we have the data
var x = d3.time.scale().range([0, W]);
var y = d3.scale.linear().range([H, 0]);


//This function is called when the data is loaded
var dataReady = function(error, data) {
    //Check that we actually got the data that we expected
    console.log("Data: "+JSON.stringify(data));
    console.log("Max: "+ d3.max(data, function(d) { return d.sales; }) );
    
    //set the domain for x and y
    y.domain([0,d3.max(data, function(d) { return d.sales; })]);
    x.domain([0,data.length]);

    //Circle to mark the actual data points
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d,i) {return x(i);})
        .attr("cy", function(d) {return y(d.sales);})
        .attr("r", 2)
        .style("fill","red");
    
    /*
    Let's try a diamond shape to represent the points:
    A diamond has 4 points with each point + or - on either x or y around
    the data point. Therefore we can work out a 10px diamond as follows:
        (x,y+5),(x+5,y),(x,y-5),(x-5,y)
    So firstly, we need a function to construct the points of the diamond,
    then we can use the polygon shape to display one for each point.
    
    Uncomment the following block to try it out...
    */
    
    var diamond = function(x,y,size) {
        var s = size/2;
        return(""+x+","+(y+s)+" "+
               ""+(x+s)+","+y+" "+
               ""+x+","+(y-s)+" "+
               ""+(x-s)+","+y);
    } // Should return a string in this format 0,5 5,0 0,-5 -5,0
    
    svg.selectAll("polygon")
        .data(data)
        .enter()
        .append("polygon")
        .attr("points", function(d,i) { return diamond(x(i),y(d.sales),diamondSize); })
        .attr("stroke", "green")
        .attr("stroke-width", "2")
        .attr("fill", "none");
    
    
} // end dataReady function

//Load the data - the anon function ensure the type for sales is a number
//d3.csv("filename", accessorFunction, callBackFunction);
d3.csv("data/myData.csv", function(d) { return {month: d.month, sales: +d.sales};}, dataReady);
