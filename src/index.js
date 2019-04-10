const api = require('./api');
const utils = require('./utils');

/*** CONNECT TO API *****************************************/
const smartsheet = api.connect();

/*** LIST ALL SHEETS ****************************************/
//const sheets = api.listSheets();
//sheets.then(data => console.log(data))

/*** GET SHEET ID FROM NAME *********************************/
const getSheetByName = async(name) => {
  const sheets = await api.listSheets();
  let id = null;
  sheets.forEach(sheet => {
    if(sheet.name === name) id = sheet.id;
  })
  return id;
}

//const sheetId = getSheetByName('ToDo');
//sheetId.then(id => console.log(`id: ${id}`));

/*** GET SHEET BY ID *********************************/
const getSheetById = async (sheetId) => {
  const sheet = await api.getSheet({id: sheetId.toString()});
  const { columns } = sheet;
  utils.populateColumnMap(columns);
  return sheet;
}

//const sheet = getSheetById('3115002191210372');

/*** CHECK STATUS *********************************/
const checkStatus = (sheet) => {
  const { rows } = sheet;
  rows.forEach(row => {
    const statusCell = utils.getCellByColumnName(row, 'Status');
    const progressCell = utils.getCellByColumnName(row, 'Progress');
    if(statusCell.value === "Completed" && progressCell.value !== 100) {
      api.updateRow({sheetId: sheet.id, rowId: row.id, cell: progressCell, value: 100});
    }
  })
}

getSheetById('3115002191210372').then(sheet => checkStatus(sheet));
