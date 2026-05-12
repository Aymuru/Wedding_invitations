/**
 * Веб-приложение для приёма анкеты с сайта (POST JSON).
 *
 * ВАЖНО — развёртывание (Развернуть → Новое развёртывание):
 *   «Кто выполняет»: Я (владелец)  — иначе гости сайта не смогут записать строку без своего OAuth.
 *   «У кого есть доступ»: Все (в т.ч. анонимные) — для публичного приглашения.
 *
 * Скрипт должен быть привязан к таблице ИЛИ указан SPREADSHEET_ID из URL таблицы:
 *   https://docs.google.com/spreadsheets/d/THIS_PART_IS_ID/edit
 */
var SPREADSHEET_ID = 'ВСТАВЬТЕ_ID_ТАБЛИЦЫ_СЮДА';
var SHEET_NAME = 'Лист1';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Sheet not found: ' + SHEET_NAME);

    var body = (e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(body);

    var now = new Date();
    var row = [
      now,
      data.name || '',
      data.attendance || '',
      data.alcohol || '',
      data.comment || ''
    ];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
