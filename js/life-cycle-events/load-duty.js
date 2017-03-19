"use strict";

class LoadDuty {
	static implement(){
		$(window).load(this.process.bind(this));
	}
	static process(){
		setTimeout(function(){
			_selectors.loader_spinny.addClass("remove");	
		}, _data.loader_removal_time);
	}
}