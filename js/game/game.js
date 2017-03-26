"use strict";

class Game{
	static startGame(){
		this.totalScores = 0;
		this.spawnBlock();
	}
	static stopGame(){
		this.destroyTimer();
	}
	static spawnBlock(){
		this.ongoingBlock = new Block(this.pickRandomBlock());
		this.destroyTimer();
		
		_data.intervalId = setInterval(() => {
			this.ongoingBlock.draw();
		}, _data.speed);
	}
	static destroyTimer(){
		clearInterval(_data.intervalId);
	}
	static pickRandomBlock(){
		let outerLayer = _data.blocks[this.randomNumber(_data.blocks.length)];
		let preservable = this.randomNumber(outerLayer.length);
		return [outerLayer[preservable], outerLayer, preservable];
	}
	static randomNumber(num){
		return Math.floor(Math.random() * num);
	}
}