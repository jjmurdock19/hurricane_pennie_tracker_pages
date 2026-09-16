function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Penetration Tracker Admin')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Lets index.html pull in JavaScript.html with <?!= include('JavaScript'); ?>
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Called from the browser via google.script.run after the password form is
// submitted. Checks against Script Properties (Project Settings > Script
// Properties in the Apps Script editor) -- never hardcoded, never sent to
// the client until the password is correct. On success, returns the shared
// ADMIN_TOKEN that the browser then attaches to write requests against the
// Worker API; the password itself never leaves this server-side function.
function checkPassword(password) {
  var props = PropertiesService.getScriptProperties();
  var correctPassword = props.getProperty('ADMIN_PASSWORD');
  var token = props.getProperty('ADMIN_TOKEN');

  if (!correctPassword || !token) {
    throw new Error('Admin console is not configured yet. Set ADMIN_PASSWORD and ADMIN_TOKEN in Script Properties.');
  }
  if (password !== correctPassword) {
    throw new Error('Incorrect password.');
  }
  return token;
}
