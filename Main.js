var boids = new Array();

for (i = 0; i < 5; i++)
    boids.push(new Boid());

console.log("Boids in array: " + boids.length);

var W, H;
var dt = 12.1;
var pause = 0;

var running = false;

var canvas = document.getElementById("myCanvas");

W=640;
H=480;

canvas.width = W;
canvas.height = H;

var ctx = canvas.getContext('2d');

// bind event handler to clear butto
var runbtn = document.getElementById('btnRun');
 
runbtn.onclick = function(event)
{
    running = !running;
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
            UpdatePositions(boids, dt);
        }

        BoundFlock(boids, W, H);

        // clear canvas
        ctx.clearRect(0, 0, W, H);

        //rysowanie punktu
        ctx.lineWidth = 6;

        DrawFlock(ctx, boids);

        //call the redraw
    }
    
    requestAnimationFrame(loop);

}    