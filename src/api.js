const client = require('smartsheet');
const CONFIG = require('./config');
let smartsheet;

const connect = () => {
  return smartsheet = client.createClient({
    accessToken: CONFIG.SMARTSHEET_ACCESS_TOKEN,
    logLevel: 'info'
  });
}

const listSheets = async () => {
  const response = await smartsheet.sheets.listSheets();
  return response.data;
}

const getSheet = async (options) => {
  const sheet = await smartsheet.sheets.getSheet(options);
  return sheet;
}

const updateRow = async (options) => {
  const { rowId, sheetId, cell, value } = options;

  const updateData = {
    id: rowId,
    cells: [{columnId: cell.columnId, value}]
  };

  const updateRow = { body: updateData, sheetId };
  const result = await smartsheet.sheets.updateRow(updateRow);
  return result;
}

module.exports = {
  connect,
  listSheets,
  getSheet,
  updateRow
}
