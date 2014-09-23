// Our first d3.js code

//Our data for these examples - try changing these values and see what happens
var data = [20,30,40,50,60,70,80,90,100];

/*
We're mostly interested in drawing graphics, but we can actually use d3 to
modify other elements in the DOM. What is going to be one of the most important
features of d3 is the ability to select multiple elements at a time and perform
some operation to all of them. We can even instruct d3 to create elements that
are not there based on our data set. Take a look at this code...
*/

var indexAndValue = function(d,i) {
                    return "The value at index "+i+" is "+d;
                    }
//Uncomment the code below to see how this function works
/*
d3.select("#textManipulation").selectAll("p")
    .data(data)
    .enter()
    .append("p")
    .text(indexAndValue);
*/

/*To illustrate this point further, let's add stripes to our list of links. Uncomment the
code below to get the browser to execute the code. This time, instead of declaring the
function separately as above, we've put it inline - it makes the code more compact, but
it also makes it harder to read.
*/

d3.select("#textManipulation").selectAll("p")
    .style("background-color", function(d,i) {return i % 2 ? "#edf" : "#aac";});


/*
Let's create some SVG graphics as this is how most of our data visulations will be done.
We create the SVG canvas by selecting our <div id="svgcanvas"></div> 
and putting an <svg></svg> element inside it. This svg element tells the browser how to
draw our graphics.
*/

//Canvas size
var WIDTH = 500, HEIGHT = 300;

var svg = d3.select("#svgcanvas").append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT); 

//Create circles for our data - note that 0,0 is top left and that 400,300 is bottom right.

svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d,i) {return (WIDTH/(data.length+1)) * (i+1);})
    .attr("cy", HEIGHT/2)
    .attr("r", function(d) {return d/2;})
    .style("fill",  function(d) { return "rgb("+ (d+50) +","+(d*2)+","+(d*1.4)+")"; });

/* 
NOTE: When we need to modify the style dynamically, like in the code above, then we can
use the style method of d3. Otherwise, it's better to do the styling with CSS.
*/



