"use strict";

class Arena {
  static implement() {
    this.buildTableBody(_selectors.main_table, _data.rowCnt, _data.colCnt);
		this.buildTableBody(_selectors.show_case_table, _data.rowCnt_showCase, _data.colCnt_showCase);
		this.updateScores();
		
		_data.initialPositionX = Math.ceil(_data.colCnt/2);
		_data.initialPositionShowcaseX = Math.ceil(_data.colCnt_showCase/2);
		_selectors.main_table_rows = $(_selectors_string.main_table_rows);
  }
  static buildTableBody(element, ...rowColCnt) {
    element.html(this.tailorBody.apply(this, rowColCnt));
  }
  static tailorBody(r, c) {
    return this.pullOuterHTML($(_utils.tbody, {
      html: Arena.tailorRowsAndCols(r,c)
    }));
  }
	static tailorRowsAndCols(r, c) {
		return new Array(r).fill(this.pullOuterHTML($(_utils.tr,{
			html : new Array(c).fill(this.pullOuterHTML($(_utils.td))).join(_utils.empty)
		}))).join(_utils.empty);
	}
  static pullOuterHTML(jqObject) {
    return jqObject.get(_utils.zero).outerHTML;
  }
	static updateScores(score = 0){
		if(!this.highScore){
			let highScore = localStorage.getItem("highScore") || "00000";
			this.highScore = parseInt(highScore);
		}
		
		this.highScore = Math.max(this.highScore, score);
		_selectors.score.text(this.formatScore(score));
		_selectors.highScore.text(this.formatScore(this.highScore));
		if(score - this.highScore == 0) localStorage.setItem("highScore", score);
	}
	static formatScore(score){
		return new Array(_data.scoreDigitCnt - score.toString().length).fill("0").join(_utils.empty) + score 
	}
}