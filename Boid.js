// Point.js should be included before

function Boid()
{
    //dunno if that's good at all, 
    //how to create default ctr if pos and velocity are not provided

    this.position = new Point();
    //this.position.x = 0; // = position || {x:0, y:0};
    //this.position.y = 0;
    
    this.velocity = new Point();
    //this.velocity.x = 0; // velocity || {x:0, y:0};
    //this.velocity.y = 0;
    this.color = "#"+((1<<24)*Math.random()|0).toString(16);
    
    this.radius = 5;
}


//boundary conditions, just change velocity to opposite
Boid.prototype.bound = function (x, y)
{
    if (this.position.x > x) this.velocity.x = -this.velocity.x;
    if (this.position.y > y) this.velocity.y = -this.velocity.y;
    
    if (this.position.x < 0) this.velocity.x = -this.velocity.x;
    if (this.position.y < 0) this.velocity.y = -this.velocity.y;
};

// x, y bound of  canvas
Boid.prototype.init = function(x, y)
{
    this.position.x = x * Math.random();
    this.position.y = y * Math.random();
    
    this.velocity.x = (Math.random() - 0.5);
    this.velocity.y = (Math.random() - 0.5);
    
    //console.log("position: " + this.position.x + ", " + this.position.y);

    //console.log("velocity: " + this.velocity.x + ", " + this.velocity.y);
    
};

Boid.prototype.set = function(pos, vel)
{
    //jak to powinno byc zrobione
    //this.position = new Point(pos.x, pos.y)?
    this.position.x = pos.x;
    this.position.y = pos.y;
    
    this.velocity.x = vel.x;
    this.velocity.y = vel.y;
};


Boid.prototype.update_positions = function (delta_t)
{
    //console.log("V = " + this.velocity.x + ", " + this.velocity.y)
    var delta = this.velocity.scale(delta_t);
    this.position.offset(delta.x, delta.y);
};

Boid.prototype.draw = function (ctx)
{
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    
}