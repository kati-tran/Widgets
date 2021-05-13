// File name: mytoolkit.js

import {SVG} from './svg.min.js';
/* Theme Notes

Main Color Hex: #2E80A1
On Hover Hex: #76B3CB

Font-Family: Georgia

*/


var MyToolkit = (function() {
    var box = SVG().addTo('body').size('100%','100%');
    var Button = function(){
        var draw = box;
        var rect = draw.rect(125,50).fill('#2E80A1').rx(7);
        var clickEvent = null;
        var stateEvent = null;
        var defaultState = "idle";
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
        rect.mousemove(function(event){
        })

        // rect.click(function(event){
        //     this.fill({ color: 'pink'})
        //     if(clickEvent != null)
        //         clickEvent(event)
        // })

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
            //onmouseover: function(eventHandler){
            //    stateEvent = eventHandler
            //},
            setId: function(id){
                rect.attr("id", id);
            }
        }
    }

    var Textbox = function(){
        var textbox = box;
        var rect = textbox.rect(200,30).fill('white').stroke("black");
        var text = textbox.text("");
        //var caret = textbox.line(45, 2.5, 45, 25).stroke({width:1, color:"black"});
        var caret = textbox.rect(2,20);
        var runner = caret.animate().width(0);
        runner.loop(1000,1,0);

        var initialCaretPosition = 0;

        SVG.on(window, "keyup", (event) =>{
            text.text(text.text() + event.key);
            caret.x(text.length()+initialCaretPosition);
        })

        return {
            move: function(x,y){
                rect.move(x,y);
                text.move(x,y);
                caret.move(x,y+4);
                initialCaretPosition = x;
            },
            src: function(){
                return textbox;
            }
        }

    }

return {Button, Textbox}
}());

export{MyToolkit}