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
		this.clearFootPath();
		
	}
	settle(){
		
	}
	giveBirth(){
		
	}
	clearFootPath(){
		
	}
}