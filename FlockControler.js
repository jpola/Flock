function InitPositions (boids, x, y)
{
    for (b in boids)
    {
       boids[b].init(x, y);
    }
}


function BoundFlock(boids, x, y)
{
    for (b in boids)
    {
        boids[b].bound(x, y);
    }
}

function DrawFlock(ctx, boids)
{
    for (b in boids)
    {
        boids[b].draw(ctx);
    }
}


function MoveFlockToPointerPosition (event, canvas, boids)
{
    for (b in boids)
    {
        x = event.clientX - canvas.offsetLeft;
        y = event.clientY - canvas.offsetTop;
        
        var pos = new Point (x, y);
        var vel = new Point ((Math.random() - 0.5), (Math.random() - 0.5))
        
        boids[b].set(pos, vel);
    }
    
}

//boids - array of boids;
//b - index of boid around for which the precieved center of mass
//     will be calculated  (basically just exclude this index)
function FlockCenterOfMass(boids, b)
{
    var baryCenter = new Point(0, 0);
    for (i in boids)
    {
        if (i != b)
            baryCenter.offset(boids[i].position.x, boids[i].position.y);
    }
    //average it
    baryCenter = baryCenter.scale(1.0/ (boids.length-1));
    
    baryCenter.offset(-boids[b].position.x, -boids[b].position.y);
    
    //small portion
    //baryCenter = baryCenter.scale(0.001);
    
    return baryCenter;
}

//repulse boids from each others
function FlockRepulsion(boids, b)
{
    var repulsion = new Point(0, 0);
    for(i in boids)
    {
        if (i != b)
        {
            var distance = boids[i].position.distance(boids[b].position)
//            console.log("distance = " + distance);
            if (distance < 100)
            {
                var offset = new Point(0, 0);
                offset.x = boids[i].position.x - boids[b].position.x;
                offset.y = boids[i].position.y - boids[b].position.y;
                
                repulsion.offset(-offset.x, -offset.y);
            }
        }
    }
    
    return repulsion;
}


function MatchVelocity(boids, b)
{
    var velocity = new Point(0, 0);
    for (i in boids)
    {
        if (i != b)
        {
            velocity.offset(boids[i].velocity.x, boids[i].velocity.y)
        }    
    }
    
    velocity = velocity.scale(1.0/(boids.length - 1));
    
    velocity.offset(-boids[b].velocity.x, -boids[b].velocity.y);
    
   // velocity = velocity.scale(0.1);
    
    return velocity;
}

function BoundVelocity(boid, vmax)
{
    if (boid.velocity.length() > vmax)
        boid.velocity.normalize(vmax);
}

function UpdatePositions(boids, dt, 
                         baryCenterFraction,
                         repulsionFraction,
                         matchVelocityFraction,
                         maxVelocity)
{
    for (b in boids)
    {
        var v = FlockCenterOfMass(boids, b);
        //console.log("v = " + v1.x + ", " + v1.y); 
        boids[b].velocity.offset(v.x/baryCenterFraction, v.y/baryCenterFraction);
        
        //TODO: Adjust scale factor
        v = FlockRepulsion(boids, b); 
        boids[b].velocity.offset(v.x/repulsionFraction, v.y/repulsionFraction);
        
        v = MatchVelocity(boids, b);
        boids[b].velocity.offset(v.x/matchVelocityFraction, v.y/matchVelocityFraction);
        
        BoundVelocity(boids[b], maxVelocity);
        
        boids[b].update_positions(dt);
    }
}

//Vector v1, v2, v3, v4, ...
//
//                FOR EACH BOID b
//                        v1 = rule1(b)
//                        v2 = rule2(b)
//                        v3 = rule3(b)
//			v4 = rule4(b)
//			   .
//                           .
//                           .
//
//                        b.velocity = b.velocity + v1 + v2 + v3 + v4 + ...
//                        b.position = b.position + b.velocity
//                EN

























