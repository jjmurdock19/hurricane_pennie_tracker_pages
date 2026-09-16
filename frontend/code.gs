function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Hurricane Penetration Tracker')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Lets index.html pull in JavaScript.html with <?!= include('JavaScript'); ?>
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}