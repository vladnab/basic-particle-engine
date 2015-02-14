/*jslint browser: true*/
/*jslint plusplus : true*/
/*global $, jQuery, alert,console*/

	var emitter,
        i,
        j,
        p,
		g,
        max_xvelocity = 30,
        min_xvelocity = -30,
        max_yvelocity = 40,
        min_yvelocity = 5,
		
        num_particles = 100,
        min_size = 1,
		max_size = 5,
        max_lifespan = 2000,
        min_lifespan = 500,
        frequency = 50,
        gravity = 9.81,
        friction = 0.007,
		random_color = true,
		M_TO_PX = 3779.527559055,
		S_TO_MS = Math.pow(10, -6),
		MIN_SIZE_SLIDER = 1,
		MAX_SIZE_SLIDER = 25,
		MIN_V_SLIDER = -100,
		MAX_V_SLIDER = 100,
		MAX_NUMBER = 1000,
		W = 600,
        H = 600;
		var particles = [];
	
			
    
$(document).ready(function () {
    
  
     var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d");
	
	function Emitter(){
		this.x = W/2;
		this.y = H;
	}
       
    emitter = new Emitter();
    function Particle() {
        //randomly proportioned squares.
        this.w = Math.random() * (max_size - min_size) + min_size;
        this.h = this.w;
        //emitter is on the bottom center of the screen.
        this.x = emitter.x - this.w/2;
        this.y = emitter.y -this.h;
        //random velocity.
        this.vx = Math.random() * (max_xvelocity - min_xvelocity) + min_xvelocity;
        this.vy = Math.random() * (max_yvelocity - min_yvelocity) + min_yvelocity;
        //initialising acceleration on x and y axis.
        this.ay = -gravity;
        this.ax = 0;
        //random hue, saturation, lightness.
		if(random_color)
			this.hue = Math.random() * 360;
		else
			this.hue = 145;
        this.saturation = Math.random() * 30 + 70;
        this.lightness = Math.random() * 40 + 10;
        //apply random hsl parameters.
        this.color = "hsl(" + this.hue + ", " + this.saturation + "%," + this.lightness + "%)";
        this.lifespan = Math.random() * (max_lifespan - min_lifespan) + min_lifespan;
        //random mass between 1 and 2.
        this.mass = Math.random() + 1;
    }
    function convertAcc() {
		g = gravity * frequency * M_TO_PX * S_TO_MS;
	}
	
    for (i = 0; i <MAX_NUMBER ; i++) {
      //fill array with particles.
        particles.push(new Particle());
		
    }
	
    function draw() {
		
        //erase ancient shape with solid black.
        c.fillStyle = "rgba(0,0,0,1)";
        c.fillRect(0, 0, W, H);
		console.log(num_particles);
        //update every particle in the array
        for (j = 0; j < num_particles; j++) {
			
            p = particles[j];
            //about to create or update a shape.
            c.beginPath();
            c.fillStyle = p.color;
            c.rect(p.x, p.y, p.w, p.h);
            //draws the updated shape.
            c.fill();
            convertAcc();
            //apply friction and gravity.
            p.ax = -friction * p.vx / p.mass;
            p.ay = -friction * p.vy / p.mass - g;
            //apply acceleration.
            p.vy += p.ay;
            p.vx += p.ax;
            
            //apply velocity.
            p.x += p.vx;
            p.y -= p.vy;
            //update lifespan.
            p.lifespan -= frequency;
            
            //if the particle has depleted its lifespan or is out of the canvas boundaries.
            if (p.lifespan <= 0 || p.x > W || p.x < 0 || p.y > H || p.y < 0) {
                //delete the particle and emit a new one so that there are exactly particleNum particles at any given moment.
                delete particles[j];
				
                	particles[j] = new Particle();
				
                    
            }
            
        }
        
        
    }

    //repeat every frequency ms.
    setInterval(draw, frequency);

});
 