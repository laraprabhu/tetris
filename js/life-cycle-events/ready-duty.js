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
		Object.keys(_selectors).forEach(function(prop){
			_selectors[prop] = $(_selectors_string[prop]);
		});
	}
}