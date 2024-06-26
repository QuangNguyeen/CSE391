const doc = SpreadsheetApp.openById("13SmSx6yHcump_XoKtolNkOaRNTzIIaLCrtU6118op7I")
function doGet(request) {
  const category = request.parameter.category;
  const sheet = doc.getSheetByName(category);
  const range = sheet.getDataRange();
  const values = range.getValues();
  let questions = [];
  values.forEach((item, index) => {
    questions[index] = {
      quiz_id: index + 1,
      question: item[0],
      answers: [item[1], item[2], item[3], item[4]], // answer từ cột B đến E
    };
  });
  questions = questions.sort(() => Math.random() - Math.random());
  questions.length = 10;
  return ContentService.createTextOutput(JSON.stringify(questions)).setMimeType(
    ContentService.MimeType.JSON
  );
}
function doPost(request) {
  const postData = JSON.parse(request.postData.contents);
  const { category, questions } = postData;
  const sheet = doc.getSheetByName(category);
  const range = sheet.getDataRange();
  const values = range.getValues();
  let results = [];
  const correctID = 5
  questions.forEach((item, index) => {
    results[index] = {
      quiz_id: item.quiz_id,
      answer: values[item.quiz_id - 1][correctID],
    };
  });
  return ContentService.createTextOutput(JSON.stringify(results)).setMimeType(
    ContentService.MimeType.JSON
  );
}