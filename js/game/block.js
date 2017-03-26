"use strict";

class Block {
	constructor(blockData){
		this.interval = 0;
		this.previousPosition = undefined;
		this.previousBlockData = undefined;
		this.blockData = blockData.shift();
		this.wholeBlockData = blockData.shift();
		this.blockIndex = blockData.shift();
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
	tiltTheBlock(){
		this.previousBlockData = Array.from(this.blockData);
		this.blockData = this.getTiltedData();
	}
	redoTilt(){
		this.blockData = this.previousBlockData;
		this.blockIndex--;
	}
	getTiltedData(redo){
		return this.wholeBlockData[(redo ? (--this.blockIndex) : (++this.blockIndex)) % this.wholeBlockData.length];
	}
	draw(){
		this.moveDown();
		if(!this.settle()){
				this.clearFootPath(this.previousPosition);
				this.makeFootPath(this.position);		
		}
	}
	drawManualOverride(overriderFunction, passData){
		overriderFunction.call(this);
		if(!this.settle(overriderFunction)){
				this.clearFootPath(this.previousPosition, passData ? this.previousBlockData : undefined);
				this.makeFootPath(this.position, passData ? this.blockData : undefined);		
		}
	}
	makeMovement(keycode){
		if(keycode == 37){
			this.drawManualOverride(this.moveLeft);
		} else if(keycode == 38) {
			this.drawManualOverride(this.tiltTheBlock, true);
		} else if(keycode == 39) {
			this.drawManualOverride(this.moveRight);
		} else if(keycode == 40) {
			this.drawManualOverride(this.moveDown);
		}
	}
	settle(overrider = {}){
		if(this.isPathBlocked(this.position) || this.reachedBottom(this.position)){
			if(this.isPathNotIgnored(overrider, this.position)){
				this.previousPosition = null;
				this.clearCurrentState();
				Game.spawnBlock();
				return true;	
			}
		}
	}
	isPathNotIgnored(overrider, position){
		var overriderName = overrider.name;
		var res = ["moveLeft","moveRight", "tiltTheBlock"].includes(overriderName);
		if(res){
			if(overriderName == "moveLeft") 
				this.moveRight();
			else if(overriderName == "moveRight")
				this.moveLeft();
			else
				this.redoTilt();
		}
		return !res;
	}
	isPathBlocked(position, tableRows = _selectors.main_table_rows) {
		if(!position) return;
		for(let i=position.y, a=_data.blockSize-1; i>position.y - _data.blockSize; i--, a--){
			for(let j=position.x, b=0; j<position.x + _data.blockSize; j++, b++){
				var elem = $("td:eq("+ j +")", tableRows.eq(i));
				var isBoundaryCrossed = (this.blockData[a][b] && ((j < 0) || !elem.length));
				if(i < 0 && !isBoundaryCrossed) continue;
				if((this.blockData[a][b] && elem.hasClass(_classes.marked) && !elem.hasClass(_classes.current)) 
					 	|| isBoundaryCrossed) {
					return true;
				}
			}
		}
	}
	reachedBottom(position){
		return position.y == _selectors.main_table_rows.length
	}
	pathDecider(position, canErase, blockData, tableRows = _selectors.main_table_rows){
		if(!position) return;
		for(let i=position.y, a=_data.blockSize-1; i>position.y - _data.blockSize; i--, a--){
			for(let j=position.x, b=0; j<position.x + _data.blockSize; j++, b++){
				var elem = $("td:eq("+ j +")", tableRows.eq(i));
				if(i < 0) continue;
				if(canErase) elem = elem.filter("." + _classes.current);
				elem[canErase ? "removeClass" : "addClass"](blockData[a][b] ? _classes.marked + " " + _classes.current : "");
			}
		}
	}
	makeFootPath(position, blockData = this.blockData){
		this.previousPosition = this.clonePosition(position);
		this.pathDecider(position, false, blockData);
	}
	clearFootPath(position, blockData = this.blockData){
		this.pathDecider(position, true, blockData);
	}
	clearCurrentState(){
		_selectors.main_table_rows.find("." + _classes.current).removeClass(_classes.current);
	}
	clonePosition(position){
		return JSON.parse(JSON.stringify(position));
	}
}