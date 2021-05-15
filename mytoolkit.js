// File name: mytoolkit.js

import {SVG} from './svg.min.js';
/* Theme Notes

Main Color Hex: #2E80A1
On Hover Hex: #76B3CB
Action Hex: #677d8f

Font-Family: Georgia

*/


var MyToolkit = (function() {
    var box = SVG().addTo('body').size('100%','100%');
    var nonComponent = box.rect('100%','100%').fill('white');

    /** Creates a basic button **/
    var Button = function(){
        var draw = box;
        
        var clickEvent = null;
        var stateEvent = null;
        var defaultState = "idle";

        var rect = draw.rect(125,50).fill('#2E80A1').rx(7);
        var text = draw.text("").font({family: 'Georgia', weight: 'bold'}).fill("white").css({'pointer-events': 'none', 'user-select': 'none'});

        rect.mouseover(function(){
            this.fill({ color: '#76B3CB'})
            defaultState = "hover";
            transition();
        })
        rect.mouseout(function(){
            this.fill({ color: '#2E80A1'})
            defaultState = "idle";
            transition();
        })
        rect.mouseup(function(event){
            this.fill({ color: '#76B3CB'})
            if(defaultState == "pressed"){
                if(clickEvent != null)
                    clickEvent(event)
            }
            defaultState = "up";
            transition();
        })
        rect.mousedown(function(){
            this.fill({ color: '#677d8f'})
            defaultState = "pressed";
            transition();
        })

        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        return {
            move: function(x, y) {
                rect.move(x, y);
                text.move(x+13, y+15);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            setText: function(input){
                text.text(input);
            },
            setId: function(id){
                rect.attr("id", id);
            }
        }
    }

    /** Creates a basic checkbox **/
    var Checkbox = function(){
        var draw = box;
        
        var clickEvent = null;
        var stateEvent = null;
        var defaultState = "idle";
        var isChecked = false;

        var checkbox = draw.rect(25,25).fill('white').stroke("black").rx(7);
        var label = draw.text("").font({family: 'Georgia', weight: 'bold'}).fill("black");

        checkbox.mouseover(function(){
            this.stroke({ color: '#2E80A1'})
            label.fill("#2E80A1")
            defaultState = "hover";
            transition();
        })
        checkbox.mouseout(function(){
            this.stroke({ color: 'black'})
            label.fill("black")
            defaultState = "idle";
            transition();
        })
        checkbox.mousedown(function(event){
            if(isChecked){
                this.fill({color:'white'})
                defaultState = "unchecked";
                isChecked = false;
            }
            else{
                this.fill({ color: '#677d8f'})
                defaultState = "checked";
                isChecked = true;
            }
            if(clickEvent != null)
                clickEvent(event)
            transition();
        })

        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        return {
            move: function(x, y) {
                checkbox.move(x, y);
                label.move(x+30,y+4);
                checkbox.after(label);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            setText: function(input){
                label.text(input);
            },
            setId: function(id){
                checkbox.attr("id", id);
            }
        }
    }

    /** Creates a basic radio button set **/
    var RadioButton = function(items){
        var draw = box;

        var clickEvent = null;
        var stateEvent = null;

        //var parent = draw.rect(100,100).fill('white');
        var parent = draw.group();
        var radiobuttons = [];

        for (var index = 0; index < items.length; index++) {
            var defaultState = "idle";

            var radio = draw.circle(25).fill('white').stroke("black");
            var label = draw.text("").font({family: 'Georgia', weight: 'bold'}).fill("black").css({'pointer-events': 'none', 'user-select': 'none'});
            label.text(items[index][0]);
            radio.attr({'id': items[index][0], 'isChecked': items[index][1]});

            radio.move(radio.x(), radio.y() + (35 * index));
            label.move(label.x() + 30, label.y() + (35 * index))

            radiobuttons.push(radio);
            console.log(radiobuttons);

            parent.add(radio);
            parent.add(label);
        }

        parent.each(function(i, children) {
            if(children[i].attr('isChecked') == "true"){
                children[i].fill({ color: '#677d8f'})
            }
            children[i].mouseover(function(){
                //console.log(radio.attr("isChecked"));
                this.stroke({ color: '#2E80A1'})
                defaultState = "hover";
                transition();
            })
            children[i].mouseout(function(){
                this.stroke({ color: 'black'})
                defaultState = "idle";
                transition();
            })
            children[i].mousedown(function(event){
                for (var radios = 0; radios < radiobuttons.length; radios++){
                    radiobuttons[radios].fill({color:"white"}).attr("isChecked",false);
                }
                
                this.fill({ color: '#677d8f'})
                defaultState = "checked";
                children[i].attr("isChecked", true);
                if(clickEvent != null)
                    clickEvent(event)
                transition();
            })
          })

          function transition()
          {
              if(stateEvent != null){
                  stateEvent(defaultState);
              }
          }

        return {
            move: function(x, y) {
                parent.move(x, y);
                //label.move(x+30,y+4);
                //radio.after(label);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
        }

    }

    /** Creates a basic textbox **/
    var Textbox = function(){
        var textbox = box;

        var typeEvent = null;
        var stateEvent = null;
        var defaultState = "idle";

        var rect = textbox.rect(200,30).fill('white').stroke("black").rx(7);
        var text = textbox.text("").font({family: 'Georgia'});
        var caret = textbox.rect(2,20).hide();
        var initialCaretPosition = 0;

        rect.click(function(){
            this.stroke("#2E80A1");
            defaultState = "active";

            caret.show();
            var runner = caret.animate().width(0);
            runner.loop(1000,1,0);

            SVG.on(window, "keyup", (event) =>{
                if(text.length() >= 190){
                    SVG.off(window, "keyup");
                }
                else{
                    text.text(text.text() + event.key);
                    caret.x(text.length()+initialCaretPosition);
                }
                if(typeEvent != null)
                    typeEvent(event)
            })

            transition();
        })

        nonComponent.click(function(){
            rect.stroke("black");
            defaultState = "inactive";
            caret.hide();
            SVG.off(window, "keyup");
            transition();
        })

        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }
        
        return {
            move: function(x,y){
                rect.move(x,y);
                text.move(x+3,y);
                caret.move(x+3,y+5);
                initialCaretPosition = x+3;
            },
            src: function(){
                return textbox;
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            ontype: function(eventHandler){
                typeEvent = eventHandler
            },
            setId: function(id){
                rect.attr("id", id);
            }
        }

    }

return {Button, Checkbox, RadioButton, Textbox}
}());

export{MyToolkit}