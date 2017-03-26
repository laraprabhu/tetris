"use strict";

class Game{
	static startGame(){
		this.spawnBlock();
	}
	static stopGame(){
		this.destroyTimer();
	}
	static spawnBlock(){
		let ongoingBlock = new Block(this.pickRandomBlock());
		this.destroyTimer();
		
		_data.intervalId = setInterval(() => {
			ongoingBlock.draw();
		}, _data.speed);
	}
	static destroyTimer(){
		clearInterval(_data.intervalId);
	}
	static pickRandomBlock(){
		let outerLayer = _data.blocks[this.randomNumber(_data.blocks.length)];
		return outerLayer[this.randomNumber(outerLayer.length)];
	}
	static randomNumber(num){
		return Math.floor(Math.random() * num);
	}
}