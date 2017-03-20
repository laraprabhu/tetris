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
		this.position.x++;
	}
	moveRight(){
		this.position.x--;
	}
	moveDown(){
		this.position.y++;
	}
	draw(){
		this.clearFootPath(this.previousPosition);
		this.makeFootPath(this.position);
		this.moveDown();
		this.settle();
	}
	settle(){
		
	}
	giveBirth(){
		
	}
	pathDecider(position, canErase){
		if(!position) return;
		for(let i=position.y; i<position.y - _data.blockSize; i--){
			for(let j=position.x; j<position.x + _data.blockSize; i++){
				$(_selectors.main_table_rows.eq(i), "eq("+ j +")")
					[canErase ? "removeClass" : "addClass"](_classes.marked);
			}
		}
	}
	makeFootPath(position){
		this.pathDecider(position);
	}
	clearFootPath(position){
		this.pathDecider(position, true);
	}
}