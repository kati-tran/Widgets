import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setId("btnID");
btn.move(100,100);
btn.onclick(function(e){
	console.log(e);
	console.log(e.target);
});
btn.stateChanged(function(event){
	console.log(event);
});

var txtbox = new MyToolkit.Textbox;
txtbox.move(200, 200);