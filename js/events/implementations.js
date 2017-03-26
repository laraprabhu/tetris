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
		$(this).addClass(_classes.disabled).prev().removeClass(_classes.disabled);
	}
	static stop_button_click(){
		Game.stopGame();
		$(this)
			.add(this.previousElementSibling)
				.addClass(_classes.disabled)
					.prev(_selectors_string.play_button)
						.removeClass(_classes.disabled);
	}
	static keyEventHandler(e) {
		if(Game.ongoingBlock && [37,39,40].includes(e.keyCode)){
			Game.ongoingBlock.makeMovement(e.keyCode);	
		}
	}
}