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
		if(this.position.y == _selectors.main_table_rows.length){
			this.previousPosition = null;
			this.giveBirth();
		}
	}
	giveBirth(){
		//TODO Looks like a cyclic dependency. Have to find a fix.
		Game.spawnBlock();
	}
	pathDecider(position, canErase){
		if(!position) return;
		for(let i=position.y,a=_data.blockSize-1; i>position.y - _data.blockSize; i--, a--){
			for(let j=position.x,b=0; j<position.x + _data.blockSize; j++, b++){
				if(i < 0) continue;
				$("td:eq("+ j +")", _selectors.main_table_rows.eq(i))[canErase ? "removeClass" : "addClass"]
				((this.blockData[a][b] || canErase) ? _classes.marked : _utils.empty);
			}
		}
	}
	makeFootPath(position){
		this.previousPosition = JSON.parse(JSON.stringify(position));
		this.pathDecider(position);
	}
	clearFootPath(position){
		this.pathDecider(position, true);
	}
}