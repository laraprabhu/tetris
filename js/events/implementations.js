"use strict";

class Implementations {
	static control_button_click(){
		_selectors.loader_spinny
			.removeClass(_classes.remove)
				.find(_selectors_string.spinny).addClass(_classes.hidden).end()
					.find(_selectors_string.control_details).removeClass(_classes.hidden);
	}
	static got_it_button_click(){
		_selectors.loader_spinny.addClass(_classes.remove);
	}
	static play_button_click(){
		Game.startGame();
		$(this).addClass(_classes.disabled).siblings().removeClass(_classes.disabled);
	}
	static pause_button_click(){
		Game.pauseGame();
		$(this).addClass(_classes.disabled).prev().removeClass(_classes.disabled);
	}
	static stop_button_click(){
		Game.stopGame();
		$(this)
			.add($(this).prev())
				.addClass(_classes.disabled)
					.prev(_selectors_string.play_button)
						.removeClass(_classes.disabled);
	}
	static keyEventHandler(e) {
		if(Game.ongoingBlock){
			if([37,38,39,40].includes(e.keyCode)) {
				Game.ongoingBlock.makeMovement(e.keyCode);	
			}  
		}
		
		if(e.keyCode == 80){
			if(_selectors.pause_button.is("." + _classes.disabled)) {
				Implementations.play_button_click.call(_selectors.play_button);
			} else {
				Implementations.pause_button_click.call(_selectors.pause_button);
			}
		} else if(e.keyCode == 83){
			if(!_selectors.stop_button.is("." + _classes.disabled)) {
				Implementations.stop_button_click.call(_selectors.stop_button);
			}
		}
	}
}