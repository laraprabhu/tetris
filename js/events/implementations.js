"use strict";

class Implementations {
	static control_button_click() {
		_selectors.loader_spinny
			.removeClass("remove")
				.find(".spinny").addClass("hidden").end()
					.find(".controlDetails").removeClass("hidden");
	}
	static got_it_button_click() {
		_selectors.loader_spinny
			.addClass("remove")
	}
}