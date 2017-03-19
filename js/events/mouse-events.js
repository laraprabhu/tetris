"use strict";

class MouseEvents extends Implementations {
	static implement() {
		_selectors.control_button.on(_utils.click, MouseEvents.control_button_click);
		_selectors.got_it_button.on(_utils.click, MouseEvents.got_it_button_click)
	}
}