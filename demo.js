import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setId("btnID");
btn.setText("Button Text");
btn.move(100,100);
btn.stateChanged(function(event){
	console.log(event);
});

// Implement a MyToolkit Checkbox
var chk = new MyToolkit.Checkbox;
chk.setId("chkID");
chk.setText("Checkbox 1");
chk.move(100,200);
chk.stateChanged(function(event){
	console.log(event);
});
chk.onclick(function(event){
	console.log(event);
})

// Implement a MyToolKit Textbox
var txtbox = new MyToolkit.Textbox;
txtbox.move(300, 120);
txtbox.stateChanged(function(event){
	console.log(event);
});
txtbox.ontype(function(event){
	console.log(event);
})