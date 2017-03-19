"use strict";

class MouseEvents extends Implementations {
	static implement() {
		_selectors.control_button.on(_utils.click, MouseEvents.control_button_click);
		_selectors.got_it_button.on(_utils.click, MouseEvents.got_it_button_click);
		
		_selectors.play_wrapper.on(_utils.click, _selectors_string.play_button + _selectors_string.not_disabled, MouseEvents.play_button_click);
		_selectors.play_wrapper.on(_utils.click, _selectors_string.pause_button + _selectors_string.not_disabled, MouseEvents.pause_button_click);
		_selectors.play_wrapper.on(_utils.click, _selectors_string.stop_button + _selectors_string.not_disabled, MouseEvents.stop_button_click);
	}
}