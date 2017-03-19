"use strict";

class ReadyDuty {
	static implement(){
		//Selectors cache has to be set first.
		ReadyDuty.cacheSelectors();
		
		Arena.implement();
		LoadDuty.implement();
		MouseEvents.implement();
	}
	static cacheSelectors(){
		_selectors.main_table = $("#tableTetris");
		_selectors.show_case_table = $(".showcase");
		_selectors.loader_spinny = $(".loader");
		_selectors.control_button = $(".internalWrappers.devDetailsWrapper .controls a");
		_selectors.got_it_button = $(".controlDetails div:last-child span");
	}
}