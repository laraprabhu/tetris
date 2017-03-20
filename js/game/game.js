"use strict";

class Game{
	static startGame(){
		let ongoingBlock = new Block(this.pickRandomBlock());
		
		_data.intervalId = setInterval(() => {
			ongoingBlock.draw();
		}, _data.speed);
	}
	static stopGame(){
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