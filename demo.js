import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setId("btnID");
btn.setText("Button Text");
btn.move(100,100);
btn.stateChanged(function(event){
	console.log(event);
});

var txtbox = new MyToolkit.Textbox;
txtbox.move(200, 200);