var ss = SpreadsheetApp.getActiveSpreadsheet();

// There are 3 sheets for each document. IFTTT writes on the first sheet - you can name it anything, it is named DailyInput
// Each night when this script runs, the DailyInput count from cell D1 is logged on DailyLog, the DailyInput contents is appended
// to the Archive sheet, and the DailyInput sheet is cleared for the next day

//This code can be reused for any document set up with these 3 sheets meant for counting input

var DailyInput = ss.getSheetByName("DailyInput");
var DailyLog = ss.getSheetByName("DailyLog");
var Archive = ss.getSheetByName("Archive");

function dataCompile() {
  
  // get the value of cell D1 which is set to count the number of rows with entries
  var readRows = DailyInput.getRange("D1").getValue();
  
  // this was easier for me to get the range again for 'DailyInput'!D1 to append to the DailyLog
  var logRange = DailyInput.getRange(1, 4, 1, 1);
  
  // get the date of the first note for the day
  var logDate = DailyInput.getRange(2, 1, 1, 1);
  
  // tell the copyValuesToRange function where to copy the count data from 'DailyInput'!D1
  var writingRow = ( DailyLog.getLastRow() + 1 );
  
  // these two lines write the date and the count for that date on to the first open row in the DailyLog sheet
  logRange.copyValuesToRange(DailyLog, 2, 2, writingRow, writingRow);
  logDate.copyValuesToRange(DailyLog, 1, 1, writingRow, writingRow);
  
  // copy all of the data brought into the first 3 columns of DailyInput - without the titles
  var entry_range = DailyInput.getRange(2, 1, readRows, 3);
  
  // update the writingRow variable to find the next open row on the Archive sheet
  var writingRow = ( Archive.getLastRow() + 1 );
  
  // copy all daily data to the archive
  entry_range.copyValuesToRange(Archive, 1, 3, writingRow, writingRow);
  
  // clear the data on the DailyInput sheet to prepare for the next day's data
  entry_range.clear();
  
}
