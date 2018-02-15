(function(){
    'use strict';

    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var result = document.getElementById('result');
    var startTime;
    var isStarted = false;

    start.addEventListener('click', function(){
	if(isStarted) return;
	isStarted = true;
	startTime = Date.now();
	this.className = 'pushed';
	stop.className = '';
	result.textContent = '0.000';
	result.className ='standby';
    });

    stop.addEventListener('click',function(){
	if(!isStarted) return;
	this.className = 'pushed';
	start.className ='';
	result.className ='';
	var stopTime;
	var diff;
	isStarted = false;
	stopTime = Date.now() - startTime;
	stopTime /= 1000;
	result.textContent = stopTime.toFixed(3);
	diff = stopTime-5.0;
	if(Math.abs(diff) < 0.5){
	    result.className = 'perfect';
	}
    });
})();
