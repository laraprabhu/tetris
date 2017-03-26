"use strict";

class Block {
	constructor(blockData){
		this.interval = 0;
		this.previousPosition = null;
		this.blockData = blockData;
		this.position = {
			x : _data.initialPositionX,
			y : _data.initialPositionY
		};
	}
	moveLeft(){
		this.position.x--;
	}
	moveRight(){
		this.position.x++;
	}
	moveDown(){
		this.position.y++;
	}
	draw(){
		this.moveDown();
		if(!this.settle()){
				this.clearFootPath(this.previousPosition);
				this.makeFootPath(this.position);		
		}
	}
	drawManualOverride(overriderFunction){
		overriderFunction.call(this);
		if(!this.settle(overriderFunction)){
				this.clearFootPath(this.previousPosition);
				this.makeFootPath(this.position);		
		}
	}
	makeMovement(keycode){
		if(keycode == 37){
			this.drawManualOverride(this.moveLeft);
		} else if(keycode == 39){
			this.drawManualOverride(this.moveRight);
		} else if(keycode == 40) {
			this.drawManualOverride(this.moveDown);
		}
	}
	settle(overrider = {}){
		if(this.isPathBlocked(this.position) || this.reachedBottom(this.position)){
			if(this.isPathNotIgnored(overrider)){
				this.previousPosition = null;
				this.clearCurrentState();
				Game.spawnBlock();
				return true;	
			}
		}
	}
	isPathNotIgnored(overrider){
		var res = ["moveLeft","moveRight"].includes(overrider.name);
		if(res){
			if(overrider.name == "moveLeft") 
				this.position.x++;
			else 
				this.position.x--;	
		}
		return !res;
	}
	isPathBlocked(position, tableRows = _selectors.main_table_rows) {
		if(!position) return;
		for(let i=position.y, a=_data.blockSize-1; i>position.y - _data.blockSize; i--, a--){
			for(let j=position.x, b=0; j<position.x + _data.blockSize; j++, b++){
				if(i < 0) continue;
				var elem = $("td:eq("+ j +")", tableRows.eq(i));
				if(this.blockData[a][b] && elem.hasClass(_classes.marked) && !elem.hasClass(_classes.current)){
					return true;
				}
			}
		}
	}
	reachedBottom(position){
		return position.y == _selectors.main_table_rows.length
	}
	pathDecider(position, canErase, tableRows = _selectors.main_table_rows){
		if(!position) return;
		for(let i=position.y, a=_data.blockSize-1; i>position.y - _data.blockSize; i--, a--){
			for(let j=position.x, b=0; j<position.x + _data.blockSize; j++, b++){
				var elem = $("td:eq("+ j +")", tableRows.eq(i));
				if(i < 0) continue;
				
				if(canErase) elem = elem.filter("." + _classes.current);
				elem[canErase ? "removeClass" : "addClass"](this.blockData[a][b] ? _classes.marked + " " + _classes.current : "");
			}
		}
	}
	makeFootPath(position){
		this.previousPosition = this.clonePosition(position);
		this.pathDecider(position);
	}
	clearFootPath(position){
		this.pathDecider(position, true);
	}
	clearCurrentState(){
		_selectors.main_table_rows.find("." + _classes.current).removeClass(_classes.current);
	}
	clonePosition(position){
		return JSON.parse(JSON.stringify(position));
	}
}