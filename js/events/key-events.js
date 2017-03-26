"use strict";

class KeyEvents extends Implementations {
	static implement() {
		_selectors.body.on(_utils.keydown, MouseEvents.keyEventHandler)
	}
}