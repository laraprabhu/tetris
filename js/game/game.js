"use strict";

class Game{
	static playGame(){
		_data.intervalId = setInterval(() => {
			this.ongoingBlock.draw();
		}, _data.speed);
	}
	static pauseGame(){
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
		
		this.playGame();
	}
	static destroyTimer(){
		clearInterval(_data.intervalId);
	}
	static startGame(){
		if(this.ongoingBlock) {
			this.playGame();
			return;
		}
		this.totalScores = 0;
		this.nextBlock = null;
		this.spawnBlock();	
	}
	static stopGame(){
		this.ongoingBlock = null;
		this.pauseGame();
		Arena.implement();
	}
	static pickRandomBlock(){
		let outerLayer = _data.blocks[this.randomNumber(_data.blocks.length)];
		let preservable = this.randomNumber(outerLayer.length);
		return [outerLayer[preservable], outerLayer, preservable];
	}
	static endGame(){
		this.pauseGame();
		_selectors.pause_button.addClass(_classes.disabled);
		_selectors.play_button.addClass(_classes.disabled);
		_selectors.loader_spinny
			.removeClass(_classes.remove).end()
				.find(_selectors_string.spinny).addClass(_classes.hidden).end()
					.find(_selectors_string.control_details).removeClass(_classes.hidden)
						.find(_selectors_string.gameover).removeClass(_classes.hidden)
							.prevAll(_selectors_string.div).addClass(_classes.hidden);
	}
	static randomNumber(num){
		return Math.floor(Math.random() * num);
	}
}