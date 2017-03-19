class ReadyDuty {
	static process(){
		_selectors.main_table = $("#tableTetris");
		_selectors.show_case_table = $(".showcase");
		_selectors.loader_spinny = $(".loader");
		
		LoadDuty.initiate(); 
	}
}