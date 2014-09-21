// Our local javascript file - this is where we write our code


// A function that we can call on startup
var startupFunction = function (message) {
    console.log("The message is: " + message);
};
var myMessage = "The startup function has been called";
//Uncomment the beginning of the next line to call the startupFunction
//startupFunction(myMessage); 


//Now modify your startupFunction above to create an alert with a new message
//HINT - use the function: alert("message");



//Below is a function that uses d3 to change the background colour of the page.
//Write a line of code that calls the function with the colour.

var changePageColour = function(colour) {
    console.log("Changing page colour to: " + colour);
    d3.select("body").style("background-color",colour);
}


// Let's try creating an SVG canvas and adding a graphic object to it
var WIDTH = 400, HEIGHT = 300;
var drawCircle = function(data) {
    var svg = d3.select("#d3-svg").append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT);


    svg.append("circle")
        .attr("cx", 200)
        .attr("cy", 150)
        .attr("r", 100);

}

// When you display the circle, it will be black - how do we change it's colour?
// Experiment with changing it's size and position also.