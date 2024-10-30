const XLSX = require("xlsx");

//webpack loader for .xlsx files
function loader(content) {
  const spreadsheet = XLSX.read(content);
  var spreadsheetArray = XLSX.utils.sheet_to_json(spreadsheet.Sheets[spreadsheet.SheetNames[0]], { header: 1 } );
  return `export default JSON.parse('${JSON.stringify(spreadsheetArray)}')`;
}

//suppress formatting
loader.raw = true;

//export loader
module.exports = loader;