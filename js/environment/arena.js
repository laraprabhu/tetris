"use strict";

class Arena {
  static implement() {
    this.buildTableBody(_selectors.main_table, _data.rowCnt, _data.colCnt);
		this.buildTableBody(_selectors.show_case_table, _data.rowCnt_showCase, _data.colCnt_showCase);
		
		_data.initialPositionX = Math.ceil(_data.colCnt/2);
		_data.initialPositionShowcaseX = Math.ceil(_data.colCnt_showCase/2);
		_selectors.main_table_rows = $(_selectors_string.main_table_rows);
  }
  static buildTableBody(element, ...rowColCnt) {
    element.html(this.tailorRowsAndCols.apply(this, rowColCnt));
  }
  static tailorRowsAndCols(r, c) {
    return this.pullOuterHTML($(_utils.tbody, {
      html: (new Array(r)).fill(this.pullOuterHTML($(_utils.tr, {
        html: (new Array(c)).fill(this.pullOuterHTML($(_utils.td))).join(_utils.empty)
      }))).join(_utils.empty)
    }));
  }
  static pullOuterHTML(jqObject) {
    return jqObject.get(_utils.zero).outerHTML;
  }
}