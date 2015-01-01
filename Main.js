var boids = new Array();

var numberOfBoids = 2;

for (i = 0; i < numberOfBoids; i++)
    boids.push(new Boid());

console.log("Boids in array: " + boids.length);

var W, H;
var dt = 10.1;
var pause = 0;

var running = false;

var canvas = document.getElementById("myCanvas");

var baryCenterFraction = 4000;
var repulsionFraction = 4000;
var matchVelocityFraction = 4000;
var maxVelocity = 0.4;

W=640;
H=480;

canvas.width = W;
canvas.height = H;

var ctx = canvas.getContext('2d');

// bind event handler to clear butto
var buttonRun = document.getElementById('btnRun');

var rangeBoids = document.getElementById("rngBoids");

var labelNoBoids = document.getElementById("noBoids");

var rangeDeltaT = document.getElementById("rngDeltaT");
var labelDeltaT = document.getElementById("rngDeltaTValue");

rangeDeltaT.onchange = function(event)
{
    dt = rangeDeltaT.value;
    labelDeltaT.innerHTML = dt;
}

var rangeBoidsBaryCenterAttraction = document.getElementById("rngBoidsBaryCenterAttraction");
var labelBoidsBaryCenter = document.getElementById("rngBaryCenterValue");

rangeBoidsBaryCenterAttraction.onchange = function(event)
{
    baryCenterFraction = rangeBoidsBaryCenterAttraction.value;
    labelBoidsBaryCenter.innerHTML = baryCenterFraction;
}

var rangeRepulsionForce = document.getElementById("rngRepulsion");
var labelRepulsionValue = document.getElementById("rngRepulsionValue");

rangeRepulsionForce.onchange = function(event)
{
    repulsionFraction = rangeRepulsionForce.value;
    labelRepulsionValue.innerHTML = repulsionFraction;
}

var rangeMatchVelocity = document.getElementById("rngMatchVelocity");
var labelMatchVelocity = document.getElementById("rngMatchVelocityValue");

rangeMatchVelocity.onchange = function(event)
{
    matchVelocityFraction = rangeMatchVelocity.value;
    labelMatchVelocity.innerHTML = matchVelocityFraction;
}
    
var rangeMaxVelocity = document.getElementById("rngMaxVelocity");
var labelMaxVelocity = document.getElementById("rngMaxVelocityValue");

rangeMaxVelocity.onchange = function(event)
{
    maxVelocity = rangeMaxVelocity.value;
    labelMaxVelocity.innerHTML = maxVelocity;
}
    


buttonRun.onclick = function(event)
{
    running = !running;
}

rangeBoids.onchange = function(event)
{
    //reinit boids number;
    var newRagne = rangeBoids.value;
    
    var diff = newRagne - numberOfBoids;
    if (diff > 0) // add new boids;
    {
        for (i = 0; i < diff; i++)
        {
            console.log("diff = " + diff + " adding " + i);
            boids.push(new Boid());
        }
    }
    
    if (diff < 0)
    {
        for (i = 0; i < -diff; i++)
        {
            console.log("diff = " + (-diff) + " removing " + i);
            boids.pop();
        }
    }
    
    
    //console.log("value = " + rangeBoids.value);
    numberOfBoids = boids.length;
    labelNoBoids.innerHTML = numberOfBoids;
}

canvas.onmousedown = function(event)
{
    pause = 1;
}

canvas.onmousemove = function(event)
{
    if(pause)
    {
        MoveFlockToPointerPosition(event, canvas, boids);  
    }
}

canvas.onmouseup = function(event) 
{
    pause = 0;
}

function init()
{
    InitPositions(boids, W, H);
}

loop = function() 
{

    if (running)
    {

        if (!pause)
        {
            UpdatePositions(boids, dt, 
                            baryCenterFraction,
                           repulsionFraction,
                           matchVelocityFraction,
                           maxVelocity);
        }

        BoundFlock(boids, W, H);

        // clear canvas
        ctx.clearRect(0, 0, W, H);

        //rysowanie punktu
        ctx.lineWidth = 6;

        DrawFlock(ctx, boids);

    }
    
    //call the redraw
    requestAnimationFrame(loop);

}    