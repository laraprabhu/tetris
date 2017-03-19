"use strict";

class ReadyDuty {
	static process(){
		ReadyDuty.cacheSelectors();
		Arena.construcArena();
		LoadDuty.initiate();
	}
	static cacheSelectors() {
		_selectors.main_table = $("#tableTetris");
		_selectors.show_case_table = $(".showcase");
		_selectors.loader_spinny = $(".loader");
	}
}