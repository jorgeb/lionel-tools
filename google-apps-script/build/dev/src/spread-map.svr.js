function getSpreadColumns(spreadid) {

    return SpreadsheetApp
        .openById(spreadid)
        .getActiveSheet()
        .getRange('1:1')
        .getValues();
}