
var currentSpreadId = '';

function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Dialog')
        .addItem('Open', 'openDialog')
        .addToUi();
}

function openDialog() {
    var html = HtmlService
        .createTemplateFromFile('index')
        .evaluate()
        .setWidth(800)
        .setHeight(600);

    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .showModalDialog(html, 'Dialog title');
}

function getData() {
    
    return SpreadsheetApp
        .openById(currentSpreadId)
        .getActiveSheet()
        .getRange('1:1')
        .getValues();
}

function doGet(e) {

    currentSpreadId = e.parameter.spread;
    return HtmlService
        .createTemplateFromFile('index')
        .evaluate();
}