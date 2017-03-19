"use strict";

class Arena {
  static construcArena() {
    this.buildTableBody(_selectors.main_table, _data.rowCnt, _data.colCnt);
		this.buildTableBody(_selectors.show_case_table, _data.rowCnt_showCase, _data.colCnt_showCase);
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