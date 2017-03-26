"use strict";

class Game{
	static startGame(){
		this.totalScores = 0;
		this.nextBlock = null;
		this.spawnBlock();
	}
	static stopGame(){
		this.destroyTimer();
	}
	static spawnBlock(){
		this.ongoingBlock = this.nextBlock || new Block(this.pickRandomBlock());
		this.destroyTimer();
		this.nextBlock = new Block(this.pickRandomBlock());
		
		$("td", _selectors.show_case_table_rows).removeClass();
		this.nextBlock.pathDecider({ 
			x : _data.initialPositionShowcaseX, 
			y : _data.initialPositionShowcaseY 
		}, false, this.nextBlock.blockData, _selectors.show_case_table_rows);
		
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