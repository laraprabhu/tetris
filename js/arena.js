class Arena {
  static construcArena() {
    this.buildTableBody(_data.rowCnt, _data.colCnt);
  }
  static buildTableBody(r, c) {
    _selectors.main_table.html(this.tailorRowsAndCols.apply(this, arguments));
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