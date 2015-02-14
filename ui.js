var spin_gravity,
	spin_friction,
	spin_number,
	slide_xvelocity,
	slide_yvelocity,
	slide_size,
	mouseX,
	mouseY,
	fixedPos = true;

$(document).ready(function() {
	spin_number = $("#number").spinner();
	
	spin_gravity = $("#gravity").spinner({
		step : 0.01
	});
	

	spin_friction = $("#friction").spinner({
		step : 0.001
	});
	
	

	slide_size = $("#size").slider({
		range : true,
		min : MIN_SIZE_SLIDER,
		max : MAX_SIZE_SLIDER,
		values : [min_size,max_size]
	});
	
	slide_xvelocity = $("#xvelocity").slider({
			range : true,
			min : MIN_V_SLIDER,
			maw : MAX_V_SLIDER,
			values : [min_xvelocity,max_xvelocity]
	});
	slide_yvelocity = $("#yvelocity").slider({
			range : true,
			min : MIN_V_SLIDER,
			maw : MAX_V_SLIDER,
			values : [min_yvelocity,max_yvelocity]
	});
	
	$("#canvas").mousemove(function(event){
		if(!fixedPos)
		{
			emitter.x = event.pageX;
			emitter.y = event.pageY;
		}
	});
	
	$("#canvas").click(function(event){
	fixedPos = !fixedPos;
	
	});
	
	
	
setInterval(function(){
	

	num_particles = spin_number.spinner("value");
	gravity = spin_gravity.spinner("value");
	
	friction = spin_friction.spinner("value");
	
	min_size = slide_size.slider("values",0);
	max_size = slide_size.slider("values",1);
	
	min_xvelocity = slide_xvelocity.slider("values",0);
	max_xvelocity = slide_xvelocity.slider("values",1);
	
	min_yvelocity = slide_yvelocity.slider("values",0);
	max_yvelocity = slide_yvelocity.slider("values",1);
},frequency);
});

