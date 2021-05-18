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

    /**
     * Creates a basic button
     * @returns Button
     */
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

        /**
         * Transitions the event handler that notifies consuming code when the widget state has changed
         */
        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        return {
            /**
             * Set the position of the widget
             * @param {int} x 
             * @param {int} y 
             */
            move: function(x, y) {
                rect.move(x, y);
                text.move(x+13, y+15);
            },
            /**
             * Expose the onclick event handler that notifies consuming code when the button is clicked
             * @param {EventHandler} eventHandler 
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Expose the event handler that notifies consuming code when the widget state has changed
             * @param {EventHandler} eventHandler 
             */
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Set the text of the button
             * @param {string} input 
             */
            setText: function(input){
                text.text(input);
            },
            /**
             * Set the unique ID of the button
             * @param {string} id 
             */
            setId: function(id){
                rect.attr("id", id);
            }
        }
    }

    /**
     * Creates a basic checkbox
     * @returns Checkbox
     */
    var Checkbox = function(){
        var draw = box;
        
        var clickEvent = null;
        var stateEvent = null;
        var defaultState = "idle";
        var isChecked = false;

        var checkbox = draw.rect(25,25).fill('white').stroke("black").rx(7);
        var label = draw.text("").font({family: 'Georgia', weight: 'bold'}).fill("black");

        checkbox.mouseover(function(){
            this.stroke({ color: '#677d8f'})
            label.fill("#677d8f")
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
                this.fill({ color: '#2E80A1'})
                defaultState = "checked";
                isChecked = true;
            }
            if(clickEvent != null)
                clickEvent(event)
            transition();
        })

        /**
         * Transitions the event handler that notifies consuming code when the widget state has changed
         */
        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        return {
            /**
             * Set the position of the widget
             * @param {int} x 
             * @param {int} y 
             */
            move: function(x, y) {
                checkbox.move(x, y);
                label.move(x+30,y+4);
                checkbox.after(label);
            },
             /**
             * Expose the onclick event handler that notifies consuming code when the checkbox is clicked
             * @param {EventHandler} eventHandler 
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Expose the event handler that notifies consuming code when the widget state has changed
             * @param {EventHandler} eventHandler 
             */
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Set the text of the checkbox
             * @param {string} input 
             */
            setText: function(input){
                label.text(input);
            },
            /**
             * Set the unique ID of the checkbox
             * @param {string} id 
             */
            setId: function(id){
                checkbox.attr("id", id);
            }
        }
    }

    /**
     * Creates a basic radiobutton set
     * @param {Array} items 
     * @returns Radiobutton
     */
    var RadioButton = function(items){
        var draw = box;

        var clickEvent = null;
        var stateEvent = null;

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

            parent.add(radio);
            parent.add(label);
        }

        parent.each(function(i, children) {
            if(children[i].attr('isChecked') == "true"){
                children[i].fill({ color: '#2E80A1'})
            }
            children[i].mouseover(function(){
                this.stroke({ color: '#677d8f'})
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
                
                this.fill({ color: '#2E80A1'})
                defaultState = "checked";
                children[i].attr("isChecked", true);
                if(clickEvent != null)
                    clickEvent(event)
                transition();
            })
          })

        /**
         * Transitions the event handler that notifies consuming code when the widget state has changed
         */
        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        return {
            /**
             * Set the position of the widget
             * @param {int} x 
             * @param {int} y 
             */
            move: function(x, y) {
                parent.move(x, y);
            },
            /**
             * Expose handler that notifies consuming code when the checked state has changed and which n has been checked
             * @param {EventHandler} eventHandler 
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Expose the event handler that notifies consuming code when the widget state has changed
             * @param {EventHandler} eventHandler 
             */
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
        }

    }

    /**
     * Creates a basic textbox
     * @returns Textbox
     */
    var Textbox = function(){
        var textbox = box;

        var typeEvent = null;
        var stateEvent = null;
        var defaultState = "idle";
        var textboxActive = false;

        var rect = textbox.rect(200,30).fill('white').stroke("black").rx(7);
        var text = textbox.text("").font({family: 'Georgia'});
        var caret = textbox.rect(2,20).hide();
        var initialCaretPosition = 0;

        rect.click(function(){
            this.stroke("#2E80A1");
            defaultState = "active";
            textboxActive = true;

            caret.show();
            var runner = caret.animate().width(0);
            runner.loop(1000,1,0);

            SVG.on(window, "keyup", (event) =>{
                if(text.length() >= 190){
                    SVG.off(window, "keyup");
                }
                else{
                    if(event.key == "Backspace"){
                        text.text(text.text().slice(0, -1));
                        caret.x(text.length()+initialCaretPosition);
                    }
                    else if(event.key == "Shift"){
                    }
                    else{
                        text.text(text.text() + event.key);
                        caret.x(text.length()+initialCaretPosition);
                    }
                }
                if(typeEvent != null)
                    typeEvent(event)
            })

            transition();
        })

        nonComponent.click(function(){
            if(textboxActive){
                rect.stroke("black");
                defaultState = "inactive";
                caret.hide();
                SVG.off(window, "keyup");
                transition();
            }
        })

        /**
         * Transitions the event handler that notifies consuming code when the widget state has changed
         */
        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }
        
        return {
            /**
             * Set the position of the widget
             * @param {int} x 
             * @param {int} y 
             */
            move: function(x,y){
                rect.move(x,y);
                text.move(x+3,y);
                caret.move(x+3,y+5);
                initialCaretPosition = x+3;
            },
            /**
             * Expose the event handler that notifies consuming code when the widget state has changed
             * @param {EventHandler} eventHandler 
             */
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Expose the event handler that notifies consuming code when the text has changed
             * @param {EventHandler} eventHandler 
             */
            ontype: function(eventHandler){
                typeEvent = eventHandler
            },
            /**
             * Set the unique ID of the textbox
             * @param {string} id 
             */
            setId: function(id){
                rect.attr("id", id);
            }
        }

    }

    /**
     * Creates a basic scrollbar
     * @returns ScrollBar
     */
    var ScrollBar = function(){
        var scrollbar = box;

        var moveEvent = null;
        var movingState = "not moving";
        var stateEvent = null;
        var defaultState = "idle";

        var height = 200;

        var scrollerY = 0;
        var scrollerActive = false;

        var rect = scrollbar.rect(30,200).fill('white').stroke("black").rx(7);
        var scroller = scrollbar.rect(28,30).fill('#2E80A1').rx(7);

        scroller.mousedown(function(){
            scroller.fill('#677d8f');
            scrollerActive = true;
            defaultState = "active";
            transition();
        })

        rect.mousemove(function(event){
            if(scrollerActive)
            {
                if(scroller.y() < scrollerY){
                    movingState = "moving up";
                    moveTransition();
                }
                else if(scroller.y() > scrollerY){
                    movingState = "moving down";
                    moveTransition();
                }
                if(event.clientY <= ((height+170))){
                    scroller.move(scroller.x(), event.clientY);
                } 
                defaultState = "moving";
                transition();                   
            } 
        })

        rect.mouseup(function(){
            if(scrollerActive){
                scroller.fill('#2E80A1');
                scrollerActive = false;
                defaultState = "idle";
                transition();        
            }
            scrollerY = scroller.y();
        })
        scroller.mouseup(function(){
            if(scrollerActive){
                scroller.fill('#2E80A1');
                scrollerActive = false;
                defaultState = "idle";
                transition();        
            }
            scrollerY = scroller.y();
        })
        nonComponent.mouseup(function(){
            if(scrollerActive){
                scroller.fill('#2E80A1');
                scrollerActive = false;
                defaultState = "idle";
                transition();        
            }
            scrollerY = scroller.y();
        })

        scroller.mouseover(function(){
            if(!scrollerActive){
                this.fill({ color: '#76B3CB'})
                defaultState = "hover";
                transition();
            }
        })
        scroller.mouseout(function(){
            if(!scrollerActive)
            {
                this.fill('#2E80A1');
                defaultState = "idle"
            }
        })

        /**
         * Transitions the event handler that notifies consuming code when the widget state has changed
         */
        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        /**
         * Transitions the event handler event handler that notifies consuming code when the scroll thumb has moved and in which direction
         */
        function moveTransition()
        {
            if(moveEvent != null){
                moveEvent(movingState);
            }
        }
        
        return {
            /**
             * Set the position of the widget
             * @param {int} x 
             * @param {int} y 
             */
            move: function(x,y){
                rect.move(x,y);
                scroller.move(x+1,y+1);
                scrollerY = scroller.y();
            },
            /**
             * Expose the event handler that notifies consuming code when the widget state has changed
             * @param {EventHandler} eventHandler 
             */
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Expose the event handler that notifies consuming code when the scroll thumb has moved and in which direction
             * @param {EventHandler} eventHandler 
             */
            moveChanged: function(eventHandler){
                moveEvent = eventHandler
            },
            /**
             * Set the height of the scroll bar.
             * @param {int} hei 
             */
            setHeight: function(hei){
                rect.size(30, hei);
                height = hei;
            },
            /**
             * Set the unique ID of the scrollbar
             * @param {string} id 
             */
            setId: function(id){
                rect.attr("id", id);
            }
        }
    }

    /**
     * Creates a basic progress bar
     * @returns ProgressBar
     */
    var ProgressBar = function(){
        var progressbar = box;

        var incrementEvent = null;
        var stateEvent = null;
        var defaultState = "idle";

        var width = 200;
        var increment = 10;

        var progress = progressbar.rect(increment, 30).fill('#2E80A1').rx(7)
        var rect = progressbar.rect(200,30).fill('none').stroke("black").rx(7);

        progress.mouseover(function(){
            progress.fill('#76B3CB');
            incrementTransition();
            defaultState = "hover";
            transition();
        })
        progress.mouseout(function(){
            progress.fill('#2E80A1');
            defaultState = "idle";
            transition();
        })

        /**
         * Transitions the event handler that notifies consuming code when the widget state has changed
         */
        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        /**
         * Transitions the event handler that notifies consuming code when the progress bar has incremented
         */
        function incrementTransition(){
            if(incrementEvent != null){
                incrementEvent((progress.width()/width)*100);
            }
        }
        
        return {
            /**
             * Set the position of the widget
             * @param {int} x 
             * @param {int} y 
             */
            move: function(x,y){
                rect.move(x,y);
                progress.move(x, y)
            },
            /**
             * Expose the event handler that notifies consuming code when the widget state has changed
             * @param {EventHandler} eventHandler 
             */
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Set the unique ID of the progress bar
             * @param {string} id 
             */
            setId: function(id){
                rect.attr("id", id);
            },
            /**
             * Set the width of the progress bar.
             * @param {int} wid 
             */
            setWidth: function(wid){
                rect.size(wid, 30);
                width = wid;
            },
            /**
             * Set the initial increment of the progress bar
             * @param {int} inc 
             */
            setIncrement: function(inc){
                increment = inc;
                progress.size((inc/100)*width, 30);
            },
            /**
             * Set the moving increment of the progress bar
             * @param {int} inc 
             */
            moveBar: function(inc){
                var runner = progress.animate(2000).size((inc/100)*width, 30);
                runner.loop(1000,0,500);
            },
            /**
             * Expose the event handler that notifies consuming code when the progress bar has incremented
             * @param {EventHandler} eventHandler 
             */
            getIncrement: function(eventHandler){
                incrementEvent = eventHandler;
            }
        }

    }

    /**
     * Creates a basic toggle button
     * @returns ToggleButton
     */
    var ToggleButton = function(){
        var draw = box;
        
        var clickEvent = null;
        var stateEvent = null;
        var defaultState = "idle";

        var toggled = false;

        var rect = draw.rect(50,25).fill('lightgray').stroke('black').rx(7);
        var inner = draw.circle(23).fill('white').css({'pointer-events': 'none', 'user-select': 'none'});

        rect.click(function(event){
            if(!toggled)
            {
                rect.fill({ color: '#2E80A1'})
                if(defaultState == "toggled"){
                    if(clickEvent != null)
                        clickEvent(event)
                }
                inner.animate(200).move(rect.x()+25, rect.y()+1);
                toggled = true;
            }
            else{
                rect.fill('lightgray');
                if(defaultState == "untoggled"){
                    if(clickEvent != null)
                        clickEvent(event)
                }
                inner.animate(200).move(rect.x()+1, rect.y()+1);
                toggled = false;
            }
        })

        rect.mousedown(function(){
            if(!toggled)
            {
                defaultState = "toggled";  
            }
            else{
                defaultState = "untoggled";
            }
            transition();
        })

        /**
         * Transitions the event handler that notifies consuming code when the widget state has changed
         */
        function transition()
        {
            if(stateEvent != null){
                stateEvent(defaultState);
            }
        }

        return {
            /**
             * Set the position of the widget
             * @param {int} x 
             * @param {int} y 
             */
             move: function(x, y) {
                rect.move(x, y);
                text.move(x+1, y+1);
            },
            /**
             * Expose the onclick event handler that notifies consuming code when the button is clicked
             * @param {EventHandler} eventHandler 
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Expose the event handler that notifies consuming code when the widget state has changed
             * @param {EventHandler} eventHandler 
             */
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * Set the unique id of the toggle button
             * @param {string} id 
             */
            setId: function(id){
                rect.attr("id", id);
            }
        }
    }

return {Button, Checkbox, RadioButton, Textbox, ScrollBar, ProgressBar, ToggleButton}
}());

export{MyToolkit}