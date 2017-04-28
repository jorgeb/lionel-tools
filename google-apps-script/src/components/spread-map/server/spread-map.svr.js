function getSpreadColumns(spreadid) {

    return SpreadsheetApp
        .openById(spreadid)
        .getActiveSheet()
        .getRange('1:2')
        .getValues();
}

function getTable(tableId) {

    return FusionTables.Table.get(tableId);
}

/*
 var tables = FusionTables.Table.list();
  if (tables.items) {
    for (var i = 0; i < tables.items.length; i++) {
      var table = tables.items[i];
      Logger.log('Table with name "%s" and ID "%s" was found.',
                 table.name, table.tableId);
    }
  } else {
    Logger.log('No tables found.');
  }

  Logger.log(runQuery('1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3'));
  return tables;

*/
/*
function runQuery(tableId) {
    var sql = 'SELECT * FROM ' + tableId + ' LIMIT 100';
    var result = FusionTables.Query.sqlGet(sql, {
        hdrs: false
    });
    if (result.rows) {
        var spreadsheet = SpreadsheetApp.create('Fusion Table Query Results');
        var sheet = spreadsheet.getActiveSheet();

        // Append the headers.
        sheet.appendRow(result.columns);

        // Append the results.
        sheet.getRange(2, 1, result.rows.length, result.columns.length)
            .setValues(result.rows);

        Logger.log('Query results spreadsheet created: %s',
            spreadsheet.getUrl());
    } else {
        Logger.log('No rows returned.');
    }
}
*/


/*

function getSpreadColumns(spreadid) {


   var tables = FusionTables.Table.list();
  if (tables.items) {
    for (var i = 0; i < tables.items.length; i++) {
      var table = tables.items[i];
      Logger.log('Table with name "%s" and ID "%s" was found.',
                 table.name, table.tableId);
    }
  } else {
    Logger.log('No tables found.');
  }

  Logger.log(runQuery('1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3'));
  return tables;


  
  var tables = FusionTables.Table.list();
  if (tables.items) {
    for (var i = 0; i < tables.items.length; i++) {
      var table = tables.items[i];
      Logger.log('Table with name "%s" and ID "%s" was found.',
                 table.name, table.tableId);
    }
  } else {
    Logger.log('No tables found.');
  }
    //var tables = FusionTables.Table.list();
  //https://fusiontables.google.com/embedviz?viz=GVIZ&t=TABLE&q=select+col0%2C+col1%2C+col2%2C+col3+from+1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3&containerId=googft-gviz-canvas
  //https://fusiontables.google.com/embedviz?viz=GVIZ&t=TABLE&q=select+col0%2C+col1%2C+col2%2C+col3+from+1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3&containerId=googft-gviz-canvas
  //1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3

     //return tables;


}

function runQuery(tableId) {
    var sql = 'SELECT * FROM ' + tableId + ' LIMIT 100';
    var result = FusionTables.Query.sqlGet(sql, {
        hdrs: false
    });
    if (result.rows) {
        var spreadsheet = SpreadsheetApp.create('Fusion Table Query Results');
        var sheet = spreadsheet.getActiveSheet();

        // Append the headers.
        sheet.appendRow(result.columns);

        // Append the results.
        sheet.getRange(2, 1, result.rows.length, result.columns.length)
            .setValues(result.rows);

        Logger.log('Query results spreadsheet created: %s',
            spreadsheet.getUrl());
    } else {
        Logger.log('No rows returned.');
    }
}


*/