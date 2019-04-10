const columnMap = {};

const populateColumnMap = (columns) => {
  columns.forEach(column => {
    columnMap[column.title] = column.id;
  });
};

const getCellByColumnName = (row, name) => {
  let columnId = columnMap[name];
  return row.cells.find(column => {
    return column.columnId === columnId
  });
}

module.exports = {
  populateColumnMap,
  getCellByColumnName
}
