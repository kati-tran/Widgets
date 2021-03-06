import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setId("btnID");
btn.setText("Button Text");
btn.move(100,100);
btn.onclick(function(event){
	console.log(event);
})
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

// Implement a MyToolkit RadioButton
let opt = [];
opt.push(["RadioButton 1", false]);
opt.push(["RadioButton 2", false]);
opt.push(["RadioButton 3", true]);
var rdbtn = new MyToolkit.RadioButton(opt);
rdbtn.move(100,270);
rdbtn.stateChanged(function(event){
	console.log(event);
});
rdbtn.onclick(function(event){
	console.log(event);
	console.log(event.target.id);
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

// Implement a MyToolKit ScrollBar
var scrollbar = new MyToolkit.ScrollBar;
scrollbar.move(300,200);
scrollbar.setHeight(200);
scrollbar.stateChanged(function(event){
	console.log(event)
})
scrollbar.moveChanged(function(event){
	console.log(event);
})

// Implement a MyToolKit ProgressBar
var progressbar = new MyToolkit.ProgressBar;
progressbar.move(350, 200);
progressbar.setWidth(300);
progressbar.setIncrement(0);
progressbar.moveBar(100);
progressbar.getIncrement(function(event){
	console.log(event);
});
progressbar.stateChanged(function(event){
	console.log(event);
})

// Implement a MyToolKist ToggleButton
var toggle = new MyToolkit.ToggleButton;
toggle.setId("toggleID");
toggle.move(350,250);
toggle.onclick(function(event){
	console.log(event);
})
toggle.stateChanged(function(event){
	console.log(event);
});